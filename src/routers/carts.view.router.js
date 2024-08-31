import moment from "moment";
import BaseRouter from "./base.router.js";
import CartService from "../services/cart.services.js";
import { ERROR_SERVER } from "../constants/messages.constant.js";

export default class CartViewRouter extends BaseRouter {
    cartService
;
    constructor() {
        super();
        this.cartService = new CartService();
        this.initialize();
    }
    // Ruta para obtener todos los productos con opciones de consulta y mostrar la vista principal
    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/:id", [], (req, res) => this.#getTemplateCart(req, res));

        // Middleware de manejo de errores
        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    // Ruta para obtener un producto por su ID y mostrarlo en una vista
    async #getTemplateCart(req, res) {
        try {
            const data = await this.cartService.getOneById(req.params.id);

            // Formatea las fechas de creación y actualización del carrito
            data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
            data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");

            res.status(200).render("cart", { title: "Carrito", data });
        } catch (error) {
            console.log(error.message);
            
            res.status(500).json({ status: false, ERROR_SERVER });
        }
    }
}