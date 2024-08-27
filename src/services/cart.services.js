import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import CartDAO from "../daos/cart.dao.js"

export default class CartService{
    #CartDAO;

    constructor(){
        this.#CartDAO = new CartDAO();
    }

    async findAll(paramFilters){
        const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                populate: "products.product",
                lean: true,
            };
        
        const carts = await this.#CartDAO.findAll(paginationOptions);
        return carts;
    }

    async findOneById(id){
        const cart = await this.#CartDAO.findOneById(id);
        if(!cart) throw new Error(ERROR_NOT_FOUND_ID);
        return cart;
    }

    async insertOne(data){
        return await this.#CartDAO.save(data);
    }

    async updateOneById(id, data){
        const cart = await this.findOneById(id);
        const newValues = { ...cart, ...data};
        return await this.#CartDAO.save(newValues);
    }

    async deleteOneById(id){
        const cart = await this.#CartDAO.findOneById(id);
        await await this.#CartDAO.deleteOneById(id);
        return cart;
    }
}