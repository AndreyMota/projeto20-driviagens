import httpStatus from "http-status";

export default function errorHandler(error, req, res, next) {
    console.log(error);
    if (error.type === "conflict") {
        return res.status(httpStatus.CONFLICT).send(error.message);
    }
    if (error.type === "notFound") {
        return res.status(httpStatus.NOT_FOUND).send(error.message);
    }
    if (error.type === "unprocessableEnity") {
        return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Algo de errado não está certo :(");
}