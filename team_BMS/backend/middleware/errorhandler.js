
const errorHandler = (err, req, res, next) => {
    // log the error to console
    // console.error(err);

    // set a default error status code and message
    let statusCode = 400;
    let message = 'Input required';

    // check if the error has a specific status code and message
    if (err.statusCode) {
        statusCode = err.statusCode;
        message = err.message;

    }

    // send the error response to the client
    res.status(statusCode).json({
        error: message
    });
    next()
};

module.exports = errorHandler;
