
import BaseRouter from "../base.router.js";
import productManager from "../../daos/product.dao.js";
import { USER, USER_PREMIUM, ADMIN, AUTHENTICATED} from "../../constants/roles.constant.js";

export default class ProductRouter extends BaseRouter {
    #productManager;

    constructor() {
        super();
        this.#productManager = new productManager();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/", [], (req, res) => this.#getAll(req, res));
        this.addGetRoute("/:id", [], (req, res) => this.#getById(req, res));
        this.addPostRoute("/", [USER], (req, res) => this.#create(req, res));
        this.addPutRoute("/:id", [USER], (req, res) => this.#update(req, res));
        this.addDeleteRoute("/:id", [USER], (req, res) => this.#delete(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Ruta para obtener todos los productos con la posibilidad de filtrar mediante query params
    async #getAll(req, res) {
        try {
            const productsFound = await this.#productManager.getAll(req.query);
            res.sendSuccess200(productsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para obtener un producto por su ID
    async #getById(req, res) {
        try {
            const productsFound = await this.#productManager.getOneById(req.params.id);
            res.sendSuccess200(productsFound);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para crear un nuevo producto, permite la subida de archivos
    async #create(req, res) {
        try {
            const { file } = req;
            const productCreated = await this.#productManager.insertOne(req.body, file?.filename);
            res.sendSuccess201(productCreated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para actualizar un producto por su ID, permite la subida de archivos
    async #update(req, res) {
        try {
            const { file } = req;
            const productUpdated = await this.#productManager.updateOneById(req.params.id, req.body, file?.filename);
            res.sendSuccess200(productUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Ruta para eliminar un producto por su ID
    async #delete(req, res) {
        try {
            const productDeleted = await this.#productManager.deleteOneById(req.params.id);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}