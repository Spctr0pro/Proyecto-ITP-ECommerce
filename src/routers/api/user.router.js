import BaseRouter from "../base.router.js";
import UserController from "../../controllers/user.controller.js";

export default class UserRouter extends BaseRouter{
    #userController;

    constructor(){
        super();
        this.#userController = new UserController();
    }

    initialize(){
        const router = this.getRouter();

        router.get("/", (req, res) => this.#userController.getAll(req, res));
        router.get("/:id", (req, res) => this.#userController.getOneById(req, res));
        router.post("/", (req, res) => this.#userController.create(req, res));
        router.put("/:id", (req, res) => this.#userController.update(req, res));
        router.delete("/:id", (req, res) => this.#userController.delete(req, res));

        router.use((error, req, res, next) => {
            res.sendError(error);
        })
    }
}