import FactoryDAO from "../daos/factory.dao.js";
import cartDTO from "../dtos/cart.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class PetRepository {
    #cartDAO;
    #cartDTO;

    constructor() {
        const factory = new FactoryDAO(); // Uso del patrón "Factory Method"
        this.#cartDAO = factory.createPet(MONGODB); // Puede emplear las constantes MEMORY o MONGODB
        this.#cartDTO = new cartDTO();
    }

    // Obtener todas las mascotas aplicando filtros
    async findAll(filters) {
        const carts = await this.#cartDAO.findAll(filters);
        const cartsDTO = pets.map((pet) => this.#cartDTO.fromModel(pet));

        return cartsDTO;
    }

    // Obtener una mascota por su ID
    async findOneById(id) {
        const cart = await this.#cartDAO.findOneById(id);
        if (!cart) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#cartDTO.fromModel(cart);
    }

    // Crear una nueva mascota
    async save(data) {
        const cartDTO = this.#cartDTO.fromData(data);
        const cart = await this.#cartDAO.save(cartDTO);
        return this.#cartDTO.fromModel(cart);
    }

    // Eliminar una mascota por su ID
    async deleteOneById(id) {
        const cart = await this.findOneById(id);
        await this.#cartDAO.deleteOneById(id);
        return cart;
    }
}