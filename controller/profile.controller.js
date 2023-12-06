const { ResponseTemplate } = require('../helper/template.helper')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


function TestProfil(req, res) {
    let resp = ResponseTemplate(null, 'success', null, 200)
    res.json(resp)
}

async function Insert(req, res) {

    const { user_id, identity_type, identity_number, address } = req.body

    const payload = {
        user_id,
        identity_type,
        identity_number,
        address
    }

    try {
        const user = await prisma.profiles.create({
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

    const { user_id, identity_type, identity_number, address } = req.query

    const payload = {}

    if (user_id) {
        payload.user_id = user_id
    }

    if (identity_type) {
        payload.identity_type = identity_type
    }
    if (identity_number) {
        payload.identity_number = identity_number
    }
    if (address) {
        payload.address = address
    }

    try {

        const users = await prisma.profiles.findMany({
            where: payload            
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

    const { profileId } = req.params

    try {
        const profil = await prisma.profiles.findUnique({
            where: {
                id: Number(profileId)
            },
        })

        let resp = ResponseTemplate(profil, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Update(req, res) {

    const { user_id, identity_type, identity_number, address } = req.body
    const { profileId } = req.params

    const payload = {}

    if (!user_id && !identity_type && !identity_number && !address) {
        let resp = ResponseTemplate(null, 'bad request', null, 400)
        res.json(resp)
        return
    }

    if (user_id) {
        payload.user_id = user_id
    }

    if (identity_type) {
        payload.identity_type = identity_type
    }
    if (identity_number) {
        payload.identity_number = identity_number
    }
    if (address) {
        payload.address = address
    }


    try {
        const profile = await prisma.profiles.update({
            where: {
                id: Number(profileId)
            },
            data: payload
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return


    }
}

async function Delete(req, res) {

    const { profileId } = req.params

    try {
        const profile = await prisma.profiles.delete({
            where: {
                id: Number(profileId)
            },
        })

        let resp = ResponseTemplate(profile, 'success', null, 200)
        res.json(resp)
        return

    } catch (error) {
        let resp = ResponseTemplate(null, 'internal server error', error, 500)
        res.json(resp)
        return
    }
}






module.exports = {
    TestProfil,
    Insert,
    Get,
    GetByPK,
    Update,
    Delete
}