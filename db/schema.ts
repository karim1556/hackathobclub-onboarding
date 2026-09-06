import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const clubSignups = sqliteTable('club_signups', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
});
