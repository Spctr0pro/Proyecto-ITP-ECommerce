import BaseRouter from "../base.router.js";
import ProductController from "../../controllers/product.controller.js";
import { ADMIN, USER } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class ProductRouter extends BaseRouter{
    #productController;

    constructor(){
        super();
        this.#productController = new ProductController();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [USER],  (req, res) => this.#productController.getAll(req, res));
        this.addGetRoute("/:id", [USER],  (req, res) => this.#productController.getOneById(req, res));
        this.addPostRoute("/", [ADMIN], uploader.single("file"), (req, res) => this.#productController.create(req, res));
        this.addPutRoute("/:id", [ADMIN], uploader.single("file"), (req, res) => this.#productController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN],  (req, res) => this.#productController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}