import BaseRouter from "../base.router.js";
import CartManager from "../../managers/cart.manager.js";
import { USER, USER_PREMIUM, ADMIN, AUTHENTICATED } from "../../constants/roles.constant.js";

export default class CartRouter extends BaseRouter {
    #cartManager;

    constructor() {
        super();
        this.#cartManager = new CartManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [USER], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [USER], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [USER], (req, res) => this.#update(req, res));
        this.addPutRoute("/:cid/products/:pid", [USER], (req, res) => this.#updateCart(req, res));
        this.addDeleteRoute("/:id", [USER], (req, res) => this.#delete(req, res));
        this.addDeleteRoute("/:cid/products/:pid", [USER], (req, res) => this.#deleteProduct(req, res));
        this.addDeleteRoute("/:cid/products", [USER], (req, res) => this.#deleteAllProductCart(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Ruta para obtener todos los carritos con la posibilidad de filtrar mediante query params
    async #getAll(req, res) {
        try {
            const cartsFound = await this.#cartManager.getAll(req.query);
            res.sendSuccess200(cartsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para obtener un carrito específico por su ID
    async #getById(req, res) {
        try {
            const cartFound = await this.#cartManager.getOneById(req.params.id);
            res.sendSuccess200(cartFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para crear un nuevo carrito
    async #create(req, res) {
        try {
            const cartCreated = await this.#cartManager.insertOne(req.body);
            res.sendSuccess201(cartCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para actualizar un carrito existente por su ID
    async #update(req, res) {
        try {
            const cartUpdated = await this.#cartManager.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para eliminar un carrito por su ID
    async #delete(req, res) {
        try {
            const cartDeleted = await this.#cartManager.deleteOneById(req.params.id);
            res.sendSuccess200(cartDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para incrementar en una unidad o crear un producto específico en un carrito por su ID
    async #updateCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const updateCart = await this.#cartManager.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(updateCart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para decrementar en una unidad o eliminar un producto específico en un carrito por su ID
    async #deleteProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const productDeleted = await this.#cartManager.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para eliminar todos los productos de un carrito específico
    async #deleteAllProductCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const productDeleted = await this.#cartManager.removeAllProducts(req.params.cid);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}