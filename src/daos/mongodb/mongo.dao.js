// Conexión con la Base de Datos
import { connectDB } from "../../config/mongoose.config.js";

export default class MongoDAO {
    static #connectionDB = false;
    #model;

    constructor(model) {
        this.#model = model;

        if (!MongoDAO.#connectionDB) {
            connectDB();
            MongoDAO.#connectionDB = true;
        }
    }

    // Obtener todos los documentos con filtros opcionales
    async findAll(filters) {
        return await this.#model.find(filters);
    }

    // Buscar un documento por su ID
    async findOneById(id) {
        return await this.#model.findOne({ _id: id });
    }

    // Guarda los datos de un documento
    async save(data) {
        const pet = new this.#model(data);
        return await pet.save();
    }

    // Eliminar un documento por su ID
    async deleteOneById(id) {
        return await this.#model.deleteOne({ _id: id });
    }
}