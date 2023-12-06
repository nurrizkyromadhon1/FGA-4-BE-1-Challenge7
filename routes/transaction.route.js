const express = require('express')
const router = express.Router()
const { Get, Insert, GetByPK, Update, Delete } = require('../controller/transaction.controller')
const { CheckPostTransaction } = require('../middleware/middleware')


/**
 * @swagger
 * /api/v1/transactions:
 *   get:
 *     tags:
 *      - "Transaction"
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
 * /api/v1/transactions/:transaction:
 *   get:
 *     tags:
 *      - "Transaction" 
 *     summary: Get one user
 *     parameters:
 *       - in: path
 *         transaction: transaction
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

router.get('/:transaction', GetByPK)

// /**
//  * @swagger
//  * /
//  *   post:
//  *     summary: insert user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.post('/', CheckPostTransaction, Insert)

// /**
//  * @swagger
//  * /:id:
//  *   put:
//  *     summary: update one user
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.put('/:transaction', Update)

// /**
//  * @swagger
//  * /:id:
//  *   delete:
//  *     summary: delete one
//  *     responses:
//  *       200:
//  *         description: Successful response
//  */
router.delete('/:transaction', Delete)

module.exports = router