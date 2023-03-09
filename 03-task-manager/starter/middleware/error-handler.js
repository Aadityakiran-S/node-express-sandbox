const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err); //404 error is not being passed
    return res.status(err.status).json({ mgs: err.message });
}

module.exports = errorHandlerMiddleware