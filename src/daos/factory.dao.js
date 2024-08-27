import FsDAO from "./fs/fs.dao.js";
import MemoryDAO from "./memory/memory.dao.js";
import MongoDAO from "./mongodb/mongo.dao.js";
import Pet from "./mongodb/models/pet.model.js";
import { FILE_SYSTEM_CART, FILE_SYSTEM_PRODUCT, MEMORY, MONGODB } from "../constants/dao.constant.js";

export default class FactoryDAO {
    createPet(className) {
        switch (className) {
        case FILE_SYSTEM_CART:
            return new FsDAO("cart.json");
        case FILE_SYSTEM_PRODUCT:
            return new FsDAO("product.json");
        case MEMORY:
            return new MemoryDAO();
        case MONGODB:
            return new MongoDAO(Pet);
        }
    }
}