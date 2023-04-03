import { deploy } from '@/lib/scripts/deploy';
import { NextResponse } from 'next/server';

/**
 * @swagger
 * /api/deploy:
 *    get:
 *      description: Deploy a contract and return its details
 *      operationId: getDeploy
 *      parameters:
 *        - in: body
 *          name: request
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Request'
 *      responses:
 *        '200':
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Response'
 *        '500':
 *          description: Invalid request
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/ErrorResponse'
 * components:
 *  schemas:
 *    Request:
 *      type: object
 *      properties:
 *        signer:
 *          type: string
 *          description: The signer identifier.
 *          example: '0x1234...'
 *        provider:
 *          type: string
 *          description: The provider identifier.
 *          example: 'ethers.providers(...)'
 *      required:
 *        - signer
 *        - provider
 *    Response:
 *      type: object
 *      properties:
 *        initCode:
 *          type: string
 *          description: The initialization code of the deployed contract.
 *          example: '0x1234...'
 *        counterfactualAddress:
 *          type: string
 *          description: The counterfactual address of the deployed contract.
 *          example: '0x5678...'
 *    ErrorResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Error, no body
 *
 */
export async function GET(request: Request) {
	const body = await request.json();
	if (!body) return new Response('Error, no body', { status: 500 });
	const data = await deploy(body.signer, body.provider);

	console.log(data);
	return NextResponse.json(data, { status: 200 });
}
/**
 *       owner:
 *          type: object
 *          description: The owner of the deployed contract.
 *          properties:
 *            address:
 *              type: string
 *              description: The address of the owner's wallet.
 *              example: '0x9abc...'
 *            privateKey:
 *              type: string
 *              description: The private key of the owner's wallet.
 *              example: '0xdef0...'
 */
