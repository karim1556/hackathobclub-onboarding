# Cloudflare deployment

This project uses a D1 binding named `DB` for the join form. For a deployment
outside OpenAI Sites, create a D1 database in your Cloudflare account and set
these Workers Builds environment variables before deploying:

- `CLOUDFLARE_D1_DATABASE_ID` — the database ID Cloudflare gives you
- `CLOUDFLARE_D1_DATABASE_NAME` — the database name (usually optional; defaults to `site-creator-d1`)

After the first Worker is created, apply the schema once from the D1 console
using the SQL in `drizzle/0000_pink_the_hunter.sql`, then redeploy. The form
will write to `DB` and submissions will persist in that database.

## Registered-students directory

Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` as Worker runtime variables before
deploying the student directory. Local development reads them from the ignored
`.dev.vars` file. Use the Supabase anon key, not a service-role key.

The directory reads only `name` from `public.club_registrations` on the server.
The anon role must have permission to select those rows. Neither the key nor
students’ contact details are sent to the page.

The Teams page uses the same configuration. It reads `id,name,memberIds` from
`teams` and `id,name,isTeamLeader` from `users` to resolve the rosters. Limit
anonymous access to the required public fields; account fields such as passwords
must not be readable by the anon role.
