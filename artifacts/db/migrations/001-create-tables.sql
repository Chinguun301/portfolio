-- ============================================================================
-- Migration 001: Create Tables
-- Portfolio Website Database Schema
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table: projects
-- Stores portfolio project entries with rich metadata (technologies,
-- images, links). Admin creates/updates; public reads only published rows.
-- ----------------------------------------------------------------------------
CREATE TABLE projects (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    title       TEXT NOT NULL,
    slug        TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    content     TEXT NOT NULL DEFAULT '',
    technologies JSONB NOT NULL DEFAULT '[]'::jsonb,
    images      JSONB NOT NULL DEFAULT '[]'::jsonb,
    links       JSONB NOT NULL DEFAULT '{}'::jsonb,
    featured    BOOLEAN NOT NULL DEFAULT false,
    sort_order  INTEGER NOT NULL DEFAULT 0,
    status      TEXT NOT NULL DEFAULT 'draft'
        CHECK (status IN ('draft', 'published', 'archived'))
);

-- Unique index on slug ensures URL-safe project identifiers.
CREATE UNIQUE INDEX idx_projects_slug ON projects (slug);

-- Index for listing published projects ordered by sort_order, then created_at.
CREATE INDEX idx_projects_published_list
    ON projects (sort_order DESC, created_at DESC)
    WHERE status = 'published';


-- ----------------------------------------------------------------------------
-- Table: messages
-- Contact-form submissions from visitors. Public can INSERT; admin reads
-- and manages (mark read / mark replied).
-- ----------------------------------------------------------------------------
CREATE TABLE messages (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    subject     TEXT NOT NULL DEFAULT '',
    message     TEXT NOT NULL,
    read        BOOLEAN NOT NULL DEFAULT false,
    replied     BOOLEAN NOT NULL DEFAULT false
);

-- Index for admin inbox — unread first, then most recent.
CREATE INDEX idx_messages_inbox
    ON messages (read ASC, created_at DESC);


-- ----------------------------------------------------------------------------
-- Table: site_config
-- Key-value store for site-wide configuration values (e.g. site title,
-- social links, hero text, about content). Values are stored as JSONB so
-- they can hold scalars, strings, objects, or arrays as needed.
-- ----------------------------------------------------------------------------
CREATE TABLE site_config (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    key         TEXT NOT NULL,
    value       JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE UNIQUE INDEX idx_site_config_key ON site_config (key);
