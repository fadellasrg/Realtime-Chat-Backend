const bcrypt = require ('bcrypt')
const { 
    mRegister, 
    mCheckEmail,
    mUpdateUser,
    mDetailUser,
    mDeletePhoto,
    mListUser
} = require ('../model/users')
const { success, failed, notFound } = require('../helper/response')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../helper/env')
const fs = require('fs')

module.exports = {
    login: (req, res) => {
        const body = req.body
        mCheckEmail(body.email).then( async (response) => {
            if(response.length === 1){
                const checkPassword = await bcrypt.compare(body.password, response[0].password)
                if(checkPassword){
                    const dataUser = {  // data to be encrypted by JWT
                        id: response[0].id,
                        email: response[0].email
                    }
                    const token = jwt.sign(dataUser, JWT_SECRET)
                    res.json({
                        message: 'Login success',
                        token,     // same property and value
                        name: response[0].name,
                        room_id: response[0].room_id,
                        id: response[0].id
                    })
                }else{
                    failed(res, 'Login failed, please check your password', {})
                }
            }else if (!body.email || !body.password) {
                failed(res, 'Please fill all field', {})
            }else{
                notFound(res,"Email not found", {})
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err)
        })
    },
    register: async(req, res) => {
        const body = req.body
        const username = body.email.match(/^([^@]*)@/)[1];
        const data = {
            room_id: Math.floor((Math.random() * 1000) + 1),
            email: body.email,
            name: body.name,
            username: username,
            password: body.password,
            image: 'default_photo.png',
            phone: '+62',
            bio: 'Hello there!',
            latitude: '3.596046803488549',
            longitude: '98.67275547271525'
        }
        mCheckEmail(data.email).then( async (response) => {
            if(response.length >= 1){
                failed(res, 'Email has been registered', {})
            }else if (!data.email || !data.name || !data.password) {
                failed(res, 'Input all field', {})
            }else{
                // use salt to add a unique code in password
                const salt = await bcrypt.genSalt(10) // 10 to make code more unique (optional)
                const password = await bcrypt.hash(data.password, salt)
                const user = {
                    room_id: data.room_id,
                    email: data.email,
                    name: data.name,
                    username: data.username,
                    password,
                    image: data.image,
                    phone: data.phone,
                    bio: data.bio,
                    latitude: data.latitude,
                    longitude: data.longitude
                }
                if( !data.name || !data.email || !data.password){
                    failed(res, 'All textfield is required!', [])
                }else{
                    mRegister(user).then((response) => {
                        success(res, {}, {}, 'Register success')
                    }).catch((err) => {
                        failed(res, 'Internal server error', err)
                    })
                }
            }
        }).catch((err) => {
            failed(res, 'Internal server error', err)
        })
    },
    updateUser: async (req, res) => {
        try {
            const data = req.body
            const id = req.params.id
            const detail = await mDetailUser(id)
            if(req.file){
                if(detail[0].image === 'default_photo.png'){
                    data.image = req.file.filename
                    mUpdateUser(data, id)
                    .then((response)=>{
                        success(res, response, {}, 'Update profile success')
                    }).catch((err)=>{
                        // failed(res, 'Internal server error', [])
                    }) 
                }else{
                    data.image = req.file.filename
                    const path = `./public/images/${detail[0].image}`
                    if (fs.existsSync(path)) {
                        fs.unlinkSync(path)
                    }
                    mUpdateUser(data, id)
                    .then((response)=>{
                        success(res, response, {}, 'Update profile success')
                    }).catch((err)=>{
                        // failed(res, 'Internal server error', [])
                        console.log(err)
                    }) 
                }
            }else{
                mUpdateUser(data, id)
                .then((response)=>{
                    success(res, response, {}, 'Update profile success')
                }).catch((err)=>{
                    // failed(res, 'Internal server error', [])
                    console.log(err)
                })
            }
        } catch (error) {
            // failed(res, 'Internal server error', [])
            console.log(error)
        }
    },
    getDetail: (req, res)=>{
        try {
            const id = req.params.id
            
            mDetailUser(id)
            .then((response)=>{
                if(response.length > 0){
                    success(res, response, {}, 'Get detail user success')
                }else{
                    notFound(res,"Data unavailable", response)
                }
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
        
    },
    deletePhoto: (req, res) => {
        try {
            mDeletePhoto(req.params.id).then(() => {
                mDetailUser(req.params.id).then(result => {
                    if (result[0].image !== 'default_photo.png') {
                        const path = `./public/images/${result[0].image}`
                        fs.unlinkSync(path)
                    }
                    success(res, 'Delete Image success')
                }).catch(err => {
                    failed(res, 'Internal server error', err)
                })
            }).catch((err) => {
                failed(res, 'Internal server error', err)
            })
        } catch (error) {
            failed(res, 'Internal server error', error)
        }
    },
    listUsers: (req, res) => {
        try {
            mListUser()
            .then((response)=>{
                if(response.length > 0){
                    success(res, response, {}, 'Get list users success')
                }else{
                    notFound(res,"Data unavailable", response)
                }
            }).catch(()=>{
                failed(res, 'Internal server error', [])
            })
        } catch (error) {
            failed(res, 'Internal server error', [])
        }
    }
}