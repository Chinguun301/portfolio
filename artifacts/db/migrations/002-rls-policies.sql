-- ============================================================================
-- Migration 002: Row-Level Security Policies
-- Portfolio Website Database Schema
-- ============================================================================
-- NOTE: Before running this migration, ensure the admin role exists and
-- that you have created an admin user in Supabase Auth. The policies below
-- use `auth.role() = 'authenticated'` as the admin gate. If you need a
-- more granular admin check, replace with `auth.jwt() ->> 'role' = 'admin'`
-- after configuring custom JWT claims.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Table: projects
-- ----------------------------------------------------------------------------
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read published projects.
CREATE POLICY "public_read_published" ON projects
    FOR SELECT
    USING (status = 'published');

-- Authenticated (admin): full CRUD on all rows regardless of status.
CREATE POLICY "admin_all_projects" ON projects
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- Table: messages
-- ----------------------------------------------------------------------------
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Public: any visitor can submit a contact message.
CREATE POLICY "public_insert_messages" ON messages
    FOR INSERT
    WITH CHECK (true);

-- Authenticated (admin): can view all messages and update read/replied flags.
CREATE POLICY "admin_select_update_messages" ON messages
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');


-- ----------------------------------------------------------------------------
-- Table: site_config
-- ----------------------------------------------------------------------------
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Public: anyone can read site configuration (used for SSR/ISR rendering).
CREATE POLICY "public_read_site_config" ON site_config
    FOR SELECT
    USING (true);

-- Authenticated (admin): full CRUD on site configuration.
CREATE POLICY "admin_all_site_config" ON site_config
    FOR ALL
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');
