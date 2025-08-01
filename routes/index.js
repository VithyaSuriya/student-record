const express = require('express')
const router = express.Router()

const studentRoutes = require('./studentRoutes')
const userRoutes = require('./userRoutes')
const authRoutes=require('./authRoutes')


router.use('/students',studentRoutes)
router.use('/users',userRoutes)
router.use('/auth',authRoutes)

module.exports = router