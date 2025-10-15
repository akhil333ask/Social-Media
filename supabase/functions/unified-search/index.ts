import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { searchTerm } = await req.json()
    if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim() === '') {
      // Return an empty array if the search term is invalid
      return new Response(JSON.stringify([]), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }
    
    // Sanitize the search term to remove the '@' symbol for better matching
    const sanitizedTerm = searchTerm.replace(/^@/, '').trim()

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // We will run two queries in parallel for maximum speed
    const [profilesPromise, churchesPromise] = await Promise.all([
      // Query 1: Find matching user profiles
      supabaseAdmin
        .from('profiles')
        .select('id, full_name, username, account_type')
        .ilike('username', `%${sanitizedTerm}%`), // ilike is case-insensitive
      
      // Query 2: Find matching churches by username OR address
      supabaseAdmin
        .from('churches')
        .select('id, name, username, address')
        .or(`username.ilike.%${sanitizedTerm}%,address.ilike.%${searchTerm}%`) // Note: search address with original term
    ])

    if (profilesPromise.error) throw profilesPromise.error
    if (churchesPromise.error) throw churchesPromise.error

    // Add a 'type' property to each result so the frontend knows how to display it
    const users = profilesPromise.data.map(p => ({ ...p, type: 'user' }))
    const churches = churchesPromise.data.map(c => ({ ...c, type: 'church' }))

    // Combine the results into a single array
    const combinedResults = [...users, ...churches]

    return new Response(JSON.stringify(combinedResults), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
