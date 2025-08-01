require('dotenv').config()
const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

describe('Protected route test', () => {
  let token;

  beforeAll(async () => {
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

  test('GET/users returns 200 with auth token', async () => {
    const res = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})