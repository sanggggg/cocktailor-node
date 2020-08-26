class HttpError extends Error {
    status: number;
    constructor(status = 500, ...params: any[]) {
        super(...params);
        if (Error.captureStackTrace) Error.captureStackTrace(this, HttpError);
        this.status = status;
    }
}

export { HttpError }