const express = require('express')
const router = express.Router()
const { Get, Insert, GetByPK, Update, Delete } = require('../controller/profile.controller')
const { CheckPostProfile } = require('../middleware/middleware')


/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     tags:
 *      - "Profil"
 *     summary: example to get user
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.get('/', Get)

/**
 * @swagger
 * /api/v1/transactions/:profileId:
 *   get:
 *     tags:
 *      - "Profil" 
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         profileId: profileId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.get('/:profileId', GetByPK)

// /**
//  * @swagger
//  * /
//  *   post:
//  *     summary: insert user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.post('/', CheckPostProfile, Insert)

// /**
//  * @swagger
//  * /:id:
//  *   put:
//  *     summary: update one user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.put('/:profileId', Update)

// /**
//  * @swagger
//  * /:id:
//  *   delete:
//  *     summary: delete one
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.delete('/:profileId', Delete)

module.exports = router