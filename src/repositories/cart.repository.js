import FactoryDAO from "../daos/factory.dao.js";
import cartDTO from "../dtos/cart.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetRepository {
    #cartDAO;
    #cartDTO;

    constructor() {
        const factory = new FactoryDAO(); // Uso del patrón "Factory Method"
        this.#cartDAO = factory.createCart(MONGODB); // Puede emplear las constantes MEMORY o MONGODB
        this.#cartDTO = new cartDTO();
    }

    // Obtener todos los carritos aplicando filtros
    async findAll(params) {
        params.populate = "products.product";

        const carts = await this.#cartDAO.findAll({}, params);
        const cartsDTO = carts?.docs?.map((cart) => this.#cartDTO.fromModel(cart));
        carts.docs = cartsDTO;
        return cartsDTO;
    }

    // Obtener un carrito por su ID
    async findOneById(id) {
        const cart = await this.#cartDAO.findOneById(id);
        if (!cart) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#cartDTO.fromModel(cart);
    }

    // Crear un nuevo carrito
    async save(data) {
        const cartDTO = this.#cartDTO.fromData(data);
        const cart = await this.#cartDAO.save(cartDTO);
        return this.#cartDTO.fromModel(cart);
    }

    // Eliminar un carrito por su ID
    async deleteOneById(id) {
        const cart = await this.findOneById(id);
        await this.#cartDAO.deleteOneById(id);
        return cart;
    }
}