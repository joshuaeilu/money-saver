
import 'react-native-url-polyfill/auto'
import { createClient, processLock } from '@supabase/supabase-js'

export const supabase = createClient(
  "https://tgasuxlchazrkaznuegw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRnYXN1eGxjaGF6cmthem51ZWd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMjUxOTEsImV4cCI6MjA2NjcwMTE5MX0.NQA67pJ2aZK_EGwcof8HBw1liAgbu8BhQMf2MKOmg7I",
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  })
        