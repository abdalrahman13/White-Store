// js/supabaseClient.js
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// const supabaseUrl = 'https://shxcbfvhceoeivkehyq.supabase.co';   // ← غيّرها لو URL مشروعك مختلف
const supabaseUrl = 'https://shcxbefvhceoeivkehyq.supabase.co';   // ← غيّرها لو URL مشروعك مختلف
const supabaseAnonKey = 'sb_publishable_GztHVfMNJneGurT5Aq4EDQ_J9SmyGId';                    // ← خدها من Supabase Dashboard → Settings → API → anon public

export const supabase = createClient(supabaseUrl, supabaseAnonKey);