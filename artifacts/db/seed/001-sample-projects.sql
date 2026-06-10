-- ============================================================================
-- Seed: Sample Projects
-- Inserts 3 demo projects for development / preview environments.
-- ============================================================================
-- NOTE: Run this AFTER migrations 001 and 002 have been applied. The RLS
-- policies will block anonymous inserts, so you must run this seed as an
-- authenticated admin or disable RLS temporarily (e.g. in a local dev
-- Supabase instance or via the Supabase dashboard SQL editor when signed
-- in as the project owner).
-- ============================================================================

INSERT INTO projects (title, slug, description, content, technologies, images, links, featured, sort_order, status)
VALUES
(
    'E-Commerce Platform Redesign',
    'ecommerce-platform-redesign',
    'A complete UX overhaul and technical migration of a mid-market e-commerce platform serving 50K+ monthly active users.',
    'Led the end-to-end redesign of a legacy e-commerce platform, migrating from a monolith to a microservices architecture.\n\nKey accomplishments:\n- Reduced page load time by 62%% through server-side rendering and image optimization\n- Migrated 15,000+ product listings with zero data loss\n- Implemented Stripe integration for subscription billing\n- Built a real-time inventory management dashboard\n- Achieved 98%% Lighthouse performance score',
    '["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis", "Docker", "AWS"]',
    '["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200"]',
    '{"github": "https://github.com/username/ecommerce-platform", "live": "https://example-store.com"}',
    true,
    1,
    'published'
),
(
    'Task Management API',
    'task-management-api',
    'A RESTful task management API built with Go, featuring real-time collaboration and WebSocket-powered notifications.',
    'Designed and built a high-performance task management API that powers a team collaboration tool used by 200+ organizations.\n\nFeatures:\n- RESTful endpoints with OpenAPI 3.0 documentation\n- Real-time updates via WebSocket connections\n- Role-based access control with JWT authentication\n- PostgreSQL with optimized query performance (sub-50ms p99 latency)\n- Rate limiting and request validation middleware\n- Comprehensive test suite with 90%%+ coverage',
    '["Go", "PostgreSQL", "WebSocket", "Docker", "Kubernetes", "GraphQL"]',
    '["https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200"]',
    '{"github": "https://github.com/username/task-api", "live": "https://api.tasks.example.com/docs"}',
    true,
    2,
    'published'
),
(
    'Personal Design System',
    'personal-design-system',
    'A reusable React component library and design tokens for consistent UI across multiple web applications.',
    'Created a comprehensive design system to standardize UI patterns across three company products, reducing design-to-development handoff time by 40%%.\n\nIncludes:\n- 30+ accessible React components with full TypeScript types\n- Design tokens (colors, typography, spacing, shadows)\n- Storybook documentation with interactive examples\n- Automated visual regression testing with Chromatic\n- Theming support for light/dark modes\n- Tree-shakeable ESM and CJS builds',
    '["React", "TypeScript", "Storybook", "Tailwind CSS", "Radix UI", "Rollup"]',
    '["https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200"]',
    '{"github": "https://github.com/username/design-system", "live": "https://design-system.example.com"}',
    false,
    3,
    'published'
);
