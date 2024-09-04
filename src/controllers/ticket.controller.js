import { ObjectId } from "bson";
import TicketService from "../services/ticket.services.js";
import ProductService from "../services/product.services.js";

export default class TicketController {
    #ticketService;
    #productService;

    constructor() {
        this.#ticketService = new TicketService();
        this.#productService = new ProductService();
    }
    // Obtener todos los carritos
    async getAll(req, res) {
        try {
            const carts = await this.#ticketService.getAll(req.params);
            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Obtener un ticket por su ID
    async getOneById(req, res) {
        try {
            const ticket = await this.#ticketService.getOneById(req.params.id);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Crear un nuevo ticket
    async create(req, res) {
        try {        
            const data = {
                amount: req.amount || 0,
                code: new ObjectId().toString(),
                purchaser: req.email,
            }

            const ticket = await this.#ticketService.insertOne({
                ...data
            });

            for (let index = 0; index < req.products.length; index++) {
                await this.#productService.updateOneById(req.products[index].id, req.products[index], req.products[index].filename);
            }
            res.sendSuccess201(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Actualizar un ticket existente
    async update(req, res) {
        try {
            const ticket = await this.#ticketService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Eliminar un ticket por su ID
    async delete(req, res) {
        try {
            const ticket = await this.#ticketService.deleteOneById(req.params.id);
            res.sendSuccess200(ticket);
        } catch (error) {
            res.sendError(error);
        }
    }
}