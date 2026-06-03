import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rmphwzgmprbdrguwfroa.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJtcGh3emdtcHJiZHJndXdmcm9hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1MDcyODAsImV4cCI6MjA5NjA4MzI4MH0.U1LvCYr6aJHNQ2yk5aHwWCDyVP1vRar_uXo3o0cHXHQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
