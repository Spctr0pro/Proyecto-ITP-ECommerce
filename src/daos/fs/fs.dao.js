import fs from "fs";
import path from "path";
import paths from "../../utils/paths.js";
import { ObjectId } from "bson";

export default class FsDAO {
    #filepath;

    constructor(filename) {
        this.#filepath = path.join(paths.files, filename);
    }

    // Obtener todos los documentos con filtros opcionales
    async findAll() {
        try {
            const documentsJSON = await fs.promises.readFile(this.#filepath, "utf8");
            const documents = JSON.parse(documentsJSON);
            return documents;
        } catch (error) {
            throw new Error("Error al leer el archivo");
        }
    }

    // Buscar un documento por su ID
    async findOneById(id) {
        const documents = await this.findAll();
        const document = documents.find((item) => item.id === id);
        return document;
    }

    // Guarda los datos de un documento
    async save(document) {
        const documents = await this.findAll();

        if (!document.id) {
            document.id = new ObjectId().toString();
            documents.push(document);
        } else {
            const index = documents.findIndex((item) => item.id === document.id);
            documents[index] = document;
        }

        try {
            await fs.promises.writeFile(this.#filepath, JSON.stringify(documents, null, "\t"), "utf8");
        } catch (error) {
            throw new Error("Error al escribir el archivo");
        }

        return document;
    }

    // Eliminar un documento por su ID
    async deleteOneById(id) {
        const documents = await this.findAll();
        const index = documents.findIndex((item) => item.id === id);

        const document = documents[index];
        documents.splice(index, 1);

        try {
            await fs.promises.writeFile(this.#filepath, JSON.stringify(documents, null, "\t"), "utf8");
        } catch (error) {
            throw new Error("Error al escribir el archivo");
        }

        return document;
    }
}