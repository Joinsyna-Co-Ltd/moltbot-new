import type { KeyMapper } from '../../types/object';
export declare function groupBy<T>(arr: T[], keyFn: Extract<keyof T, string> | KeyMapper<T>): Record<string, T[]>;
