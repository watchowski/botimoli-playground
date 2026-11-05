# botimoli-playground
Practice repo for the Botimoli Slack bot (test commits and PRs only)

## Database

`migrations/` holds plain PostgreSQL files, applied in number order with `psql`:

    psql "$DATABASE_URL" -1 -v ON_ERROR_STOP=1 -f migrations/0001_create_notes.up.sql

Each `.down.sql` undoes its `.up.sql`. A down file deletes the data in what it drops.
