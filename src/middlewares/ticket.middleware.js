import CartService from "../services/cart.services.js";
import ProductService from "../services/product.services.js";

const cartService = new CartService();
const productService = new ProductService();

// Middleware para generar un token de acceso para un usuario autenticado
export const validaTicket = async (req, res, next) => {
    try {
        // Busca el carriro por id
        const cartFound = await cartService.getOneById(req.params.id);
        let productFound;
        let amount = 0;
        let productsOutStock = [];
        let productsWithAvailableStock = [];
        req.products = [];
        req.productsWithoutStock = [];
        for (var i = 0; i < cartFound.products.length; i++) {
            productFound = await productService.getOneById(cartFound.products[i].product);
            amount += cartFound.products[i].quantity * productFound.price;
            if (productFound.stock < cartFound.products[i].quantity) {
                productsOutStock.push(productFound.id);
            }else{
                productFound.stock -= cartFound.products[i].quantity;
                productFound.availability = !productFound.stock == 0;
                productsWithAvailableStock.push(productFound);
            }
        }

        if (productsOutStock.length > 0) {
            throw new Error(`El o los siguientes producto(s) superan la cantidad de stock disponible (${productsOutStock.toString()})`);
        }

        // Coloca el amount en el request
        req.amount = amount;
        req.products = productsWithAvailableStock;

        // Llama al siguiente middleware
        next();
    } catch (error) {
        next(error);
    }
};
