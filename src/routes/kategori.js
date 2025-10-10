// src/routes/kategori.js
import express from 'express';
import { authRequired, roleGuard } from '../middlewares/auth.js';
import { create, list, remove, listByScope } from '../controllers/kategori_controller.js';
import { getKategoriAutoRules } from '../controllers/kategori_rules_controller.js'

const router = express.Router();

router.get('/', authRequired, list);
router.post('/', authRequired, create);
router.delete('/:id', authRequired, roleGuard('admin', 'superadmin'), remove);
router.get('/rules', getKategoriAutoRules)
router.get('/scope', authRequired, listByScope);

// ----- Swagger -----
// ----- Swagger -----
/**
 * @openapi
 * /kategori:
 *   get:
 *     summary: List kategori
 *     description: |
 *       Mengembalikan daftar kategori yang bisa diakses user.  
 *       - Viewer user hanya akan melihat kategori miliknya sendiri atau klasternya.  
 *       - Bisa difilter dengan `jenis` atau `search`.
 *     security: [ { BearerAuth: [] } ]
 *     tags: [Kategori]
 *     parameters:
 *       - in: query
 *         name: jenis
 *         schema:
 *           type: string
 *           enum: [pengeluaran, pemasukan, produk, pasar]
 *         description: Filter kategori berdasarkan jenis.
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Cari berdasarkan nama kategori (ILIKE).
 *       - in: query
 *         name: page
 *         schema: { type: integer, minimum: 1, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 100, default: 20 }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page: { type: integer, example: 1 }
 *                 limit: { type: integer, example: 20 }
 *                 total: { type: integer, example: 42 }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/Kategori' }
 *       401: { description: Unauthorized }
 *   post:
 *     summary: Buat kategori
 *     description: |
 *       Membuat kategori baru.  
 *       - `neraca_identifier` akan otomatis ditetapkan oleh sistem sesuai jenis & scope (user/klaster).  
 *       - Hanya field `nama` dan `jenis` yang diperlukan.
 *     security: [ { BearerAuth: [] } ]
 *     tags: [Kategori]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nama, jenis]
 *             properties:
 *               nama:
 *                 type: string
 *                 example: "Setoran Modal"
 *               jenis:
 *                 type: string
 *                 enum: [pengeluaran, pemasukan, produk, pasar]
 *                 example: "pemasukan"
 *     responses:
 *       201:
 *         description: Kategori dibuat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Kategori dibuat" }
 *                 data: { $ref: '#/components/schemas/Kategori' }
 *       400: { description: Validasi gagal }
 *       401: { description: Unauthorized }
 */

/**
 * @openapi
 * /kategori/{id}:
 *   delete:
 *     summary: Hapus kategori (admin/superadmin atau pemilik kategori)
 *     description: |
 *       Menghapus kategori bila tidak dipakai.  
 *       - Admin/superadmin selalu boleh.  
 *       - User biasa hanya boleh hapus kategori miliknya atau klasternya.  
 *       - Tidak bisa dihapus bila kategori masih dipakai produk atau laporan keuangan.
 *     security: [ { BearerAuth: [] } ]
 *     tags: [Kategori]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Kategori dihapus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Kategori dihapus" }
 *       401: { description: Unauthorized }
 *       403: { description: Forbidden (bukan pemilik/admin) }
 *       404: { description: Tidak ditemukan }
 *       409:
 *         description: Kategori dipakai oleh produk/laporan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: { type: string, example: "Kategori dipakai di laporan keuangan—tidak bisa dihapus" }
 */

/**
 * @openapi
 * /rules:
 *   get:
 *     summary: Ambil daftar aturan kategori otomatis
 *     description: |
 *       Mengambil semua data `pattern` dan `target_sub_kelompok` dari tabel **kategori_auto_rules**.  
 *       - Hasil sudah diformat:  
 *         - Tanda `%` dihapus dari `pattern`.  
 *         - `target_sub_kelompok` diubah menjadi:  
 *           - **"pemasukkan"** jika mengandung kata "aset".  
 *           - **"pengeluaran"** jika mengandung kata "kewajiban".  
 *           - Dibiarkan apa adanya jika bukan keduanya (misalnya "modal").
 *     tags: [Kategori Auto Rules]
 *     responses:
 *       200:
 *         description: Data kategori_auto_rules berhasil diambil
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Data kategori_auto_rules berhasil diambil"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       pattern:
 *                         type: string
 *                         example: "hasil"
 *                       target_sub_kelompok:
 *                         type: string
 *                         example: "pemasukkan"
 *       500:
 *         description: Gagal mengambil data kategori_auto_rules
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Gagal mengambil data kategori_auto_rules"
 *                 error:
 *                   type: string
 *                   example: "Database connection error"
 */

export default router;