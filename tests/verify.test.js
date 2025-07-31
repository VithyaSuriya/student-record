// tests/verify.test.js
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/verifyToken') // Adjust path if needed

describe('JWT Middleware', () => {

    it('should return 401 when token is not provided', () => {
        const req = { headers: {} }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = jest.fn()

        middleware(req, res, next)

        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.json).toHaveBeenCalledWith({
            data: null,
            message: 'No token provided',
            error: 'No Token found'
        })
    })

    it('should return 403 when token is invalid', done => {
        const req = {
            headers: {
                authorization: 'Bearer invalidtoken'
            }
        }
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const next = jest.fn()

        middleware(req, res, next)

        setImmediate(() => {
            expect(res.status).toHaveBeenCalledWith(403)
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: null,
                message: 'Invalid token',
                error: expect.any(String)
            }))
            done()
        })
    })

    it('should call next() when token is valid', done => {
        const userPayload = { id: 1, name: 'Vithya' }
        const token = jwt.sign(userPayload, 'Vithya@15')

        const req = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }
        const res = {}
        const next = jest.fn()

        middleware(req, res, next)

        setImmediate(() => {
            expect(req.user.id).toBe(userPayload.id)
            expect(req.user.name).toBe(userPayload.name)
            expect(next).toHaveBeenCalled()
            done()
        })
    })

})