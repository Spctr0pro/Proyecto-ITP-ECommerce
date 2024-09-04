import BaseRouter from "../base.router.js";
import { USER } from "../../constants/roles.constant.js";

export default class TicketRouter extends BaseRouter {
    constructor() {
        super();
    }

    initialize() {
        const router = this.getRouter();

        // Define las rutas y asocia las funciones correspondientes
        this.addPostRoute("/login", [], (req, res) => this.#faltaInsert(req, res));
        this.addGetRoute("/current", [USER], (req, res) => this.#faltaSelect(req, res));

        // Middleware para manejar errores
        // eslint-disable-next-line no-unused-vars
        router.use((err, req, res, next) => {
            res.sendError(err);
        });
    }

    // Maneja la solicitud POST para generar un token
    #faltaInsert(req, res) {
        try {
            // Intenta obtener el token de la solicitud.
            // Primero, verifica si existe en req.token.
            // Si no está allí, busca en las cookies con req.cookies["token"].
            // Si tampoco está en las cookies, establece valor en null.
            const token = req.token ?? req.cookies["token"] ?? null;
            res.sendSuccess201(token);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Maneja la solicitud GET para obtener el usuario autenticado
    #faltaSelect(req, res) {
        try {
            const currentUser = {
                id: req.id,
                roles: req.roles,
                email: req.email,
            };

            res.sendSuccess200(currentUser);
        } catch (error) {
            res.sendError(error);
        }
    }
}