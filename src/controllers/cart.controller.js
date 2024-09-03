import CartService from "../services/cart.services.js";

export default class CartController {
    #cartService;

    constructor() {
        this.#cartService = new CartService();
    }
    // Obtener todos los carritos
    async getAll(req, res) {
        try {
            const carts = await this.#cartService.getAll(req.params);
            res.sendSuccess200(carts);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Obtener un carrito por su ID
    async getOneById(req, res) {
        try {
            const cart = await this.#cartService.getOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Crear un nuevo carrito
    async create(req, res) {
        try {

            const data = JSON.stringify(req.body);
            const cart = await this.#cartService.insertOne({
                data,
                purchaser: req.id,
            });
            res.sendSuccess201(cart);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Actualizar un carrito existente
    async update(req, res) {
        try {
            const cart = await this.#cartService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Eliminar un carrito por su ID
    async delete(req, res) {
        try {
            const cart = await this.#cartService.deleteOneById(req.params.id);
            res.sendSuccess200(cart);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Agrega un producto a un carrito específico
    async addOneProduct(req, res) {
        try {

            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const cartUpdated = await this.#cartService.addOneProduct(cid, pid, quantity ?? 1);
            res.sendSuccess200(cartUpdated);
        } catch (error) {
            res.sendError(error);
        }
    }
    // Elimina un producto específico de un carrito
    async removeOneProduct(req, res) {
        try {
            const { cid, pid } = req.params;
            const productDeleted = await this.#cartService.removeOneProduct(cid, pid, 1);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }

    // Elimina todos los productos de un carrito específica
    async removeAllProducts(req, res) {
        try {
            const productDeleted = await this.#cartService.removeAllProducts(req.params.cid);
            res.sendSuccess200(productDeleted);
        } catch (error) {
            res.sendError(error);
        }
    }
}