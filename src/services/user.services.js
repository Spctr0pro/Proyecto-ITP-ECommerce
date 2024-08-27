import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import UserDAO from "../daos/user.dao.js"

export default class UserService{
    #UserDAO;

    constructor(){
        this.#UserDAO = new UserDAO();
    }

    async findAll(paramFilters){
        const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                lean: true,
            };
        
        const users = await this.#UserDAO.findAll(paginationOptions);
        return users;
    }

    async findOneById(id){
        const user = await this.#UserDAO.findOneById(id);
        if(!user) throw new Error(ERROR_NOT_FOUND_ID);
        return user;
    }

    async insertOne(data){
        return await this.#UserDAO.save(data);
    }

    async updateOneById(id, data){
        const user = await this.findOneById(id);
        const newValues = { ...user, ...data};
        return await this.#UserDAO.save(newValues);
    }

    async deleteOneById(id){
        const user = await this.#UserDAO.findOneById(id);
        await await this.#UserDAO.deleteOneById(id);
        return user;
    }
}