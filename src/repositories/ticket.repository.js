import FactoryDAO from "../daos/factory.dao.js";
import ticketDTO from "../dtos/ticket.dto.js";
import { MONGODB } from "../constants/dao.constant.js";
import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";

export default class TicketRepository {
    #ticketDAO;
    #ticketDTO;

    constructor() {
        const factory = new FactoryDAO(); // Uso del patrón "Factory Method"
        this.#ticketDAO = factory.createTicket(MONGODB); // Puede emplear las constantes MEMORY o MONGODB
        this.#ticketDTO = new ticketDTO();
    }

    // Obtener todos los tickets aplicando filtros
    async findAll(params) {
        const tickets = await this.#ticketDAO.findAll({}, params);
        const ticketsDTO = tickets?.docs?.map((ticket) => this.#ticketDTO.fromModel(ticket));
        tickets.docs = ticketsDTO;
        return ticketsDTO;
    }

    // Obtener un ticket por su ID
    async findOneById(id) {
        const ticket = await this.#ticketDAO.findOneById(id);
        if (!ticket) throw new Error(ERROR_NOT_FOUND_ID);

        return this.#ticketDTO.fromModel(ticket);
    }

    // Crear un nuevo ticket
    async save(data) {
        const ticketDTO = this.#ticketDTO.fromData(data);
        const ticket = await this.#ticketDAO.save(ticketDTO);
        return this.#ticketDTO.fromModel(ticket);
    }

    // Eliminar un ticket por su ID
    async deleteOneById(id) {
        const ticket = await this.findOneById(id);
        await this.#ticketDAO.deleteOneById(id);
        return ticket;
    }
}