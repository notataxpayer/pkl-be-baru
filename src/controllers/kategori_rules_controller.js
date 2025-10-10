import { getAllPatternAndTarget } from '../models/kategori_rules_model.js'

export const getKategoriAutoRules = async (req, res) => {
  try {
    const result = await getAllPatternAndTarget()


    const formatted = result.map(item => {
      let target = item.target_sub_kelompok

      // ubah kategori
      if (target.includes('kewajiban')) target = 'pengeluaran'
      else if (target.includes('aset')) target = 'pemasukkan'

      // hapus tanda %
      const cleanPattern = item.pattern.replace(/%/g, '')

      return {
        pattern: cleanPattern,
        target_sub_kelompok: target
      }
    })

    res.status(200).json({
      success: true,
      message: 'Data kategori_auto_rules berhasil diambil',
      data: formatted
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Gagal mengambil data kategori_auto_rules',
      error: err.message
    })
  }
}

