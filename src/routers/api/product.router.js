import BaseRouter from "../base.router.js";
import ProductController from "../../controllers/product.controller.js";
import { ADMIN, STANDARD } from "../../constants/roles.constant.js";
import uploader from "../../utils/uploader.js";

export default class ProductRouter extends BaseRouter{
    #productController;

    constructor(){
        super();
        this.#productController = new ProductController();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [STANDARD],  (req, res) => this.#productController.getAll(req, res));
        this.addGetRoute("/:id", [STANDARD],  (req, res) => this.#productController.getOneById(req, res));
        this.addPostRoute("/", [STANDARD], uploader.single("file"), (req, res) => this.#productController.create(req, res));
        this.addPutRoute("/:id", [STANDARD], uploader.single("file"), (req, res) => this.#productController.update(req, res));
        this.addDeleteRoute("/:id", [ADMIN],  (req, res) => this.#productController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}