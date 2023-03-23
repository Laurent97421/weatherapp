import express from "express"
import { Request, Response } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { ValidationError } from "yup";

const Yup = require("yup")

const formSchema = Yup.object({
    email: Yup.string()
        .required("Addresse mail requise")
        .email("Entrez une addresse mail valide"),
    password: Yup.string()
        .required("Mot de passe requis !")
        .min(6, "Mot de passe trop court !")
        .max(30, "Mot de passe trop long"),
})

const validateForm = (req: Request<{}, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>, number>) => {

    const formData = req.body;
    formSchema.validate(formData).catch((err: ValidationError) => {
        res.status(422).send();
        console.log(err.errors);
    }).then((valid: boolean) => {
        if (valid) {
            console.log("Form is valid")
        };
    });
}

export default validateForm;