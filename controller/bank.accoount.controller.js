const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


function TestAccount(req, res) {
    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function Insert(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.body

    const payload = {
        user_id,
        bank_name,
        bank_account_number,
        balance
    }

    try {
        const account = await prisma.bank_accounts.create({
            data: payload
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }
    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }
    if (balance) {
        payload.balance = balance
    }

    try {

        const account = await prisma.bank_accounts.findMany({
            where: payload            
        });

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { accountId } = req.params

    try {
        const account = await prisma.bank_accounts.findUnique({
            where: {
                id: Number(accountId)
            },
            include: {
                user: true,
                transactions: true,
                transactionFrom: true
            }
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, bank_name, bank_account_number, balance } = req.body
    const { accountId } = req.params

    const payload = {}

    if (!user_id && !bank_name && !bank_account_number && !balance) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (user_id) {
        payload.user_id = user_id
    }

    if (bank_name) {
        payload.bank_name = bank_name
    }
    if (bank_account_number) {
        payload.bank_account_number = bank_account_number
    }
    if (balance) {
        payload.balance = balance
    }


    try {
        const account = await prisma.bank_accounts.update({
            where: {
                id: Number(accountId)
            },
            data: payload
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { accountId } = req.params

    try {
        const account = await prisma.bank_accounts.delete({
            where: {
                id: Number(accountId)
            },
        })

        let resp = ResponseTemplate(account, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}






module.exports = {
    TestAccount,
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}