import { createClient } from 'npm:@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

// Main function to handle requests
Deno.serve(async (req) => {
  // This is needed for CORS preflight requests.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      throw new Error("Username and password are required.");
    }

    // Create a Supabase client with the service_role key to perform admin actions
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Step 1: Find the user's profile by their username to get their phone number
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('phone_number')
      .eq('username', username)
      .single();

    if (profileError || !profile) {
      throw new Error("User not found.");
    }

    // Step 2: Try to sign in the user with their phone number and the provided password
    const { data, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      phone: profile.phone_number,
      password: password,
    });

    if (signInError) {
      throw new Error("Invalid login credentials.");
    }

    // Return the session and user data on success
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
