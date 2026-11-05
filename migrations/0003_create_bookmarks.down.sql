-- Undo 0003_create_bookmarks.up.sql.
-- WARNING: this deletes the bookmarks table and every bookmark in it.
-- Run: psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0003_create_bookmarks.down.sql

DROP TABLE bookmarks;
