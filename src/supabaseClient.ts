// src/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co'; // Remplacez par votre URL Supabase
const supabaseKey = 'your-anon-key'; // Remplacez par votre clé API

export const supabase = createClient(supabaseUrl, supabaseKey);
