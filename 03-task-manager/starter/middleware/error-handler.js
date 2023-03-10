const { CustomAPIError } = require('../errors/custom-error.js');

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err); //404 error is not being passed
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    else {
        return res.status(500).json({ mgs: err.message });
    }
}

module.exports = errorHandlerMiddleware