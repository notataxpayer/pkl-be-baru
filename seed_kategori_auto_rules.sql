-- Seed data untuk tabel kategori_auto_rules
-- Cocok dengan logic likeMatch() di src/models/kategori_model.js
-- Jalankan ini saat tabel kategori_auto_rules masih kosong.

INSERT INTO kategori_auto_rules (pattern, target_sub_kelompok, priority, user_id, klaster_id) VALUES
  ('%setoran modal%', 'modal', 10, NULL, NULL),
  ('%modal awal%', 'modal', 20, NULL, NULL),
  ('%penyertaan modal%', 'modal', 30, NULL, NULL),
  ('%modal%', 'modal', 100, NULL, NULL),

  ('%panen kentang%', 'aset_lancar', 10, NULL, NULL),
  ('%persediaan benih%', 'aset_lancar', 20, NULL, NULL),
  ('%panen belum kejual%', 'aset_lancar', 30, NULL, NULL),
  ('%hasil panen%', 'aset_lancar', 40, NULL, NULL),
  ('%persediaan%', 'aset_lancar', 50, NULL, NULL),
  ('%stok%', 'aset_lancar', 60, NULL, NULL),

  ('%alat pertanian%', 'aset_tetap', 10, NULL, NULL),
  ('%mesin pertanian%', 'aset_tetap', 20, NULL, NULL),
  ('%lahan sawah%', 'aset_tetap', 30, NULL, NULL),
  ('%alat%', 'aset_tetap', 100, NULL, NULL),
  ('%mesin%', 'aset_tetap', 110, NULL, NULL),
  ('%lahan%', 'aset_tetap', 120, NULL, NULL),

  ('%cicilan alat tani%', 'kewajiban_jangka_panjang', 10, NULL, NULL),
  ('%cicilan mesin tani%', 'kewajiban_jangka_panjang', 20, NULL, NULL),
  ('%angsuran alat tani%', 'kewajiban_jangka_panjang', 30, NULL, NULL),
  ('%angsuran mesin tani%', 'kewajiban_jangka_panjang', 40, NULL, NULL),
  ('%cicilan%', 'kewajiban_jangka_panjang', 100, NULL, NULL),
  ('%angsuran%', 'kewajiban_jangka_panjang', 110, NULL, NULL),

  ('%hutang bibit%', 'kewajiban_lancar', 10, NULL, NULL),
  ('%hutang pupuk%', 'kewajiban_lancar', 20, NULL, NULL),
  ('%hutang ke tengkulak%', 'kewajiban_lancar', 30, NULL, NULL),
  ('%utang bibit%', 'kewajiban_lancar', 40, NULL, NULL),
  ('%utang pupuk%', 'kewajiban_lancar', 50, NULL, NULL),
  ('%utang%', 'kewajiban_lancar', 100, NULL, NULL),
  ('%hutang%', 'kewajiban_lancar', 110, NULL, NULL),
  ('%pinjaman%', 'kewajiban_lancar', 120, NULL, NULL);
