import ProductService from "../services/product.services.js";

export default class ProductController{
    #productService;

    constructor(){
        this.#productService = new ProductService();
    }

    async getAll(req, res){
        try{
            const products = await this.#productService.findAll(req.params);
            res.sendSuccess200(products);
        }catch(error){
            res.sendError(error);
        }
    }

    async getOneById(req, res){
        try{
            const product = await this.#productService.findOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async create(req, res){
        try{
            const product = await this.#productService.insertOne(req.body);
            res.sendSuccess201(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async update(req, res){
        try{
            const product = await this.#productService.updateOneById(req.params.id, req.body);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }

    async delete(req, res){
        try{
            const product = await this.#productService.deleteOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }
}