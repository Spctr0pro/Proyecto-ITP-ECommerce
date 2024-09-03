import { ERROR_NOT_FOUND_ID } from "../constants/messages.constant.js";
import TicketRepository from "../repositories/ticket.repository.js";

export default class TicketService {
    #ticketRepository;

    constructor() {
        this.#ticketRepository = new TicketRepository();
    }
    // Obtener todas los tickets aplicando filtros
    async getAll(paramFilters) {
        const $and = [];

        if (paramFilters?.name) $and.push({ name: { $regex: paramFilters.name, $options: "i" } });
        const filters = $and.length > 0 ? { $and } : {};

        const tickets = await this.#ticketRepository.findAll(filters);
        return tickets;
    }
    // Obtener un ticket por su ID
    async getOneById(id) {
        const ticket = await this.#ticketRepository.findOneById(id);
        if (!ticket) throw new Error(ERROR_NOT_FOUND_ID);
        return ticket;
    }
    // Crear un nuevo ticket
    async insertOne(data) {
        return await this.#ticketRepository.save(data);
    }
    // Actualizar un ticket existente
    async updateOneById(id, data) {
        const ticket = await this.#ticketRepository.findOneById(id);
        const newValues = { ...ticket, ...data };
        return await this.#ticketRepository.save(newValues);
    }
    // Eliminar un ticket por su ID
    async deleteOneById(id) {
        const cart = await this.#ticketRepository.findOneById(id);
        await await this.#ticketRepository.deleteOneById(id);
        return cart;
    }
}