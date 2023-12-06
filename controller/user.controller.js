const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


function TestUser(req, res) {
    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function Insert(req, res) {

    const { name, email, password } = req.body

    const payload = {
        name,
        email,
        password
    }

    try {
        const user = await prisma.users.create({
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Get(req, res) {

    const { name, email } = req.query

    const payload = {}

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }    

    try {
        const page = parseInt(req.query.page) || 1; // Nomor halaman
        const perPage = parseInt(req.query.perPage) || 10; // Jumlah item per halaman
        const skip = (page - 1) * perPage;
        const users = await prisma.users.findMany({
            skip,
            take: perPage,
            where: payload,
            select: {
                email: true,
                name: true,
            },            
        });

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function GetByPK(req, res) {

    const { userId } = req.params

    try {
        const users = await prisma.users.findUnique({
            where: {
                id: Number(userId)
            },
            select: {
                email: true,
                name: true,
            },
            include: {
                profiles: true,                
            }
        })

        let resp = ResponseTemplate(users, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { name, email, password } = req.body
    const { userId } = req.params

    const payload = {}

    if (!name && !email && !password) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (name) {
        payload.name = name
    }

    if (email) {
        payload.email = email
    }

    if (password) {
        payload.password = password
    }


    try {
        const user = await prisma.users.update({
            where: {
                id: Number(userId)
            },
            data: payload
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { userId } = req.params

    try {
        const user = await prisma.users.delete({
            where: {
                id: Number(userId)
            },
        })

        let resp = ResponseTemplate(user, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}






module.exports = {
    TestUser,
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}