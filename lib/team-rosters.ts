import { env } from 'cloudflare:workers';

export type Squad = {
  id: string;
  name: string;
  members: { name: string; leader: boolean }[];
  unlinkedMembers: number;
};

export async function getTeamRosters(): Promise<{ teams: Squad[]; memberCount: number }> {
  const bindings = env as unknown as { SUPABASE_URL?: string; SUPABASE_ANON_KEY?: string };
  const baseUrl = bindings.SUPABASE_URL ?? process.env.SUPABASE_URL;
  const key = bindings.SUPABASE_ANON_KEY ?? process.env.SUPABASE_ANON_KEY;
  if (!baseUrl || !key) throw new Error('Team roster configuration is missing.');

  async function read(table: string, select: string): Promise<Record<string, unknown>[]> {
    const result: Record<string, unknown>[] = [];
    for (let offset = 0; ; offset += 1000) {
      const url = new URL(`/rest/v1/${table}`, baseUrl);
      url.search = new URLSearchParams({ select, order: 'id.asc', limit: '1000', offset: String(offset) }).toString();
      const response = await fetch(url, { headers: { apikey: key!, Authorization: `Bearer ${key}` }, cache: 'no-store', signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`Team roster request failed (${response.status}).`);
      const rows: unknown = await response.json();
      if (!Array.isArray(rows)) throw new Error('Unexpected team roster response.');
      result.push(...rows.filter((row): row is Record<string, unknown> => row !== null && typeof row === 'object' && !Array.isArray(row)));
      if (rows.length < 1000) return result;
    }
  }

  // The users table also has account fields: explicitly select only what the roster needs.
  const [teamRows, userRows] = await Promise.all([
    read('teams', 'id,name,memberIds'),
    read('users', 'id,name,isTeamLeader'),
  ]);
  const users = new Map<string, Record<string, unknown>>();
  for (const row of userRows) {
    if (typeof row.id === 'string' || typeof row.id === 'number') users.set(String(row.id), row);
  }
  const includedMembers = new Set<string>();
  const teams: Squad[] = [];
  for (const row of teamRows) {
    if (typeof row.name !== 'string' || !row.name.trim() || (typeof row.id !== 'string' && typeof row.id !== 'number')) continue;
    let ids: unknown = row.memberIds ?? [];
    if (typeof ids === 'string') {
      try { ids = JSON.parse(ids); } catch { throw new Error('Invalid team member list.'); }
    }
    if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' && typeof id !== 'number')) throw new Error('Invalid team member list.');
    const squad: Squad = { id: String(row.id), name: row.name.trim(), members: [], unlinkedMembers: 0 };
    for (const id of new Set(ids.map(String))) {
      const user = users.get(id);
      if (!user || typeof user.name !== 'string' || !user.name.trim()) { squad.unlinkedMembers++; continue; }
      const name = user.name.trim().replace(/\s+/gu, ' ');
      if (name.toLowerCase() === 'test') continue;
      squad.members.push({ name, leader: user.isTeamLeader === true });
      includedMembers.add(id);
    }
    squad.members.sort((a, b) => Number(b.leader) - Number(a.leader));
    teams.push(squad);
  }
  teams.sort((a, b) => Number(b.name.toLowerCase() === 'astella') - Number(a.name.toLowerCase() === 'astella')
    || b.members.length - a.members.length
    || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' }));
  return { teams, memberCount: includedMembers.size };
}
