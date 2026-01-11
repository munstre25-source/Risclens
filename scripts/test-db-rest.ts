import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://txbluzobjjlpbocpyygt.supabase.co'
const supabaseServiceKey = 'sb_secret_F-QiN2cnIka26QAk2Dwsbw_qDTlM2tu'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function test() {
  const { data, error } = await supabase.from('leads').select('*').limit(1)
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Success:', data)
  }
}

test()
