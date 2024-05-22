const userModel = require(`../models/index`).user;
const transaksiModel = require(`../models/index`).transaksi;
const detailModel = require(`../models/index`).detail_transaksi;
const barangModel = require(`../models/index`).barang;
// const { fn, col, literal } = require("sequelize");

// Tambah Transaksi
exports.addTransaksi = async (request, response) => {
  try {
    // Memeriksa apakah ada detail transaksi yang diberikan
    if (!request.body.detail_transaksi || request.body.detail_transaksi.length === 0) {
      throw new Error("Eits, ada yang belum diisi!");
    }

    // Ambil detail transaksi dari permintaan
    let arrayDetail = request.body.detail_transaksi;

    // Validasi setiap detail transaksi sebelum melakukan operasi database
    for (let i = 0; i < arrayDetail.length; i++) {
      // Memeriksa apakah id_barang dan jumlah pesanan tersedia dan jumlah tidak boleh 0
      if (!arrayDetail[i].id_barang || arrayDetail[i].jumlah === undefined || arrayDetail[i].jumlah <= 0) {
        throw new Error("Eits, ada yang belum diisi!");
      }
    }

    // Dapatkan ID pengguna dari permintaan
    const userId = request.body.id_user;

    // Temukan pengguna berdasarkan ID
    const user = await userModel.findByPk(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    let transaksi = {
      tgl_transaksi: request.body.tgl_transaksi,
      id_user: userId,
      nama_pelanggan: request.body.nama_pelanggan, 
      alamat: request.body.alamat, 
      status: "diproses",
    };

    // Tambahkan transaksi ke database
    let insertTransaksi = await transaksiModel.create(transaksi);

    // Dapatkan ID transaksi yang baru saja dibuat
    let transaksiID = insertTransaksi.id_transaksi;

    // Iterasi melalui setiap detail transaksi untuk mengatur id_transaksi dan harga
    for (let i = 0; i < arrayDetail.length; i++) {
      // Set id_transaksi untuk setiap detail transaksi
      arrayDetail[i].id_transaksi = transaksiID;

      // Dapatkan harga barang dari database berdasarkan id_barang
      let barang = await barangModel.findOne({
        where: { id_barang: arrayDetail[i].id_barang },
      });

      // Set harga untuk setiap detail transaksi
      arrayDetail[i].harga = barang ? barang.harga : 0;
    }

    // Tambahkan detail transaksi ke database
    await detailModel.bulkCreate(arrayDetail);

    // Kirim respons JSON sukses
    return response.json({
      status: true,
      insertTransaksi,
      message: `Data transaksi berhasil ditambahkan`,
    });
  } catch (error) {
    // Tangani kesalahan dan kirim respons JSON dengan pesan kesalahan
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


// Get Semua Data Transaksi
exports.getTransaksi = async (request, response) => {
  try {
    let result = await transaksiModel.findAll({
      include: [
        {
          model: detailModel,
          as: "detail_transaksi",
          include: [{model: barangModel, as:"barang"}], 
        },
      ],
      order:[["createdAt", "DESC"]]
    });

    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


// Update Transaksi
// Update Transaksi
exports.updateTransaksi = async (request, response) => {
  try {
    const id_transaksi = request.params.id_transaksi;

    // Memeriksa apakah ada detail transaksi yang diberikan
    if (!request.body.detail_transaksi || request.body.detail_transaksi.length === 0) {
      throw new Error("Eits, ada yang belum diisi!");
    }

    // Dapatkan data transaksi yang akan diupdate
    const transaksi = await transaksiModel.findByPk(id_transaksi);
    if (!transaksi) {
      throw new Error("Transaksi not found.");
    }

    // Validasi setiap detail transaksi sebelum melakukan operasi database
    const detailTransaksi = request.body.detail_transaksi;
    for (let i = 0; i < detailTransaksi.length; i++) {
      // Memeriksa apakah id_barang dan jumlah pesanan tersedia dan jumlah tidak boleh 0
      if (!detailTransaksi[i].id_barang || detailTransaksi[i].jumlah === undefined || detailTransaksi[i].jumlah <= 0) {
        throw new Error("Eits, ada yang belum diisi!");
      }
    }

    // Update data transaksi
    await transaksiModel.update({
      nama_pelanggan: request.body.nama_pelanggan,
      alamat: request.body.alamat,
      id_user: request.body.id_user,
      tgl_transaksi: request.body.tgl_transaksi
    }, {
      where: { id_transaksi }
    });

    // Hapus detail transaksi yang terkait dengan transaksi ini
    await detailModel.destroy({
      where: { id_transaksi }
    });

    // Iterasi melalui setiap detail transaksi untuk mengatur id_transaksi dan harga
    for (let i = 0; i < detailTransaksi.length; i++) {
      const detail = detailTransaksi[i];
      // Validasi jumlah pesanan tidak boleh 0
      if (detail.jumlah <= 0) {
        throw new Error("Eits, ada yang belum diisi!");
      }
      // Dapatkan harga barang dari database berdasarkan id_barang
      const barang = await barangModel.findByPk(detail.id_barang);
      if (!barang) {
        throw new Error(`Barang dengan id ${detail.id_barang} tidak ditemukan.`);
      }
      // Tambahkan detail transaksi baru ke database
      await detailModel.create({
        id_transaksi,
        id_barang: detail.id_barang,
        jumlah: detail.jumlah,
        harga: barang.harga
      });
    }

    return response.json({
      status: true,
      message: "Data transaksi berhasil diubah",
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};


// Update Status Transaksi
exports.updateStatus = async (request, response) => {
  try {
    const id_transaksi = request.params.id_transaksi;
    const status = request.body.status;

    // Update status transaksi
    await transaksiModel.update({ status }, { where: { id_transaksi } });

    return response.json({
      status: true,
      message: "Status transaksi berhasil diperbarui",
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

// Hapus Transaksi
exports.deleteTransaksi = async (request, response) => {
  try {
    let id_transaksi = request.params.id_transaksi;
    await detailModel.destroy({ where: { id_transaksi: id_transaksi } });
    await transaksiModel.destroy({ where: { id_transaksi: id_transaksi } });

    return response.json({
      status: true,
      message: `Data transaksi berhasil dihapus`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};
