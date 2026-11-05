-- Create the bookmarks table: one row per saved link.
-- Stands alone: needs no other migration, so gaps in the numbering are fine.
-- Apply: psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0003_create_bookmarks.up.sql
-- Undo:  psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0003_create_bookmarks.down.sql (deletes every bookmark).
-- Applying several at once? Loop over migrations/*.up.sql, not *.sql: undo files sort first.

CREATE TABLE bookmarks (
    id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    url        text        NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now()
);
