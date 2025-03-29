import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://fsmlidqdqrmagovqmdat.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
