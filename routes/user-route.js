const express = require(`express`)
const app = express()

app.use(express.json())

const userController = require(`../controllers/user-controller`)
const { authorize } =require('../controllers/auth-controller')

app.get(`/user`, authorize, userController.getUser)
app.get(`/user/:role`, userController.roleUser)
app.post(`/user/find`, userController.findUser)
app.post(`/user/save`, userController.addUser)
app.put(`/user/:id`, userController.updateUser)
app.delete(`/user/:id`,userController.deleteUser)

module.exports = app