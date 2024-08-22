import CartService from "../services/cart.services.js";

export default class CartController{
    #cartService;

    constructor(){
        this.#cartService = new CartService();
    }

    async getAll(req, res){
        try{
            const carts = await this.#cartService.findAll(req.params);
            res.sendSuccess200(carts);
        }catch(error){
            res.sendError(error);
        }
    }

    async getOneById(req, res){
        try{
            const cart = await this.#cartService.findOneById(req.params.id);
            res.sendSuccess200(cart);
        }catch(error){
            res.sendError(error);
        }
    }

    async create(req, res){
        try{
            const cart = await this.#cartService.insertOne(req.body);
            res.sendSuccess201(cart);
        }catch(error){
            res.sendError(error);
        }
    }

    async update(req, res){
        try{
            const cart = await this.#cartService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(cart);
        }catch(error){
            res.sendError(error);
        }
    }

    async delete(req, res){
        try{
            const cart = await this.#cartService.deleteOneById(req.params.id);
            res.sendSuccess200(cart);
        }catch(error){
            res.sendError(error);
        }
    }
}