import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerClient from './SwaggerClient';

const getApiDocs = async () => {
	const spec: Record<string, any> = createSwaggerSpec({
		apiFolder: '/app/api',
		definition: {
			openapi: '3.0.0',
			info: {
				title: 'Next Swagger API',
				version: '1.0',
			},
		},
	});
	return spec;
};

export default async function Home() {
	const spec = await getApiDocs();
	return <SwaggerClient spec={spec} />;
}
