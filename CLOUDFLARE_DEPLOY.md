# Cloudflare deployment

This project uses a D1 binding named `DB` for the join form. For a deployment
outside OpenAI Sites, create a D1 database in your Cloudflare account and set
these Workers Builds environment variables before deploying:

- `CLOUDFLARE_D1_DATABASE_ID` — the database ID Cloudflare gives you
- `CLOUDFLARE_D1_DATABASE_NAME` — the database name (usually optional; defaults to `site-creator-d1`)

After the first Worker is created, apply the schema once from the D1 console
using the SQL in `drizzle/0000_pink_the_hunter.sql`, then redeploy. The form
will write to `DB` and submissions will persist in that database.
