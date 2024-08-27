// import moment from "moment";
// import CartManager from "../managers/cart.manager.js";
// import BaseRouter from "./base.router.js";

// export default class CartRouter extends BaseRouter {
//     #cartManager;
//     constructor() {
//         super();
//         this.#cartManager = new CartManager();
//         this.initialize();
//     }
//     // Ruta para obtener todos los productos con opciones de consulta y mostrar la vista principal
//     initialize() {
//         const router = this.getRouter();

//         // Define las rutas y asocia las funciones correspondientes
//         this.addGetRoute("/:id", [], (req, res) => this.#getTemplateCart(req, res));

//         // Middleware de manejo de errores
//         // eslint-disable-next-line no-unused-vars
//         router.use((error, req, res, next) => {
//             res.sendError(error);
//         });
//     }

//     // Ruta para obtener un producto por su ID y mostrarlo en una vista
//     async #getTemplateCart(req, res) {
//         try {
//             const data = await this.#cartManager.getOneById(req.params.id);

//             // Formatea las fechas de creación y actualización del carrito
//             data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
//             data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");

//             res.status(200).render("cart", { title: "Carrito", data });
//         } catch (error) {
//             res.status(500).json({ status: false, ERROR_SERVER });
//         }
//     }
// }