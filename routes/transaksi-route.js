const express = require(`express`)
const app = express()

app.use(express.json())

const transaksiController = require(`../controllers/transaksi-controller`)
// const { authorize } = require(`../controllers/auth-controller`)


app.get(`/transaksi`, transaksiController.getTransaksi)
app.post(`/transaksi/save`,transaksiController.addTransaksi)
app.put(`/transaksi/:id_transaksi`,transaksiController.updateTransaksi)
app.put(`/transaksi/status/:id_transaksi`,transaksiController.updateStatus) // Rename route
app.delete(`/transaksi/:id_transaksi`,transaksiController.deleteTransaksi)
// app.get(`/transaksi/:tgl_transaksi`, transaksiController.getPendapatanTgl) // Rename route
// app.get(`/transaksi/bulan/:tgl_transaksi`,transaksiController.getPendapatanBln) // Rename route
// app.get(`/transaksi/getmenu`,transaksiController.getBarangTerjual) // Rename route
// app.get(`/transaksi/user/:id_user`,transaksiController.getTransaksiByUser) // Rename route
// app.get(`/transaksi/namauser/:nama_user`,transaksiController.getTransaksiByUserName) // Rename route

module.exports = app
