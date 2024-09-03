import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";
import { USER } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter{
    #cartController;

    constructor(){
        super();
        this.#cartController = new CartController();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:id", [], (req, res) => this.#cartController.getOneById(req, res));
        this.addPostRoute("/", [USER], (req, res) => this.#cartController.create(req, res));
        this.addPutRoute("/:id", [USER], (req, res) => this.#cartController.update(req, res));
        this.addDeleteRoute("/:id", [USER], (req, res) => this.#cartController.delete(req, res));
        this.addPutRoute("/:cid/products/:pid", [USER], (req, res) => this.#cartController.addOneProduct(req, res));
        this.addDeleteRoute("/:cid/products/:pid", [USER], (req, res) => this.#cartController.removeOneProduct(req, res)); 
        this.addDeleteRoute("/:cid/products", [USER], (req, res) => this.#cartController.removeAllProducts(req, res)); 
                
        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}