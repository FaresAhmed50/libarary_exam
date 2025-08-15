import Joi from "joi";

export const registerSchema = {
    body: Joi.object({
        name: Joi.string()
            .min(3)
            .max(25)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .required(),
        role: Joi.string()
            .valid('admin', 'member')
            .required()
    })
};


export const loginSchema = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        loginPassword: Joi.string()
            .required()
    })
};


export const bookSchema = {
    body: Joi.object({
        title: Joi.string()
            .max(40)
            .required(),
        author: Joi.string()
            .max(200),
        availableCopies: Joi.number()
            .min(0)
            .max(200),
        publishedYear: Joi.number()
            .min(0)
            .max(2025),
    })
}


export const borrowSchema = {
    body: Joi.object({
        bookId: Joi.string()
            .required(),
        userId: Joi.string()
            .required(),
    })
}





































