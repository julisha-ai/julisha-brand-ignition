-- Create blog_posts table
CREATE TABLE blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    published BOOLEAN DEFAULT false,
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read all posts
CREATE POLICY "Allow authenticated users to read all posts" ON blog_posts
    FOR SELECT TO authenticated USING (true);

-- Policy for authenticated users to insert posts
CREATE POLICY "Allow authenticated users to insert posts" ON blog_posts
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);

-- Policy for authenticated users to update their own posts
CREATE POLICY "Allow authenticated users to update their own posts" ON blog_posts
    FOR UPDATE TO authenticated USING (auth.uid() = author_id);

-- Policy for authenticated users to delete their own posts
CREATE POLICY "Allow authenticated users to delete their own posts" ON blog_posts
    FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();