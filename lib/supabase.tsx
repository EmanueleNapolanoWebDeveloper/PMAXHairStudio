import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, supabaseKey)