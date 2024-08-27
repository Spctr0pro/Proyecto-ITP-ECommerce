import { ObjectId } from "bson";

export default class MemoryDAO {
    static collections = {};
    #collectionName;

    constructor(collectionName) {
        this.#collectionName = collectionName;
        MemoryDAO.collections[this.#collectionName] = [];
    }

    // Obtener todos los documentos con filtros opcionales
    findAll() {
        const documents = MemoryDAO.collections[this.#collectionName];
        return documents;
    }

    // Buscar un documento por su ID
    findOneById(id) {
        const documents = this.findAll();
        const document = documents.find((item) => item.id === id);
        return document;
    }

    // Guarda los datos de un documento
    save(document) {
        const documents = this.findAll();

        if (!document.id) {
            document.id = new ObjectId().toString();
            documents.push(document);
        } else {
            const index = documents.findIndex((item) => item.id === document.id);
            documents[index] = document;
        }

        MemoryDAO.collections[this.#collectionName] = documents;
        return document;
    }

    // Eliminar un documento por su ID
    deleteOneById(id) {
        const documents = this.findAll();
        const index = documents.findIndex((item) => item.id === id);

        const document = documents[index];
        documents.splice(index, 1);

        MemoryDAO.collections[this.#collectionName] = documents;

        return document;
    }
}