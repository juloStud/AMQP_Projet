/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - id
 *         - description
 *         - flag
 *       properties:
 *         id:
 *           type: number
 *           description: L'id généré automatiquement du message
 *         description:
 *           type: string
 *           description: La description du message
 *         flag:
 *           type: number
 *           description: Le flag du message
 *       example:
 *         id: 1
 *         description: message test
 *         flag: 2
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MessageCreate:
 *       type: object
 *       required:
 *         - description
 *       properties:
 *         description:
 *           type: string
 *           description: La description du message
 *       example:
 *         description: message test
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     MessageUpdate:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 *           description: L'id du message
 *       example:
 *         description: 67
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Code:
 *       type: object
 *       required:
 *         - code
 *       properties:
 *         code:
 *           type: string
 *           description: Le code de retour
 *       example:
 *         description: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *       properties:
 *         error:
 *           type: string
 *           description: erreur
 *       example:
 *         error: 'Message not found'
 */


/**
 * @swagger
 * /getMessages:
 *   get:
 *     summary: Retourne la liste de tous les messages
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: La liste des aliments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       500:
 *         description: La liste des aliments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /getMessage/{id}:
 *   get:
 *     summary: Retourne le message correspondant à l'id renseigné
 *     tags: [Routes]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: number
 *        required: true
 *        description: L'id du message
 *     responses:
 *       200:
 *         description: La liste des aliments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message d'erreur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
*       500:
 *         description: Message d'erreur
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /createMessage:
 *   post:
 *     summary: Crée le message
 *     tags: [Routes]
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/MessageCreate'
 *     responses:
 *       200:
 *         description: Le message créé
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 */

/**
 * @swagger
 * /updateMessage:
 *   put:
 *     summary: met à jour le flag du message renseigné (pas utile de le tester ici car c'est rabbitmq qui l'appelle automatiquement)
 *     tags: [Routes]
 *     requestBody:
 *       required: true 
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/MessageUpdate'
 *     responses:
 *       200:
 *         code: 1 = update réussi, sinon update raté
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Code'
 */
