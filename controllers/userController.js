const userService = require('../services/userService')

exports.registerUser = async (req, res) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json({ message: 'Registered successfully', user })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userService.loginUser(email, password)
        res.status(200).json({ message: 'Login successful', user })
    } catch (err) {
        res.status(401).json({ error: err.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers()
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body)
        res.json(user)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await userService.deleteUser(req.params.id)
        res.json({ message: 'User deleted' })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}