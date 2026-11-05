-- Undo migrations/0001_create_notes.up.sql.
-- WARNING: this deletes the notes table and every note in it.
-- Kept out of migrations/ so that running every file there never runs this.
-- Run: psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f undo-migrations/0001_create_notes.down.sql

DROP TABLE notes;
