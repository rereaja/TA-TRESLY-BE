const express = require(`express`)
const app = express()

const barangController = require(`../controllers/barang-controller`)
// const { authorize } = require(`../controllers/auth-controller`)

app.get(`/barang`, barangController.getBarang)
app.post(`/barang`, barangController.addBarang)
app.post(`/barang/find`, barangController.filterBarang)
app.put(`/barang/:id_barang`, barangController.updateBarang)
app.delete(`/barang/:id_barang`,barangController.deleteBarang)

module.exports = app