export interface RequestOptions {
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: any;
    auth?: boolean;
}