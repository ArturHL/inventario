import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://httlgvlzduwooplyccwp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function getProducts() {
  const { data, error } = await supabase
    .from("productos")
    .select("*");

  if (error) throw error;

  return data;
}