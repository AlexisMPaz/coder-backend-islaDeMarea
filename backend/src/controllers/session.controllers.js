import passport from 'passport';
import jwt from 'jsonwebtoken';
import { comparePassword, createHash } from '../utils/bcrypt.js'
import { createUser, findUserByEmail } from '../service/userService.js';
import { createCart } from '../service/cartService.js';


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
        res.status(500).send({
            message: "Hubo un error con la sesión",
            error: error.message
        })
    }
}

export const registerUser = async (req, res) => {
    try {
        const { first_name, last_name, email, age, password } = req.body
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
        res.status(500).send({
            message: "Hubo un error en el servidor",
            error: error.message
        })
    }
}

export const logoutUser = async (req, res) => {
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
        res.status(500).send({
            message: 'Hubo un error en el servidor',
            error: error.message
        });
    }
};

export const getSession = async (req, res) => {
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
        res.status(500).json({
            message: 'Hubo un error en el servidor',
            error: error.message
        });
    }
};