const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('courses').select('*').limit(1);
  if (error) {
    console.error(error);
  } else {
    console.log('Columns:', Object.keys(data[0] || {}));
  }
}
check();
