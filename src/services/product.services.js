import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import ProductDAO from "../daos/product.dao.js"

export default class ProductService{
    #ProductDAO;

    constructor(){
        this.#ProductDAO = new ProductDAO();
    }

    async findAll(paramFilters){
        const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                populate: "products.product",
                lean: true,
            };
        
        const products = await this.#ProductDAO.findAll(paginationOptions);
        return products;
    }

    async findOneById(id){
        const product = await this.#ProductDAO.findOneById(id);
        if(!product) throw new Error(ERROR_NOT_FOUND_ID);
        return product;
    }

    async insertOne(data){
        return await this.#ProductDAO.save(data);
    }

    async updateOneById(id, data){
        const product = await this.findOneById(id);
        const newValues = { ...product, ...data};
        return await this.#ProductDAO.save(newValues);
    }

    async deleteOneById(id){
        const product = await this.#ProductDAO.findOneById(id);
        await await this.#ProductDAO.deleteOneById(id);
        return product;
    }
}