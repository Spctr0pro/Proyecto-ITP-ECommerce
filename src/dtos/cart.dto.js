export default class CartDTO {
    fromModel(model) {
        return {
            id: model.id,
            products: model.products,
            purchaser: model.purchaser,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            products: data.products,
            purchaser: data.purchaser,
        };
    }
}