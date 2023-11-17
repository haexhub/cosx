-- Create a table for public "profiles"
create table profiles (
  id uuid references auth.users not null,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  website text,

  primary key (id),
  unique(username),
  constraint username_length check (char_length(username) >= 3)
);

alter table profiles enable row level security;

create policy "Onyl owner can SELECT his profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Set up Realtime!
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;
alter publication supabase_realtime add table profiles;


create policy "Only owner can READ his bucket."
  on storage.objects for select to authenticated
  using ( bucket_id = auth.uid() );

create policy "Only owner can INSERT in his bucket."
  on storage.objects for insert to authenticated
  with check ( bucket_id = auth.uid() );

create policy "User can only insert files to there own bucket"
on storage.objects for insert to authenticated with check (
    -- restrict bucket
    bucket_id = auth.uid()
);

create policy "User can only see files from there own bucket"
on storage.objects for select to authenticated with check (
    -- restrict bucket
    bucket_id = auth.uid()
);