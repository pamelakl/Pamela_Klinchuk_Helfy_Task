const Response = (isSuccess, status, data, message) => ({
    isSuccess,
    status,
    message,
    data
});

const ok = (res, data, message) => {
    return res.status(200).json(Response(true, 200, data, message));
}

const created = (res, data, message) => {
    return res.status(201).json(Response(true, 201, data, message));
}

const badRequest = (res, message) => {
    return res.status(400).json(Response(false, 400, null, message));
}

const notFound = (res, message) => {
    return res.status(404).json(Response(false, 404, null, message));
}

const error = (err, res) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json(Response(false, statusCode, null, message))

}

export {
    ok,
    created,
    badRequest,
    notFound,
    error
};