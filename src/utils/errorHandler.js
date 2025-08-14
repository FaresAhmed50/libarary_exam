



class responseError extends Error {
    constructor(statusCode, message, error) {
        super(message);
        this.error = error;
        this.statusCode = parseInt(statusCode) || 500;
        this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    }
}


export default responseError;
