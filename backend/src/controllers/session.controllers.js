import passport from 'passport';
import jwt from 'jsonwebtoken';
import { comparePassword, createHash } from '../utils/bcrypt/bcrypt.js'
import { createUser, findUserByEmail } from '../service/userService.js';
import { createCart } from '../service/cartService.js';
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";
import { generateUserErrorInfo } from '../utils/customErrors/info.js';


export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) {
                return res.status(401).send({
                    message: "Error en consulta de token",
                })
            }

            if (!user) {
                const { email, password } = req.body;
                const userDB = await findUserByEmail(email)
                if (!userDB) {
                    return res.status(401).send({
                        message: "Usuario no encontrado",
                    })
                }
                if (!comparePassword(password, userDB.password)) {
                    return res.status(401).send({
                        message: "Contraseña no valida",
                    })
                }
                const token = jwt.sign({ user: { id: userDB._id} }, process.env.JWT_SECRET);
                res.cookie(`jwt`, token, { httpOnly: true })
                res.status(201).json({ 
                    user: userDB,
                    message: "Estas logeado"
                })

            } else {
                console.log("Al parecer encontre el token")
                const token = req.cookies.jwt;
                jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                    if (err) {
                        return res.status(401).send({
                            message: "Credenciales no validas",
                        })
                    }

                    return res.status(401).send({
                        message: "Primero debes cerrar la sesión",
                    })
                })
            }
        })(req, res, next)

    } catch (error) {
        next(error)
    }
}

export const registerUser = async (req, res, next) => {
    try {
        const { first_name, last_name, email, age, password } = req.body;

        if (!first_name || !last_name || !email || !age || !password) {
            CustomError.createError({
                name: "Error de Registro",
                message: "No se pudo registrar el usuario",
                cause: generateUserErrorInfo([first_name, last_name, email, age, password]),
                code: EErrors.MISSING_FIELDS_ERROR
            })
        }

        const userDB = await findUserByEmail(email)
        if (userDB) {
            res.status(401).send({
                message: "Usuario ya registrado"
            })

        } else {
            const newCart = await createCart()
            const hashPassword = createHash(password)
            const newUser = await createUser({
                first_name,
                last_name,
                email,
                age,
                password: hashPassword,
                idCart: newCart._id
            })
            const token = jwt.sign({ user: { id: newUser._id} }, process.env.JWT_SECRET);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(201).json({ 
                user:newUser,
                message: "Te has logeado satisfactoriamente"
            })
        }

    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({
                message: 'No se proporcionó ninguna token de autenticación'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({ message: 'Token no válida' });
            }

            res.clearCookie('jwt');
            res.status(200).send({ message: 'Sesión cerrada exitosamente' });
        });
    } catch (error) {
        next(error)
    }
};

export const getSession = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({
                message: 'No se proporcionó ninguna token de autenticación'
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: 'Token no válida' });
            }

            res.status(200).json({ decodedToken });
        });

    } catch (error) {
        next(error)
    }
};