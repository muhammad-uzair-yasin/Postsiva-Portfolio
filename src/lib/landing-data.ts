import { allTeamMembers } from "@/lib/team-data";
import { getAllProfiles } from "@/lib/supabase/profile";

export type CertificateWithMember = {
  name: string;
  issuer?: string;
  year?: string;
  image?: string;
  link?: string;
  memberName: string;
};

/** Aggregates certificates from all team members (DB profile overrides static team-data). */
export async function getAllMembersCertificates(): Promise<CertificateWithMember[]> {
  const profiles = await getAllProfiles();
  const profileBySlug = new Map(
    profiles.map((p) => [p.team_slug as string, p])
  );

  const out: CertificateWithMember[] = [];

  for (const member of allTeamMembers) {
    const profile = profileBySlug.get(member.slug);
    const certs = Array.isArray(profile?.profile_data?.certificates)
      ? (profile.profile_data.certificates as { name: string; issuer?: string; year?: string; image?: string; link?: string }[])
      : member.certificates;

    for (const c of certs) {
      if (!c?.name) continue;
      out.push({
        name: c.name,
        issuer: c.issuer,
        year: c.year,
        image: c.image,
        link: c.link,
        memberName: member.name,
      });
    }
  }

  return out;
}
