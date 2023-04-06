import { ethers } from 'ethers';
import { arrayify } from 'ethers/lib/utils';
import { NextResponse } from 'next/server';

/**
 *
 * /api/paymaster:
 *    post:
 *      description: Get paymaster signature
 *      operationId: getPaymaster
 *      parameters:
 *        - in: body
 *          name: request
 *          required: true
 *          schema:
 *            $ref: '#/components/schemas/Request'
 *      responses:
 *        '201':
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
 *        hash:
 *          type: string
 *          description: The hash to be signed by paymaster.
 *          example: 'Array[]'
 *        provider:
 *          type: string
 *          description: The provider identifier.
 *          example: 'ethers.providers.JsonRpcProvider'
 *      required:
 *        - hash
 *        - provider
 *    Response:
 *      type: object
 *      properties:
 *        sig:
 *          type: string
 *          description: The paymaster signature.
 *          example: '0x1234...' *
 *    ErrorResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Error, no body
 *
 */
export async function POST(request: Request) {
	const body = await request.json();
	if (!body) return new Response('Error, no body', { status: 500 });
	const offchainSigner = new ethers.Wallet(
		process.env.PAYMASTER_OWNER_PRIVATE_KEY!,
		body.provider
	);

	// Sign OffChain to verify as paymaster
	const sig = await offchainSigner.signMessage(arrayify(body.hash));

	console.log(sig);
	return NextResponse.json(sig, { status: 201 });
}
