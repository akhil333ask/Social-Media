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

    // Create a Supabase client with the service_role key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // --- MODIFICATION START ---
    
    // Step 1: The "Dummy Email" Trick.
    // We replicate the exact same logic from the sign-up flow.
    // The incoming username is converted into the email that Supabase Auth expects.
    const email = `${username}@kairos.app`;

    // Step 2: Try to sign in the user with the generated EMAIL and the provided password.
    // We no longer need to look up the profile first.
    const { data, error: signInError } = await supabaseAdmin.auth.signInWithPassword({
      email: email,
      password: password,
    });

    // --- MODIFICATION END ---

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