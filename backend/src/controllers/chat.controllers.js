import { createNewMessage, findMessages } from "../service/messageService.js";
import { io } from "../index.js";

export const postMessage = async (req, res) => {
    const { message } = req.body;
    const { first_name, email } = req.user;
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
        console.log(error.message)
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await findMessages();
        console.log(messages)

        res.status(200).json({ 
            messages: messages
        });

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}