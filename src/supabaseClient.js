import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fsmlidqdqrmagovqmdat.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZzbWxpZHFkcXJtYWdvdnFtZGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNDgwMzEsImV4cCI6MjA1ODYyNDAzMX0.eoJIfk3oEevwOg5yDhkJhVWyHIPu3Op3NX_jgruoIIE";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
