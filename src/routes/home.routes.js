// import BaseRouter from "./base.router.js";
// import ProductManager from "../managers/product.manager.js";
// import { USER, USER_PREMIUM, ADMIN, AUTHENTICATED } from "../constants/roles.constant.js";

// const currentCartId = "66afb410c37231583bdbf367"; // Aquí coloca el ID del carrito creado en tu BD
// export default class HomeRouter extends BaseRouter {
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
//         this.addGetRoute("/", [], (req, res) => this.#getTemplateHome(req, res));
//         this.addGetRoute("/real-time-products", [], (req, res) => this.#getTemplateHomeRealTime(req, res));
//         // Middleware de manejo de errores
//         // eslint-disable-next-line no-unused-vars
//         router.use((error, req, res, next) => {
//             res.sendError(error);
//         });
//     }

//     // Maneja la solicitud GET para la página de inicio
//     async #getTemplateHome(req, res) {
//         try {
//             const data = await this.#productManager.getAll(req.query);

//             // Si se pasa un parámetro de ordenamiento, agrega a los datos para su uso en la vista
//             data.sort = req.query?.sort ? `&sort=${req.query.sort}` : "";

//             // Asigna el ID del carrito actual a los datos de respuesta
//             data.currentCartId = currentCartId;

//             // Añade el ID del carrito actual a cada producto en la lista de productos
//             data.docs = data.docs.map((doc) => {
//                 return { ...doc, currentCartId };
//             });

//             res.status(200).render("index", { title: "Inicio", data });
//         } catch (error) {
//             res.status(500).json({ status: false, ERROR_SERVER });
//         }
//     }

//     // Ruta para renderizar la vista de productos en tiempo real
//     #getTemplateHomeRealTime(req, res) {
//         try {
//             res.status(200).render("realTimeProducts", { title: "Tiempo Real" });
//         } catch (error) {
//             res.status(500).json({ status: false, ERROR_SERVER });
//         }
//     }
// }