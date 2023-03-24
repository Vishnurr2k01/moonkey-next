/**
 * @swagger
 * /api/hello:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export async function GET(request: Request) {
	return new Response('Hello, Next.js!');
}
