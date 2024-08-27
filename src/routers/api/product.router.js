import BaseRouter from "../base.router.js";
import ProductController from "../../controllers/product.controller.js";

export default class ProductRouter extends BaseRouter{
    #productController;

    constructor(){
        super();
        this.#productController = new ProductController();
    }

    initialize(){
        const router = this.getRouter();

        router.get("/", (req, res) => this.#productController.getAll(req, res));
        router.get("/:id", (req, res) => this.#productController.getOneById(req, res));
        router.post("/", (req, res) => this.#productController.create(req, res));
        router.put("/:id", (req, res) => this.#productController.update(req, res));
        router.delete("/:id", (req, res) => this.#productController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}