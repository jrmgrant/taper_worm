// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fgiveexfmujvchlqlufj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnaXZlZXhmbXVqdmNobHFsdWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNjc1NTUsImV4cCI6MjA2NTc0MzU1NX0.3F5Do0Q2aokL76sYXirFlOFgfbw58G-djU3IjNvtbqg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
