export const throwError = (msg, statusCode) => {
    const err = new Error();
    err.error = msg;
    err.statusCode = statusCode;
    return err;
}
