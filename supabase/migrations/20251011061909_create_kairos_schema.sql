/*
  # Create Kairos Social Media Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique)
      - `full_name` (text)
      - `bio` (text)
      - `profile_picture_url` (text)
      - `saved_souls_count` (integer, default 0)
      - `church_id` (uuid, nullable, references churches)
      - `account_type` (text: 'individual', 'church_member', 'church_leader')
      - `created_at` (timestamptz)

    - `churches`
      - `id` (uuid, primary key)
      - `name` (text)
      - `location` (text)
      - `description` (text)
      - `created_by` (uuid, references users)
      - `created_at` (timestamptz)

    - `posts`
      - `id` (uuid, primary key)
      - `author_id` (uuid, references users)
      - `content` (text)
      - `media_url` (text, nullable)
      - `media_type` (text: 'image', 'video', nullable)
      - `likes_count` (integer, default 0)
      - `created_at` (timestamptz)

    - `church_channel_posts`
      - `id` (uuid, primary key)
      - `church_id` (uuid, references churches)
      - `title` (text)
      - `content` (text)
      - `media_url` (text, nullable)
      - `posted_by` (uuid, references users)
      - `created_at` (timestamptz)

    - `church_events`
      - `id` (uuid, primary key)
      - `church_id` (uuid, references churches)
      - `title` (text)
      - `description` (text)
      - `date` (timestamptz)
      - `location` (text)
      - `created_at` (timestamptz)

    - `chats`
      - `id` (uuid, primary key)
      - `user1_id` (uuid, references users)
      - `user2_id` (uuid, references users)
      - `last_message` (text)
      - `last_message_time` (timestamptz)
      - `created_at` (timestamptz)

    - `stories`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `media_url` (text)
      - `media_type` (text: 'image', 'video')
      - `created_at` (timestamptz)
      - `expires_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read public user profiles
      - Update their own profiles
      - Create posts and view all posts
      - View churches and join churches
      - Manage their own chats and stories
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  full_name text NOT NULL,
  bio text DEFAULT '',
  profile_picture_url text,
  saved_souls_count integer DEFAULT 0,
  church_id uuid,
  account_type text NOT NULL CHECK (account_type IN ('individual', 'church_member', 'church_leader')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Churches table
CREATE TABLE IF NOT EXISTS churches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  description text DEFAULT '',
  created_by uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE churches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read churches"
  ON churches FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create churches"
  ON churches FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = created_by);

-- Add foreign key for users.church_id
ALTER TABLE users ADD CONSTRAINT fk_church
  FOREIGN KEY (church_id) REFERENCES churches(id) ON DELETE SET NULL;

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content text NOT NULL,
  media_url text,
  media_type text CHECK (media_type IN ('image', 'video')),
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = author_id);

-- Church channel posts table
CREATE TABLE IF NOT EXISTS church_channel_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id uuid NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  media_url text,
  posted_by uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE church_channel_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read church channel posts"
  ON church_channel_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Church members can create channel posts"
  ON church_channel_posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.church_id = church_channel_posts.church_id
    )
  );

-- Church events table
CREATE TABLE IF NOT EXISTS church_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  church_id uuid NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text DEFAULT '',
  date timestamptz NOT NULL,
  location text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE church_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read church events"
  ON church_events FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Church members can create events"
  ON church_events FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.church_id = church_events.church_id
    )
  );

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  user2_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  last_message text DEFAULT '',
  last_message_time timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT different_users CHECK (user1_id != user2_id)
);

ALTER TABLE chats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own chats"
  ON chats FOR SELECT
  TO authenticated
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create chats"
  ON chats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

-- Stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  media_url text NOT NULL,
  media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '24 hours')
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active stories"
  ON stories FOR SELECT
  TO authenticated
  USING (expires_at > now());

CREATE POLICY "Users can create own stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own stories"
  ON stories FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
