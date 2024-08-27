import ProductModel from "./mongodb/models/product.model.js"

export default class PRODUCTDAO{
    #ProductModel;

    constructor(){
        this.#ProductModel = ProductModel;
    }

    async findAll(paramFilters){
        const $and = [];

            if (paramFilters?.title) $and.push({ title: { $regex: paramFilters.title, $options: "i" } });
            if (paramFilters?.category) $and.push({ category: paramFilters.category });
            if (paramFilters?.availability) $and.push({ availability: convertToBoolean(paramFilters.availability) });
            const filters = $and.length > 0 ? { $and } : {};

            const sort = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions = {
                limit: paramFilters?.limit ?? 10,
                page: paramFilters?.page ?? 1,
                sort: sort[paramFilters?.sort] ?? {},
                lean: true,
            };
        return await this.#ProductModel.paginate(filters, paginationOptions);
    }

    async findOneById(id){
        return await this.#ProductModel.findOne({ _id: id }).populate("products.product");
    }

    async save(data){
        const cart = new ProductModel(data);
        return await cart.save();
    }

    async deleteOneById(id){
        return await this.#ProductModel.deleteOne({ _id: id });
    }
}