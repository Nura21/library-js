const appUrl = process.env.API_URL;
const MemberController = require("../controllers/MemberControllers");

exports.routesConfig = function (app) {
    app.get(
        "/" + appUrl + "members", MemberController.Index
    );
}

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: API for managing members
 */

/**
 * @swagger
 * /api/members:
 *   get:
 *     summary: Retrieve a list of members
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: A list of members
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                       name:
 *                         type: string
 *                       penalty_until:
 *                         type: string
 *                         nullable: true
 *                       borrowed_books:
 *                         type: integer
 */
