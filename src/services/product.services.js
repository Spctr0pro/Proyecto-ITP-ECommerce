import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import ProductRepository from "../repositories/product.repository.js";
import { convertToBoolean } from "../utils/converter.js";
import { deleteFile } from "../utils/fileSystem.js";
import paths from "../utils/paths.js";

export default class ProductService{
    #ProductRepository;

    constructor(){
        this.#ProductRepository = new ProductRepository();
    }
    // Obtener todos los productos aplicando filtros
    async getAll(params){
        return await this.#ProductRepository.findAll(params);
    }
    // Obtener un producto por su ID
    async getOneById(id){
        const product = await this.#ProductRepository.findOneById(id);
        if(!product) throw new Error(ERROR_NOT_FOUND_ID);
        return product;
    }
    // Crear un nuevo producto
    async insertOne(data, filename){
        const newThumbnail = filename;

        const product = {
            ...data,
            thumbnail: newThumbnail ?? "",
        };

        return await this.#ProductRepository.save(product);
    }
    // Actualizar un producto existente
    async updateOneById(id, data, filename){
        const currentProduct = await this.#ProductRepository.findOneById(id);
        const currentThumbnail = currentProduct.thumbnail;
        const newThumbnail = filename;

        const newValues = {
                ...currentProduct,
                ...data,
                status: convertToBoolean(data.status),
                availability: convertToBoolean(data.availability),
                thumbnail: newThumbnail ?? currentThumbnail,
        };
        
        const product = await this.#ProductRepository.save(newValues);

        if (filename && newThumbnail !== currentThumbnail) {
            await deleteFile(paths.images, currentThumbnail);
        }

        return product;
    }
    // Eliminar un producto por su ID
    async deleteOneById(id){
        const product = await this.#ProductRepository.findOneById(id);
        await await this.#ProductRepository.deleteOneById(id);
        return product;
    }
}