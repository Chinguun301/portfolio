# Portfolio Database Schema

## Overview

PostgreSQL database hosted on [Supabase](https://supabase.com) for the
developer portfolio website. Three tables serve distinct concerns: project
content management, visitor contact submissions, and site-wide configuration.

---

## Tables

### `projects`

| Column        | Type        | Constraints                        | Description                                |
|---------------|-------------|------------------------------------|--------------------------------------------|
| `id`          | `uuid`      | PK, default `gen_random_uuid()`    | Unique identifier                          |
| `created_at`  | `timestamptz` | NOT NULL, default `now()`        | Row creation timestamp                     |
| `updated_at`  | `timestamptz` | NOT NULL, default `now()`        | Row last-update timestamp                  |
| `title`       | `text`      | NOT NULL                           | Project display title                      |
| `slug`        | `text`      | NOT NULL, **UNIQUE**               | URL-friendly identifier (e.g. `my-project`)|
| `description` | `text`      | NOT NULL, default `''`             | Short summary / card excerpt               |
| `content`     | `text`      | NOT NULL, default `''`             | Full markdown body                         |
| `technologies`| `jsonb`     | NOT NULL, default `'[]'`           | Array of tech stack labels                 |
| `images`      | `jsonb`     | NOT NULL, default `'[]'`           | Array of image URLs                        |
| `links`       | `jsonb`     | NOT NULL, default `'{}'`           | Object `{ github, live }`                  |
| `featured`    | `boolean`   | NOT NULL, default `false`          | Flag for featured / spotlight placement    |
| `sort_order`  | `integer`   | NOT NULL, default `0`              | Manual ordering weight (higher = first)    |
| `status`      | `text`      | NOT NULL, default `'draft'`        | One of: `draft`, `published`, `archived`   |

**Indexes:**

| Name | Type | Columns | Condition |
|------|------|---------|-----------|
| `idx_projects_slug` | Unique B-tree | `slug` | — |
| `idx_projects_published_list` | B-tree | `sort_order DESC, created_at DESC` | `WHERE status = 'published'` |

**Relationships:** None (standalone table).

---

### `messages`

| Column      | Type        | Constraints                     | Description                       |
|-------------|-------------|---------------------------------|-----------------------------------|
| `id`        | `uuid`      | PK, default `gen_random_uuid()` | Unique identifier                 |
| `created_at`| `timestamptz`| NOT NULL, default `now()`      | Submission timestamp              |
| `name`      | `text`      | NOT NULL                        | Sender full name                  |
| `email`     | `text`      | NOT NULL                        | Sender email address              |
| `subject`   | `text`      | NOT NULL, default `''`          | Message subject line              |
| `message`   | `text`      | NOT NULL                        | Message body                      |
| `read`      | `boolean`   | NOT NULL, default `false`       | Admin has read the message        |
| `replied`   | `boolean`   | NOT NULL, default `false`       | Admin has replied to the message  |

**Indexes:**

| Name | Type | Columns | Condition |
|------|------|---------|-----------|
| `idx_messages_inbox` | B-tree | `read ASC, created_at DESC` | — |

**Relationships:** None (standalone table).

---

### `site_config`

| Column      | Type        | Constraints                     | Description                   |
|-------------|-------------|---------------------------------|-------------------------------|
| `id`        | `uuid`      | PK, default `gen_random_uuid()` | Unique identifier             |
| `updated_at`| `timestamptz`| NOT NULL, default `now()`      | Last update timestamp         |
| `key`       | `text`      | NOT NULL, **UNIQUE**            | Config key (e.g. `site_title`)|
| `value`     | `jsonb`     | NOT NULL, default `'{}'`        | Arbitrary JSON value          |

**Indexes:**

| Name | Type | Columns | Condition |
|------|------|---------|-----------|
| `idx_site_config_key` | Unique B-tree | `key` | — |

**Relationships:** None (standalone table).

---

## Row-Level Security (RLS)

RLS is enabled on all three tables. The admin gate uses
`auth.role() = 'authenticated'`, which matches any logged-in Supabase Auth
user. For stricter admin-only access, custom JWT claims can be used
(e.g. `auth.jwt() ->> 'role' = 'admin'`).

### `projects`

| Policy                  | Operation | Role           | Scope                   |
|-------------------------|-----------|----------------|-------------------------|
| `public_read_published` | SELECT    | `anon` / public| Rows where `status = 'published'` |
| `admin_all_projects`   | ALL       | `authenticated`| All rows                |

### `messages`

| Policy                         | Operation | Role           | Scope        |
|--------------------------------|-----------|----------------|--------------|
| `public_insert_messages`       | INSERT    | `anon` / public| All rows     |
| `admin_select_update_messages` | ALL       | `authenticated`| All rows     |

### `site_config`

| Policy                    | Operation | Role            | Scope    |
|---------------------------|-----------|-----------------|----------|
| `public_read_site_config` | SELECT    | `anon` / public | All rows |
| `admin_all_site_config`   | ALL       | `authenticated` | All rows |

---

## Relationships

There are **no foreign-key relationships** between tables. Each table is
independent by design:

- `projects` – standalone content entities, no parent/child.
- `messages` – standalone visitor submissions, no related entities.
- `site_config` – standalone key-value store.

If future requirements introduce user profiles, project categories, or
message threads, foreign-key relationships can be added via new migrations.

---

## Usage Patterns

### Public (anonymous)

```sql
-- Fetch published projects for the portfolio grid
SELECT * FROM projects
WHERE status = 'published'
ORDER BY sort_order DESC, created_at DESC;

-- Submit a contact message
INSERT INTO messages (name, email, subject, message)
VALUES ($1, $2, $3, $4);

-- Read site configuration (used during SSR/ISR)
SELECT key, value FROM site_config;
```

### Admin (authenticated)

```sql
-- Projects CRUD
INSERT INTO projects (...) VALUES (...);
UPDATE projects SET status = 'published' WHERE id = $1;
DELETE FROM projects WHERE id = $1;

-- Manage messages
SELECT * FROM messages ORDER BY read ASC, created_at DESC;
UPDATE messages SET read = true WHERE id = $1;
UPDATE messages SET replied = true WHERE id = $1;

-- Manage site config
INSERT INTO site_config (key, value) VALUES ('hero_title', '"Hello World"')
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();
DELETE FROM site_config WHERE key = $1;
```

## Setup Instructions

1. Create a Supabase project at [supabase.com](https://supabase.com).
2. Run migrations in order via the Supabase SQL editor or `psql`:
   - `migrations/001-create-tables.sql`
   - `migrations/002-rls-policies.sql`
3. (Optional) Run `seed/001-sample-projects.sql` for development data.
4. Copy your Supabase URL and anon key to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
5. Install the client SDK:
   ```
   npm install @supabase/supabase-js @supabase/ssr
   ```
