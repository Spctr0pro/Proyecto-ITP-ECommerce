import BaseRouter from "./base.router.js";

export default class LoginViewRouter extends BaseRouter {
    constructor() {
        super();
        this.initialize();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addGetRoute("/login", [],  (req, res) => this.#getTemplateLogin(req, res));

        // Middleware de manejo de errores
        // eslint-disable-next-line no-unused-vars
        router.use((error, req, res, next) => {
            res.sendError(error);
        });
    }

    // Ruta para visualizar el login
    #getTemplateLogin(req, res) {
        res.status(200).render("login", { title: "Inicio de Sesión" });
    }
}