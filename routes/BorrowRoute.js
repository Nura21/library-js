const appUrl = process.env.API_URL;
const BorrowController = require("../controllers/BorrowControllers");

exports.routesConfig = function (app) {
    app.post(
        "/" + appUrl + "borrows-book", BorrowController.Borrow
    );

    app.post(
        "/" + appUrl + "returns-book", BorrowController.Return
    );
}


/**
 * @swagger
 * tags:
 *   name: Borrows
 *   description: API for borrowing books
 */

/**
 * @swagger
 * /api/borrows-book:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *               book_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                     message:
 *                       type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     stock_now:
 *                       type: integer
 */

/**
 * @swagger
 * /api/returns-book:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               member_code:
 *                 type: string
 *               book_code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 meta:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                     message:
 *                       type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     stock_now:
 *                       type: integer
 */
