import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";

export default class CartRouter extends BaseRouter{
    #cartController;

    constructor(){
        super();
        this.#cartController = new CartController();
    }

    initialize(){
        const router = this.getRouter();

        router.get("/", (req, res) => this.#cartController.getAll(req, res));
        router.get("/:id", (req, res) => this.#cartController.getOneById(req, res));
        router.post("/", (req, res) => this.#cartController.create(req, res));
        router.put("/:id", (req, res) => this.#cartController.update(req, res));
        router.delete("/:id", (req, res) => this.#cartController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}