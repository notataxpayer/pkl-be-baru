// models/kategoriAutoRulesModel.js
import supabase from '../config/supabase.js';

export const getAllPatternAndTarget = async () => {
  const { data, error } = await supabase
    .from('kategori_auto_rules')
    .select('pattern, target_sub_kelompok')
    .not('pattern', 'is', null)
    .not('target_sub_kelompok', 'is', null)
    .order('target_sub_kelompok', { ascending: true })
    .order('pattern', { ascending: true })

  if (error) throw error
  return data
}