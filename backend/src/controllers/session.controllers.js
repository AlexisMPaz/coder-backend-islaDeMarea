import passport from 'passport';
import jwt from 'jsonwebtoken';
import { comparePassword, createHash } from '../utils/bcrypt/bcrypt.js'
import { createUser, findUserByEmail, findUserById, updateUser } from '../service/userService.js';
import { sendResetMail } from "../utils/nodemailer/nodemailer.js";
import { createCart } from '../service/cartService.js';
import CustomError from "../utils/customErrors/CustomError.js";
import { EErrors } from "../utils/customErrors/enums.js";
import { generateUserErrorInfo } from '../utils/customErrors/info.js';


export const loginUser = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (loginUser).`);

    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) {
                return res.status(401).send({
                    status: "error",
                    message: "Error en consulta de token",
                })
            }

            if (!user) {
                const { email, password } = req.body;
                const userDB = await findUserByEmail(email)
                if (!userDB) {
                    return res.status(401).send({
                        status: "error",
                        message: "Usuario no encontrado",
                    })
                }
                if (!comparePassword(password, userDB.password)) {
                    return res.status(401).send({
                        status: "error",
                        message: "Contraseña no valida",
                    })
                }
                const token = jwt.sign({ user: { id: userDB._id } }, process.env.JWT_SECRET);
                res.cookie(`jwt`, token, { httpOnly: true })
                res.status(200).json({
                    status: "success",
                    user: userDB,
                    message: "Estas logeado"
                })

            } else {
                console.log("Al parecer encontre el token")
                const token = req.cookies.jwt;
                jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                    if (err) {
                        return res.status(401).send({
                            status: "error",
                            message: "Credenciales no validas",
                        })
                    }

                    return res.status(401).send({
                        status: "error",
                        message: "Primero debes cerrar la sesión",
                    })
                })
            }
        })(req, res, next)

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

export const registerUser = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (registerUser).`);

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
                status: "error",
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
            const token = jwt.sign({ user: { id: newUser._id } }, process.env.JWT_SECRET);
            res.cookie('jwt', token, { httpOnly: true });
            res.status(200).json({
                status: "success",
                user: newUser,
                message: "Te has logeado satisfactoriamente"
            })
        }

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (logoutUser).`);

    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({
                status: "error",
                message: 'No se proporcionó ninguna token de autenticación'
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({status: "error", message: 'Token no válida' });
            }

            res.clearCookie('jwt');
            res.status(200).send({status: "success", message: 'Sesión cerrada exitosamente' });
        });
    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
};

export const getSession = async (req, res, next) => {

    req.logger.http(`Petición llegó al controlador (getSession).`);

    try {
        passport.authenticate('jwt', { session: false }, async (err, user, info) => {
            if (err) {
                return res.status(401).send({
                    status: "error",
                    message: "Error en consulta de token",
                })
            }

            if (!user) {
                return res.status(401).send({
                    status: "error",
                    message: "No se ha encontrado al usuario",
                })
            }

            const token = req.cookies.jwt;
            jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
                if (err) {
                    return res.status(401).send({
                        status: "error",
                        message: "Credenciales no validas",
                    })
                }

                return res.status(200).send({
                    status: "success",
                    message: "Se ha encontrado los datos del usuario",
                    payload: user,
                    token: token

                })
            })

        })(req, res, next)

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
};

export const sendResetToken = async (req, res, next) => {
    req.logger.http(`Petición llegó al controlador (sendResetToken).`);
    const { email } = req.body;
    if (!email) {
        return res.status(404).json({
            status: "error",
            message: "Debe ingresar un email válido"
        });
    }

    try {
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "El email no esta registrado"
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        req.logger.debug(token)
        await sendResetMail(token, email);
        return res.status(200).json({
            status: "success",
            message: "Ha sido enviado un email con el link para recuperar la contraseña"
        });

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
};

export const resetUserPassword = async (req, res, next) => {
    req.logger.http(`Petición llegó al controlador (resetUserPassword).`);
    const { newPassword, token } = req.body;
    if (!newPassword) {
        return res.status(404).json({
            status: "error",
            message: "Debe ingresar una contraseña válida"
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.logger.debug(decodedToken)
        const userId = decodedToken.userId;
        const userDB = await findUserById(userId);
        if (!userDB) {
            return res.status(404).json({ 
                status: "error",
                message: 'Usuario no encontrado.'
            });
        }
        if (comparePassword(newPassword, userDB.password)) {
            return res.status(404).json({ 
                status: "error",
                message: 'La nueva contraseña no puede ser la misma que la anterior'
            });
        }
        const hashPassword = createHash(newPassword);
        await updateUser(userId, {password: hashPassword})
        
        return res.status(200).json({
            status: "success",
            message: "La contraseña ha sido actualizada"
        });

    } catch (error) {
        req.logger.error(error.message)
        next(error)
    }
};



