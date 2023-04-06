'use client';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { useImage } from './useImage';

type ImgAttributes = DetailedHTMLProps<
	ImgHTMLAttributes<HTMLImageElement>,
	HTMLImageElement
>;

interface ImageProps extends ImgAttributes {
	src?: string;
	alt: string;
	lazy?: boolean;
	fallbackSrc?: string;
}

export const Image = ({
	src,
	alt,
	lazy = true,
	fallbackSrc,
	...props
}: ImageProps) => {
	const { hasLoaded, source } = useImage(src, fallbackSrc);

	return hasLoaded ? (
		<img {...props} src={source} alt={alt} loading={lazy ? 'lazy' : 'eager'} />
	) : (
		<div
			className={`bg-silver bg-opacity-30 animate-pulse rounded-[10px] ${props.className}`}
		/>
	);
};
