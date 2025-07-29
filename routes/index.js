const express = require('express')
const router = express.Router()

const studentRoutes = require('./studentRoutes')
const userRoutes = require('./userRoutes')

router.use('/students',studentRoutes)
router.use('/users',userRoutes)

module.exports = router