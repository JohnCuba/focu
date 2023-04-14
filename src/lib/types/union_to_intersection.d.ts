/**
 * Function intersection produces - function overloads
 * https://stackoverflow.com/a/50375286
 */
type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
	? I
	: never;
