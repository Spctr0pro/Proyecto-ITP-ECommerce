import CartModel from "../models/cart.model.js"

export default class CARTDAO{
    #CartModel;

    constructor(){
        this.#CartModel = CartModel;
    }

    async findAll(filters){
        //return await this.#CartModel.find(filters);
        return await this.#CartModel.paginate({}, filters);
    }

    async findOneById(id){
        return await this.#CartModel.findOne({ _id: id }).populate("products.product");
    }

    async save(data){
        const cart = new CartModel(data);
        return await cart.save();
    }

    async deleteOneById(id){
        return await this.#CartModel.deleteOne({ _id: id });
    }
}