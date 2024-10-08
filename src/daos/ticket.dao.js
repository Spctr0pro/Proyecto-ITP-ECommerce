import TicketModel from "./mongodb/models/ticket.model.js"

export default class TICKETDAO{
    #TicketModel;

    constructor(){
        this.#TicketModel = TicketModel;
    }

    async findAll(filters){
        //return await this.#TicketModel.find(filters);
        return await this.#TicketModel.paginate({}, filters);
    }

    async findOneById(id){
        return await this.#TicketModel.findOne({ _id: id }).populate("purshase.product");
    }

    async save(data){
        const ticket = new TicketModel(data);
        return await this.#TicketModel.save(data);
    }

    async deleteOneById(id){
        return await this.#TicketModel.deleteOne({ _id: id });
    }
}