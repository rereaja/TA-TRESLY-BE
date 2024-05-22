const barangModel = require(`../models/index`).barang
const upload = require(`./upload-barang`)
const path = require(`path`)
const fs = require(`fs`)
const joi = require(`joi`)
const { Op } = require("sequelize")

const validateBarang = (input) => {
    let rules = joi.object().keys({
        nama_barang: joi
            .string()
            .required(),
        jenis: joi
            .string()
            .valid(`jawa`, `sunda`, `betawi`, `papua`, `sulawesi`, `bali`)
            .required(),
        deskripsi: joi
            .string()
            .required(),
        harga: joi
            .number()
            .required()
    })
    let { error } = rules.validate(input)
    if (error) {
        let message = error
            .details
            .map(item => item.message)
            .join(`,`)

        return {
            status: false,
            message: message
        }
    }
    return {
        status: true
    }
}

exports.addBarang = async (request, response) => {
    try {
        const uploadBarang = upload.single(`gambar`)
        uploadBarang(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            if (!request.file) {
                return response.json({
                    status: false,
                    message: `Nothing file to upload`
                })
            }

            let resultValidation = validateBarang(request.body)
            if (resultValidation.status === false) {
                return response.json({
                    status: false,
                    message: resultValidation.message
                })
            }

            request.body.gambar = request.file.filename

            await barangModel.create(request.body)
            return response.json({
                status: true,
                message: `Data barang berhasil ditambahkan`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.getBarang = async (request, response) => {
    try {
        let result = await barangModel.findAll()
        return response.json({
            status: true,
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}

exports.filterBarang = async (request, response) => {
    try {
        let keyword = request.body.keyword
        let result = await barangModel.findAll({
            where: {
                [Op.or]: {
                    nama_baju: { [Op.substring]: keyword },
                    jenis: { [Op.substring]: keyword },
                    deskripsi: { [Op.substring]: keyword }
                }
            }
        })
        return response.json({
            status: true,       
            data: result
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.updateBarang = async (request, response) => {
    try {
        const uploadBarang = upload.single(`gambar`)
        uploadBarang(request, response, async error => {
            if (error) {
                return response.json({
                    status: false,
                    message: error
                })
            }
            let id_barang = request.params.id_barang
            let selectedBarang = await barangModel.findOne({ where: { id_barang: id_barang } })
            if (request.file) {
                let oldFilename = selectedBarang.gambar
                let pathFile = path.join(__dirname, `../barang-image`, oldFilename)
                if (fs.existsSync(pathFile)) {
                    fs.unlinkSync(pathFile, error => { console.log(error) })
                }
                request.body.gambar = request.file.filename
            }
            await barangModel.update(request.body, { where: { id_barang: id_barang } })
            return response.json({
                status: true,
                message: `Data menu berhasil diubah`
            })
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}
exports.deleteBarang = async (request, response) => {
    try {
        let id_barang = request.params.id_barang
        let selectedBarang = await barangModel.findOne({ where: { id_barang: id_barang } })
        let pathFile = path.join(__dirname, `../barang-image`, selectedBarang.gambar)
        if (fs.existsSync(pathFile)) {
            fs.unlinkSync(pathFile, error => { console.log(error) })
        }
        await barangModel.destroy({ where: { id_barang: id_barang } })
        return response.json({
            status: true,
            message: `Data barang berhasil dihapus`
        })
    } catch (error) {
        return response.json({
            status: false,
            message: error.message
        })
    }
}