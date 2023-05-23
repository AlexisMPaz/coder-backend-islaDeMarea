import { EErrors } from "../../utils/customErrors/enums.js";


export default (error, req, res, next) => {

    if (!error.code) {
        error.code = 99
    }

    switch (error.code) {
        case EErrors.INVALID_TYPES_ERROR:
            res.status(400)
                .json({ status: "error", error: error.name, message: error.message, cause: error.cause })
            break;

        case EErrors.DATABASE_ERROR:
            res.status(400)
                .json({ status: "error", error: error.name, message: error.message, cause: error.cause })
            break;

        case EErrors.ROUTING_ERROR:
            res.status(400)
                .json({ status: "error", error: error.name, message: error.message, cause: error.cause })
            break;

        case EErrors.MISSING_FIELDS_ERROR:
            res.status(400)
                .json({ status: "error", error: error.name, message: error.message, cause: error.cause })
            break;

        default:
            req.logger.fatal(error.message)
            res.status(500)
                .json({ status: "error", error: "Error en el servidor", message: error.message })
    }
}