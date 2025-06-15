
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fslfgjyyizmrnzqntlaj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbGZnanl5aXptcm56cW50bGFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5NjgyNjksImV4cCI6MjA2NTU0NDI2OX0.QiH0wZOv54YwV6goR5Krd3Lv40A1HSbbsQ395fIUpkk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
})
