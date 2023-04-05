'use client';
import { useState, useEffect, useMemo } from 'react';
const genericToken = '/logos/generic_token.svg';

export const useImage = (
	src: string = genericToken,
	fallbackSrc: string = genericToken
) => {
	const [hasLoaded, setHasLoaded] = useState(false);
	const [hasError, setHasError] = useState(false);

	const source = useMemo(
		() => (src && !hasError ? src : fallbackSrc),
		[fallbackSrc, hasError, src]
	);

	useEffect(() => {
		setHasLoaded(false);
		setHasError(false);

		const image = new Image();
		image.src = src;

		const handleError = () => {
			setHasError(true);
			setHasLoaded(true);
		};

		const handleLoad = () => {
			setHasLoaded(true);
			setHasError(false);
		};

		image.addEventListener('error', handleError);
		image.addEventListener('load', handleLoad);

		return () => {
			image.removeEventListener('error', handleError);
			image.removeEventListener('load', handleLoad);
		};
	}, [src]);

	return { hasLoaded, hasError, source };
};
