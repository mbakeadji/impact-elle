import { createClient } from '@supabase/supabase-js';

// Remplacer directement par vos chaînes de caractères si vous n'utilisez pas le fichier .env
const supabaseUrl = 'https://wlxcnqbvgunyqghudyyf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndseGNucWJ2Z3VueXFnaHVkeXlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMzcwNTYsImV4cCI6MjEwMjgxMzA1Nn0.JjkHt_rTLon9zfJsjpIlkcGq3cMrIfh_zf-yVs6m4EY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);