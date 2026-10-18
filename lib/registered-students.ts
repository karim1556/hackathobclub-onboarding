import { env } from 'cloudflare:workers';

export async function getRegisteredStudentNames(): Promise<string[]> {
  const bindings = env as unknown as { SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string };
  const baseUrl = bindings.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = bindings.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!baseUrl || !key) throw new Error('Student directory configuration is missing.');

  const names: string[] = [];
  const pageSize = 1000;
  for (let offset = 0; ; offset += pageSize) {
    const url = new URL('/rest/v1/club_registrations', baseUrl);
    // Select names at the database, so no contact or registration details are retrieved.
    url.search = new URLSearchParams({ select: 'name', order: 'name.asc', limit: String(pageSize), offset: String(offset) }).toString();
    const response = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error(`Student directory request failed (${response.status}).`);
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error('Student directory returned an unexpected response.');
    for (const row of rows) {
      if (row && typeof row === 'object' && 'name' in row && typeof row.name === 'string') {
        const name = row.name.trim().replace(/\s+/gu, ' ');
        if (name && name.toLowerCase() !== 'test') names.push(name);
      }
    }
    if (rows.length < pageSize) break;
  }
  return names.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
}
