-- =============================================================
-- GRE Prep App - User API Keys table
-- Run this in the Supabase SQL Editor
-- =============================================================

-- 7. User API Keys (for Groq, etc.)
create table if not exists public.user_api_keys (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  provider   text not null, -- e.g. 'groq'
  api_key    text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, provider)
);

create index if not exists idx_user_api_keys_user
  on public.user_api_keys (user_id);

-- RLS
alter table public.user_api_keys enable row level security;

create policy "Users can view own API keys"
  on public.user_api_keys for select
  using (auth.uid() = user_id);

create policy "Users can insert own API keys"
  on public.user_api_keys for insert
  with check (auth.uid() = user_id);

create policy "Users can update own API keys"
  on public.user_api_keys for update
  using (auth.uid() = user_id);

create policy "Users can delete own API keys"
  on public.user_api_keys for delete
  using (auth.uid() = user_id);
