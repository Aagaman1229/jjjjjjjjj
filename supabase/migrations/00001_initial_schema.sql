-- =============================================================
-- GRE Prep App - Supabase Schema
-- Run this in the Supabase SQL Editor (one-time setup)
-- =============================================================

-- 0. Extensions
create extension if not exists "pgcrypto";

-- 1. Profiles (extends auth.users)
create table if not exists public.profiles (
  id          uuid primary key references auth.users on delete cascade,
  display_name text,
  study_streak  integer not null default 0,
  last_study_date date,
  total_study_time integer not null default 0, -- seconds
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', new.email));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Practice Results
create table if not exists public.practice_results (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  question_id text not null,
  correct     boolean not null,
  time_spent  integer not null, -- seconds
  topic       text not null,
  created_at  timestamptz not null default now()
);

create index if not exists idx_practice_results_user
  on public.practice_results (user_id, created_at desc);

create index if not exists idx_practice_results_topic
  on public.practice_results (user_id, topic);

-- 3. Mock Test Results
create table if not exists public.mock_test_results (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users on delete cascade,
  test_id           text not null,
  total_score       integer not null,
  scores            jsonb not null default '[]'::jsonb, -- [{section, correct, total}]
  time_per_question jsonb not null default '{}'::jsonb, -- {questionId: seconds}
  created_at        timestamptz not null default now()
);

create index if not exists idx_mock_test_results_user
  on public.mock_test_results (user_id, created_at desc);

-- 4. User Progress (aggregated)
create table if not exists public.user_progress (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null unique references auth.users on delete cascade,
  topics_completed  text[] not null default '{}',
  lessons_completed text[] not null default '{}',
  vocab_mastered    text[] not null default '{}',
  vocab_learning    text[] not null default '{}',
  updated_at        timestamptz not null default now()
);

-- 5. Vocabulary Bookmarks
create table if not exists public.vocab_bookmarks (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  word_id    text not null,
  created_at timestamptz not null default now(),
  unique (user_id, word_id)
);

create index if not exists idx_vocab_bookmarks_user
  on public.vocab_bookmarks (user_id);

-- 6. Chat Messages
create table if not exists public.chat_messages (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  role       text not null check (role in ('user', 'assistant', 'system')),
  content    text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_chat_messages_user
  on public.chat_messages (user_id, created_at);

-- =============================================================
-- Row-Level Security
-- =============================================================

alter table public.profiles           enable row level security;
alter table public.practice_results   enable row level security;
alter table public.mock_test_results  enable row level security;
alter table public.user_progress      enable row level security;
alter table public.vocab_bookmarks    enable row level security;
alter table public.chat_messages      enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Practice results: users can CRUD their own
create policy "Users can view own practice results"
  on public.practice_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own practice results"
  on public.practice_results for insert
  with check (auth.uid() = user_id);

-- Mock test results: users can CRUD their own
create policy "Users can view own mock test results"
  on public.mock_test_results for select
  using (auth.uid() = user_id);

create policy "Users can insert own mock test results"
  on public.mock_test_results for insert
  with check (auth.uid() = user_id);

-- User progress: users can CRUD their own
create policy "Users can view own progress"
  on public.user_progress for select
  using (auth.uid() = user_id);

create policy "Users can upsert own progress"
  on public.user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on public.user_progress for update
  using (auth.uid() = user_id);

-- Vocab bookmarks
create policy "Users can view own bookmarks"
  on public.vocab_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on public.vocab_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on public.vocab_bookmarks for delete
  using (auth.uid() = user_id);

-- Chat messages
create policy "Users can view own messages"
  on public.chat_messages for select
  using (auth.uid() = user_id);

create policy "Users can insert own messages"
  on public.chat_messages for insert
  with check (auth.uid() = user_id);

-- =============================================================
-- Helper: increment study streak (called daily)
-- =============================================================

create or replace function public.tick_study_streak(p_user_id uuid)
returns void
language plpgsql
security definer
as $$
declare
  last_date date;
  today date := current_date;
begin
  select last_study_date into last_date
  from public.profiles
  where id = p_user_id;

  if last_date is null or last_date < today - interval '1 day' then
    update public.profiles
    set study_streak = 1,
        last_study_date = today,
        updated_at = now()
    where id = p_user_id;
  elsif last_date = today - interval '1 day' then
    update public.profiles
    set study_streak = study_streak + 1,
        last_study_date = today,
        updated_at = now()
    where id = p_user_id;
  end if;
end;
$$;
