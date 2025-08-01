const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

describe('Protected route test', () => {
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL);

  
    await User.deleteMany({})
    const testUser = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    })

    
    token = jwt.sign(
      { id: testUser._id, email: testUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  test('GET /api/user/protected returns 200 with auth token', async () => {
    const res = await request(app)
      .get('/api/user/protected')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})