const userService = require('../services/userService')

exports.registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json({ data:user,message: 'Registered successfully',error:null })
    } catch (err) {
        res.status(400).json({data:null,message:'Registered Failed',error:err.message})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.loginUser(email, password)
        res.status(200).json({data:user, message: 'Login successful', error:null })
    } catch (err) {
        res.status(401).json({data:null,message:'Invalid email or password', error: err.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.status(200).json({
            data:users,message:'Fetched successfully',error:null
        })
    } catch (err) {
        res.status(500).json({ data:null,message:'Error fetching users',error: err.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) return res.status(404).json({data:null,message:'User not found', error: ' not found' })
        res.status(200).json({data:user,message:'found successfully',error:null})
    } catch (err) {
        res.status(500).json({ data:null,message:'Error fetching user',error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body)
        res.status(200).json({data:user,message:'Updated',error:null})
    } catch (err) {
        res.status(500).json({ data:null,message:'Error in Updating',error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
    const user  =  await userService.deleteUser(req.params.id)
        res.status(200).json({ data:user,message: 'User deleted',error:null })
    } catch (err) {
        res.status(500).json({ data:null,message:'Error in deleting',error: err.message })
    }
}