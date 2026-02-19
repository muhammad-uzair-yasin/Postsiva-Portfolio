# Backend API Specification

This document outlines the required API schemas and routes for the Postsiva Tech Portfolio project.

---

## 1. Project API

### Database Schema (Project)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (PK) | Unique identifier for the project |
| `slug` | String (Unique) | URL-friendly identifier (e.g., "e-learning-platform") |
| `title` | String | Title of the project |
| `category` | String | Category (e.g., "Web Development", "Healthcare") |
| `description` | String | Short summary for the card view |
| `fullDescription`| Text | Detailed project description |
| `image` | String (URL) | Primary display image URL |
| `media` | JSON/Array | List of objects: `[{ "type": "image" \| "video", "url": "string" }]` |
| `features` | JSON/Array | List of key features (strings) |
| `duration` | String | Project duration (e.g., "4 months") |
| `tech` | JSON/Array | Array of technologies used (strings) |
| `featured` | Boolean | Whether to show in the featured section |
| `results` | JSON/Array | List of outcomes/results (strings) |
| `client` | String | Client name |
| `liveLink` | String (URL) | Link to the live project |

### API Routes (Project)
- `GET /api/projects` - Fetch all projects
- `GET /api/projects/:slug` - Fetch a single project by its slug
- `POST /api/projects` - Create a new project (Admin Only)
- `PUT /api/projects/:id` - Update an existing project (Admin Only)
- `DELETE /api/projects/:id` - Delete a project (Admin Only)

---

## 2. Review / Testimonial API

### Database Schema (Review)
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | Integer (PK) | Unique identifier for the review |
| `author` | String | Name of the reviewer/client |
| `text` | Text | The actual review content |
| `rating` | Integer | Rating from 1 to 5 |
| `platform` | String | Source platform (e.g., "Fiverr", "Upwork", "Direct") |
| `country` | String | Country of the client |
| `link` | String (URL) | Link to the original review (if applicable) |
| `createdAt` | DateTime | Timestamp of creation |

### API Routes (Review)
- `GET /api/reviews` - Fetch all approved reviews
- `POST /api/reviews` - Submit a new review
- `PUT /api/reviews/:id` - Update/Moderate a review (Admin Only)
- `DELETE /api/reviews/:id` - Delete a review (Admin Only)

---

## Implementation Notes
- **CORS**: Ensure the frontend domain is whitelisted.
- **Authentication**: Admin routes should be protected via JWT or session-based auth.
- **Media Storage**: Consider using AWS S3, Cloudinary, or similar for image/video hosting.
