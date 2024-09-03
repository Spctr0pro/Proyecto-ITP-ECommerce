import ProductService from "../services/product.services.js";

export default class ProductController{
    #productService;

    constructor(){
        this.#productService = new ProductService();
    }
    // Obtener todos los productos
    async getAll(req, res){
        try{
            const products = await this.#productService.getAll(req.params);
            res.sendSuccess200(products);
        }catch(error){
            res.sendError(error);
        }
    }
    // Obtener un producto por su ID
    async getOneById(req, res){
        try{
            const product = await this.#productService.getOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }
    // Crear un nuevo producto
    async create(req, res){
        try{
            const { file } = req;
            
            const product = await this.#productService.insertOne(req.body, file?.filename);
            res.sendSuccess201(product);
        }catch(error){
            res.sendError(error);
        }
    }
    // Actualizar un producto existente
    async update(req, res){
        try{
            const { file } = req;
            const product = await this.#productService.updateOneById(req.params.id, req.body, file?.filename);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }
    // Eliminar un producto por su ID
    async delete(req, res){
        try{
            const product = await this.#productService.deleteOneById(req.params.id);
            res.sendSuccess200(product);
        }catch(error){
            res.sendError(error);
        }
    }
}