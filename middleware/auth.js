const jwt = require('jsonwebtoken')
const SECRET_KEY=process.env.JWT_SECRET||'Vithya@15'


const auth = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1] 

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

module.exports = auth