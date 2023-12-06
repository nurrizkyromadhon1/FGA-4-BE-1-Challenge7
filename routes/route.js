const express = require('express')
const router = express.Router()
const userRoute = require('./user.route')
const profilRoute = require('./profil.route')
const bankAccountRoute = require('./bank.account.route')
const transactionRoute = require('./transaction.route')
const morgan = require('morgan')

router.use(morgan('dev'))
router.get('/ping', (req, res) => {
    const pong = 'PING' || 'void'
    res.render('index', {
        pong
    })
    return
})

router.post('/signup', (req, res) => {
    const pong = 'PING' || 'void'
    res.render('register')
    return
})

router.use('/api/v1/users', userRoute)
router.use('/api/v1/profile', profilRoute)
router.use('/api/v1/accounts', bankAccountRoute)
router.use('/api/v1/transactions', transactionRoute)





module.exports = router