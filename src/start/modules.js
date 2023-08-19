import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/routes/index.js";
import fileUpload from "express-fileupload";
import { errorHandler } from "../api/middlewares/errorHandler.js";

export const modules = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({ origin: '*' }));
    app.use(cookieParser());
    app.use(fileUpload());
    app.use(express.static(process.cwd() + "/public"));
    app.use(routes);
    app.use(errorHandler);

};