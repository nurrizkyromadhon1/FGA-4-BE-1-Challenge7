const express = require('express')
const router = express.Router()
const { Get, Insert, GetByPK, Update, Delete } = require('../controller/bank.accoount.controller')
const { CheckPostAccount } = require('../middleware/middleware')

router.get('/', Get)
router.get('/:accountId', GetByPK)
router.post('/', CheckPostAccount, Insert)
router.put('/:accountId', Update)
router.delete('/:accountId', Delete)
module.exports = router


/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     tags:
 *      - "Bank Account"
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
 * /api/v1/accounts/:accountId:
 *   get:
 *     tags:
 *      - "Bank Account" 
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         accountId: accountId
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

router.get('/:accountId', GetByPK)

// /**
//  * @swagger
//  * /
//  *   post:
//  *     summary: insert user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.post('/', CheckPostAccount, Insert)

// /**
//  * @swagger
//  * /:id:
//  *   put:
//  *     summary: update one user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.put('/:accountId', Update)

// /**
//  * @swagger
//  * /:id:
//  *   delete:
//  *     summary: delete one
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.delete('/:accountId', Delete)

module.exports = router