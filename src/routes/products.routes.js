// import moment from "moment";
// import BaseRouter from "./base.router.js";
// import ProductManager from "../managers/product.manager.js"

// export default class ProductRouter extends BaseRouter {
//     #productManager;
//     constructor() {
//         super();
//         this.#productManager = new ProductManager();
//         this.initialize();
//     }
//     // Ruta para obtener todos los productos con opciones de consulta y mostrar la vista principal
//     initialize() {
//         const router = this.getRouter();

//         // Define las rutas y asocia las funciones correspondientes
//         this.addGetRoute("/:id/cart/:rid", [], (req, res) => this.#getTemplateProduct(req, res));

//         // Middleware de manejo de errores
//         // eslint-disable-next-line no-unused-vars
//         router.use((error, req, res, next) => {
//             res.sendError(error);
//         });
//     }

//     // Ruta para obtener un producto por su ID y mostrarlo en una vista
//     async #getTemplateProduct(req, res) {
//         try {
//         const { id, rid: cartId } = req.params;
//         const data = await this.#productManager.getOneById(id);
//         data.createdAt = moment(data.createdAt).format("YYYY-MM-DD HH:mm:ss");
//         data.updatedAt = moment(data.updatedAt).format("YYYY-MM-DD HH:mm:ss");
//         data.currentCartId = cartId;

//         res.status(200).render("product", { title: "Producto", data });
//     } catch (error) {
//         res.status(500).json({ status: false, ERROR_SERVER });
//     }
//     }
// }