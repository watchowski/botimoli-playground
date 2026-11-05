-- Create the notes table.
-- Apply: psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0001_create_notes.up.sql
-- Undo:  undo-migrations/0001_create_notes.down.sql (deletes every note).

CREATE TABLE notes (
    id         bigint      GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    body       text        NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);
