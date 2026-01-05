import { getSupabaseAdmin } from './supabase';

export async function getSystemSettings() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from('system_settings')
      .select('*');

    if (error) {
      console.error('Error fetching system settings:', error);
      return null;
    }

    if (!data || data.length === 0) return null;

    return data.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
  } catch (err) {
    console.error('Unexpected error fetching system settings:', err);
    return null;
  }
}
