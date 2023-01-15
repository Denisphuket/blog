declare module '*.scss' {
	interface IClassNames {
		[className: string]: string
	}
	const classNames: IClassNames;
	export = classNames;
}
declare module '*.svg' {
	import React from 'react';

	const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
	export default SVG;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare const __IS_DEV__: boolean;

declare module 'crypto-browserify' {
	export function publicEncrypt(options: any, buffer: Uint8Array): any;
	export function privateDecrypt(options: any, buffer: Uint8Array): any;
	export function randomBytes(size: number): any;
}

declare function btoa(data: string): string;
