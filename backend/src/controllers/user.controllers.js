import { findUsers } from "../service/userService.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await findUsers()
        res.status(200).json({users})

    } catch (error) {
        next(error)
    }
}