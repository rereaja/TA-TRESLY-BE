const userModel = require(`../models/index`).user;
const joi = require(`joi`);
const { Op } = require("sequelize");
// const md5 = require(`md5`);

const validateUser = (input) => {
  let rules = joi.object().keys({
    nama_user: joi.string().required(),
    role: joi.string().valid(`pelanggan`, `admin`, `manager`).required(),
    username: joi.string().required(),
    password: joi.string().min(2),
    tlp: joi.string().required(),
    tgl_lahir: joi.date().required(),
  });
  let { error } = rules.validate(input);
  if (error) {
    let message = error.details.map((item) => item.message).join(`,`);
    return {
      status: false,
      message: error.message,
    };
  }
  return {
    status: true,
  };
};

exports.getUser = async (request, response) => {
  try {
    let result = await userModel.findAll();
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

exports.findUser = async (request, response) => {
  try {
    let keyword = request.body.keyword;
    let result = await userModel.findAll({
      where: {
        [Op.or]: {
          id_user: { [Op.substring]: keyword },
          nama_user: { [Op.substring]: keyword },
          role: { [Op.substring]: keyword },
          username: { [Op.substring]: keyword },
        },
      },
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

exports.addUser = async (request, response) => {
  try {
    let resultValidation = validateUser(request.body);
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }
    // request.body.password = md5(request.body.password);
    await userModel.create(request.body);
    return response.json({
      status: true,
      message: `Data user berhasil ditambahkan`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateUser = async (request, response) => {
  try {
    let id_user = request.params.id;
    let resultValidation = validateUser(request.body);
    if (resultValidation.status === false) {
      return response.json({
        status: false,
        message: resultValidation.message,
      });
    }

    // Hilangkan logika untuk mengenkripsi password
    // if (request.body.password) {
    //   request.body.password = md5(request.body.password);
    // }

    // Langsung lakukan pembaruan pada data pengguna tanpa mengenkripsi password
    await userModel.update(request.body, { where: { id_user: id_user } });

    return response.json({
      status: true,
      message: `Data user berhasil diubah`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

exports.deleteUser = async (request, response) => {
  try {
    let id_user = request.params.id;
    await userModel.destroy({ where: { id_user: id_user } });
    return response.json({
      status: true,
      message: `Data user berhasil dihapus`,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

// role
exports.roleUser = async (request, response) => {
  try {
    const role = request.params.role;
    const users = await userModel.findAll({ where: { role } });

    if (users.length > 0) {
      return response.json({
        status: "success",
        data: users,
      });
    } else {
      return response.status(404).json({
        status: "error",
        message: "Tidak ada pengguna dengan peran ini",
      });
    }
  } catch (error) {
    return response.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
