import BaseRouter from "../base.router.js";
import CartController from "../../controllers/cart.controller.js";
import TicketController from "../../controllers/ticket.controller.js";
import { USER } from "../../constants/roles.constant.js";
import { validaTicket } from "../../middlewares/ticket.middleware.js";

export default class CartRouter extends BaseRouter{
    #cartController;
    #ticketController;

    constructor(){
        super();
        this.#cartController = new CartController();
        this.#ticketController = new TicketController();
    }

    initialize(){
        const router = this.getRouter();

        this.addGetRoute("/", [], (req, res) => this.#cartController.getAll(req, res));
        this.addGetRoute("/:id", [], (req, res) => this.#cartController.getOneById(req, res));
        this.addPostRoute("/", [USER], (req, res) => this.#cartController.create(req, res));
        this.addPostRoute("/:id/purchase", [USER], validaTicket, (req, res) => this.#ticketController.create(req, res));
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