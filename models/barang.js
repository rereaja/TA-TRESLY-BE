'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.detail_transaksi, {
        foreignKey: `id_barang` , as: `detail_transaksi`
      })
    }
  }
  barang.init({
    id_barang: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    nama_barang: DataTypes.STRING,
    jenis: DataTypes.ENUM('jawa', 'sunda', 'betawi', 'papua', 'sulawesi', 'bali'),
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    harga: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'barang',
  });
  return barang;
};