import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import ProductRepository from "../repositories/product.repository.js";

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
    async insertOne(data){
        return await this.#ProductRepository.save(data);
    }
    // Actualizar un producto existente
    async updateOneById(id, data){
        const currentProduct = await this.#ProductRepository.findOneById(id);
        const currentThumbnail = currentProduct.thumbnail;
        const newThumbnail = filename;

        const product = await this.#ProductRepository.save({
            ...currentProduct,
            ...data,
            thumbnail: newThumbnail ?? currentThumbnail,
        });

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