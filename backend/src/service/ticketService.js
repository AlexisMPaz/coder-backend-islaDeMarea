import ticketModel from "../models/MongoDB/ticketModel.js"

export const findTicketByCode = async (code) => {
    try {
        const ticket = await ticketModel.findOne({ code: code });
        return ticket;
    } catch (error) {
        throw new Error(error);
    }
}

export const createNewTicket = async (ticket) => {
    try {
        const newTicket = await ticketModel.create(ticket);
        return newTicket;
    } catch (error) {
        throw new Error(error);
    }
}