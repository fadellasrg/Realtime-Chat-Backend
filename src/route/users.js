const express = require('express');

const {
    login,
    register,
    updateUser,
    getDetail,
    deletePhoto,
    listUsers
} = require('../controller/users')

const { authentication } = require('../helper/middleware/auth')
const singleUpload = require('../helper/middleware/upload')

const Router = express.Router()

Router
  .post('/api/register', register)
  .post('/api/login', login)
  .patch('/api/user/:id', singleUpload, authentication, updateUser)
  .get('/api/user/:id', authentication, getDetail)
  .get('/api/delete_photo/:id', authentication, deletePhoto)
  .get('/api/users', authentication, listUsers)

module.exports = Router