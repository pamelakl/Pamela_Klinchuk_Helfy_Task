import { badRequest } from "./response.middleware.js";

const taskSchema = {
    title: (val) => typeof val === 'string' && val.trim().length >= 1,
    description: (val) => typeof val === 'string' && val.trim().length >= 1,
    priority: (val) => val === 'low' || val === 'medium' || val === 'high'
};

export const validateSchema = (req, res, next) => {
    const data = req.body;

    for (const key in taskSchema) {
        const isValid = taskSchema[key](data[key]);
        if (!isValid) {
            return badRequest(res, `${key} not valid`);
        }
    }
    next();
};