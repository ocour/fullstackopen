const logger = require("./logger");

// Custom middleware
const requestLogger = (request, response, next) => {
    logger.info("requestLogger middlware");
    logger.info("Method:", request.method);
    logger.info("Path: ", request.path);
    logger.info("Body: ", request.body);
    logger.info("---");
    next();
};

// If request made to an route which isnt defined
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" });
};

// error handling
const errorHandler = (error, request, response, next) => {
    logger.error(error.message);

    if(error.name === "CastError")
    {
        return response.status(400).send({ error: "malformatted id" });
    }
    else if(error.name === "ValidationError")
    {
        return response.status(400).json({ error: error.message });
    }

    next(error);
};

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
};