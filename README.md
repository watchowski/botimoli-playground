# botimoli-playground
Practice repo for the Botimoli Slack bot (test commits and PRs only)

## Database

Plain PostgreSQL files, run by hand with `psql`. Nothing records which ones have run.

`migrations/` holds only files that build the database. Run each new one once, lowest number first:

    psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0001_create_notes.up.sql

`undo-migrations/` holds the files that reverse them. They live in their own folder so that running everything in `migrations/` can never undo anything. To undo, run them highest number first, and only for migrations that have run:

    psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f undo-migrations/0001_create_notes.down.sql

An undo file deletes the data in what it drops: `0001_create_notes.down.sql` deletes every note.
