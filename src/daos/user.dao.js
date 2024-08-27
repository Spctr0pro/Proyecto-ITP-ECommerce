import UserModel from "./mongodb/models/user.model.js"

export default class USERDAO{
    #UserModel;

    constructor(){
        this.#UserModel = UserModel;
    }

    async findAll(filters){
        //return await this.#UserModel.find(filters);
        return await this.#UserModel.paginate({}, filters);
    }

    async findOneById(id){
        return await this.#UserModel.findOne({ _id: id });
    }

    async save(data){
        const cart = new UserModel(data);
        return await cart.save();
    }

    async deleteOneById(id){
        return await this.#UserModel.deleteOne({ _id: id });
    }
}