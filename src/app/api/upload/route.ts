import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { getSupabaseAdmin } from "@/lib/supabase/server";

const UPLOAD_ENDPOINT =
  process.env.UPLOAD_ENDPOINT || "https://storage.postsiva.com/upload.php";

const BUCKET = "uploads";
const UPLOAD_DIR = "public/project-assets";
const PROFILE_DIR = "public/profile-assets";
const MAX_IMAGE_MB = 10;
const MAX_VIDEO_MB = 100;
const MAX_PDF_MB = 5;

const ALLOWED_EXT: Record<string, string[]> = {
  image: [".jpg", ".jpeg", ".png", ".webp", ".gif"],
  video: [".mp4", ".webm"],
  document: [".pdf"],
};

/** Ensure the bucket exists and is public (call once per deploy). */
async function ensureBucket(supabase: ReturnType<typeof getSupabaseAdmin>) {
  if (!supabase) return;
  const { error } = await supabase.storage.createBucket(BUCKET, {
    public: true,
    fileSizeLimit: MAX_VIDEO_MB * 1024 * 1024,
  });
  if (error && error.message !== "The resource already exists") {
    console.warn("Supabase bucket create:", error.message);
  }
}

/** Forward file to Postsiva storage; returns public URL or null on failure. */
async function uploadToPostsivaStorage(file: File): Promise<string | null> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(UPLOAD_ENDPOINT, { method: "POST", body: form });
  const data = (await res.json()) as { success?: boolean; url?: string };
  if (data.success && typeof data.url === "string") return data.url;
  return null;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ success: false, error: "No file" }, { status: 400 });
    }

    const type = (formData.get("type") as string) || "image";
    const isVideo = type === "video";
    const isDocument = type === "document";
    const maxBytes =
      (isDocument ? MAX_PDF_MB : isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB) * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          success: false,
          error: `File too large (max ${isDocument ? MAX_PDF_MB : isVideo ? MAX_VIDEO_MB : MAX_IMAGE_MB}MB)`,
        },
        { status: 400 }
      );
    }

    const ext = path.extname(file.name).toLowerCase() || (isDocument ? ".pdf" : isVideo ? ".mp4" : ".jpg");
    const allowed = ALLOWED_EXT[type] ?? ALLOWED_EXT.image;
    if (!allowed.includes(ext)) {
      return NextResponse.json(
        { success: false, error: `Invalid file type. Allowed: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    const postsivaUrl = await uploadToPostsivaStorage(file);
    if (postsivaUrl) return NextResponse.json({ success: true, url: postsivaUrl });

    const name = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}${ext}`;
    const storagePath = type === "document" ? `profile-assets/${name}` : `project-assets/${name}`;

    const supabase = getSupabaseAdmin();
    if (supabase) {
      await ensureBucket(supabase);
      const bytes = await file.arrayBuffer();
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, bytes, { contentType: file.type, upsert: true });
      if (error) {
        console.error("Supabase upload error:", error);
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 500 }
        );
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
      return NextResponse.json({ success: true, url: data.publicUrl });
    }

    // Fallback: local filesystem (works only in dev; server/Vercel is read-only)
    const baseDir = type === "document" ? PROFILE_DIR : UPLOAD_DIR;
    const dir = path.join(process.cwd(), baseDir);
    await mkdir(dir, { recursive: true });
    const filePath = path.join(dir, name);
    const bytes = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(bytes));
    const url = type === "document" ? `/profile-assets/${name}` : `/project-assets/${name}`;
    return NextResponse.json({ success: true, url });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { success: false, error: e instanceof Error ? e.message : "Upload failed" },
      { status: 500 }
    );
  }
}
