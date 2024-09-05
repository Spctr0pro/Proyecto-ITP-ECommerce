import { ERROR_NOT_FOUND_ID, ERROR_NOT_FOUND_INDEX } from "../constants/messages.constant.js";
import CartRepository from "../repositories/cart.repository.js";

export default class CartService {
    #cartRepository;

    constructor() {
        this.#cartRepository = new CartRepository();
    }
    // Obtener todas los carritos aplicando filtros
    async getAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        const carts = await this.#cartRepository.findAll(filters);
        return carts;
    }
    // Obtener un carrito por su ID
    async getOneById(id) {
        const cart = await this.#cartRepository.findOneById(id);
        if (!cart) throw new Error(ERROR_NOT_FOUND_ID);
        return cart;
    }
    // Crear un nuevo carrito
    async insertOne(data) {
        return await this.#cartRepository.save(data);
    }
    // Actualizar un carrito existente
    async updateOneById(id, data) {
        const cart = await this.#cartRepository.findOneById(id);
        const newValues = { ...cart, ...data };
        return await this.#cartRepository.save(newValues);
    }
    // Eliminar una carrito por su ID
    async deleteOneById(id) {
        const cart = await this.#cartRepository.findOneById(id);
        await await this.#cartRepository.deleteOneById(id);
        return cart;
    }

    // Agregar uno producto a un carrito o incrementa la cantidad de un producto existente
    async addOneProduct(id, productId, quantity = 0) {
        const product = await this.#cartRepository.findOneById(id);

        const productIndex = product.products.findIndex((item) => item.product.toString() === productId);

        if (productIndex >= 0) {
            product.products[productIndex].quantity += quantity;
        } else {
            product.products.push({ product: productId, quantity });
        }

        return await this.#cartRepository.save(product);
    }

    // Elimina un producto de un carrito o decrementa la cantidad de un producto existente
    async removeOneProduct(id, productId, quantity = 0) {
        const product = await this.#cartRepository.findOneById(id);
        
        const productIndex = product.products.findIndex((item) => item.product.toString() === productId);
        
        if (productIndex < 0) {
            throw new Error(ERROR_NOT_FOUND_INDEX);
        }

        if (product.products[productIndex].quantity > quantity) {
            product.products[productIndex].quantity -= quantity;
        } else {
            product.products.splice(productIndex, 1);
        }

        return await this.#cartRepository.save(product);
    }

    // Elimina todos los productos de un carrito por su ID
    async removeAllProducts(id) {
        const product = await this.#cartRepository.findOneById(id);
        product.products = [];

        return await this.#cartRepository.save(product);
    }
}