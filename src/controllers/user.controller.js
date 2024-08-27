import UserService from "../services/user.services.js";

export default class UserController{
    #userService;

    constructor(){
        this.#userService = new UserService();
    }

    async getAll(req, res){
        try{
            const products = await this.#userService.findAll(req.params);
            res.sendSuccess200(products);
        }catch(error){
            res.sendError(error);
        }
    }

    async getOneById(req, res){
        try{
            const product = await this.#userService.findOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async create(req, res){
        try{
            const product = await this.#userService.insertOne(req.body);
            res.sendSuccess201(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async update(req, res){
        try{
            const product = await this.#userService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async delete(req, res){
        try{
            const product = await this.#userService.deleteOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }
}