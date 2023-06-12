import { findUsers, findUserById, updateUser } from "../service/userService.js";

export const getUsers = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (getUsers).`);

    try {
        const users = await findUsers()
        res.status(200).json({ users })

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}