import { ObjectId } from "bson";

export default class TicketDTO {
    fromModel(model) {
        return {
            id: model.id,
            code: model.code,
            purchase_datetime: model.createdAt,
            amount: model.amount,
            purchaser: model.purchaser,
        };
    }

    fromData(data) {
        return {
            id: data.id || null,
            code: data.code || new ObjectId().toString(),
            createdAt: data.purchaser,
            amount: data.amount,
            purchaser: data.purchaser,
        };
    }
}