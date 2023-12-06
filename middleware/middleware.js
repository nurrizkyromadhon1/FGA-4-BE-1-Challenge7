
const { ResponseTemplate } = require('../helper/template.helper')
const Joi = require('joi');
// function PrintSuccess(req, res, next) {
//     const { } = req.params.id
//     console.log(` SELALU BERHASIL AKSES`)
//     next()
// }

// function PrintSuccessRoute(req, res, next) {

//     console.log(` SELALU BERHASIL AKSES LEWAT ROUTE LEVEL`)
//     next()
// }

function CheckPostReq(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().alphanum().max(255).required(),
        password: Joi.string().alphanum().required(),
        email: Joi.string().email().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

function CheckPostProfile(req, res, next) {
    const schema = Joi.object({
        address: Joi.string().alphanum().max(255).required(),
        identity_number: Joi.number().required(),
        identity_type: Joi.string().required(),
        user_id: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

function CheckPostAccount(req, res, next) {
    const schema = Joi.object({
        bank_name: Joi.string().alphanum().max(255).required(),
        user_id: Joi.number().required(),
        bank_account_number: Joi.number().required(),
        balance: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}

function CheckPostTransaction(req, res, next) {
    const schema = Joi.object({        
        source_account_id: Joi.number().required(),        
        destination_account_id: Joi.number().required(),        
        amount: Joi.number().required()
    })

    const { error } = schema.validate(req.body)
    if (error) {
        let respErr = ResponseTemplate(null, 'invalid request',
            error.details[0].message, 400)
        res.json(respErr)
        return
    }

    next()
}


module.exports = {
    CheckPostReq,
    CheckPostProfile,
    CheckPostAccount,
    CheckPostTransaction
}