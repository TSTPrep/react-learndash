/**
 * Extracts the keys of multiple records.
 *
 * Usage: `Keys<[RecordA, RecordB, RecordC]>`
 */
type Keys<T> = T extends [infer A, ...infer R] ? keyof A | Keys<R> : never;

/**
 * Extends `T` to have at least all the keys in `Keys`.
 * Everything not already in `T` will be optional and `undefined`.
 */
type Extend<T, Keys extends string | number> = T & {
    [K in Exclude<Keys, keyof T>]?: undefined;
};

type MergeInner<T, Keys extends string | number> = T extends [infer A, ...infer R]
    ? Extend<A, Keys> | MergeInner<R, Keys>
    : never;

/**
 * Creates a union of multiple records.
 * Every record is modified to contain all the keys from all records,
 * but 'new' keys will be optional and `undefined`.
 */
export type Merge<T> = MergeInner<T, Keys<T>>;
