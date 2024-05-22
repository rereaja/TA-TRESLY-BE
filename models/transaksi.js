'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        foreignKey: "id_user",
        as: "user",
      });
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi",
      });
    }
  }
  transaksi.init({
    id_transaksi: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    id_user: DataTypes.INTEGER,
    nama_pelanggan: DataTypes.STRING,
    alamat: DataTypes.STRING,
    status: DataTypes.ENUM('diproses', 'dikirim', 'diterima'),
    tgl_transaksi: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};