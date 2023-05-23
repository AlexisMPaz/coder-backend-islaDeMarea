import { createNewMessage, findMessages } from "../service/messageService.js";
import { io } from "../index.js";

export const postMessage = async (req, res, next) => {
    const { message } = req.body;
    const { first_name, email } = req.user;

    req.logger.http(`Petición llegó al controlador (postMessage).`);

    try {
        console.log(req.user)
        await createNewMessage({user: first_name, email, message});
        const messages = await findMessages();
        console.log("aca estan los mensajes actualizados", messages)

        io.emit("messagesUpdated", messages);

        res.status(200).send({
            message: "Mensaje enviado exitosamente",
        });

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

export const getMessages = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (getMessages).`);

    try {
        const messages = await findMessages();
        console.log(messages)

        res.status(200).json({ 
            messages: messages
        });

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}