import passport from 'passport';


export const registerUser = async (req, res, next) => {
    try {
        passport.authenticate('register', async (err, user) => {
            if (err) {
                return res.status(401).send({ 
                    message: "Ha ocurrido un error durante el registro", 
                    error: err.message })
            }
            if (!user) {
                return res.status(401).send("El correo electrónico ya está en uso")
            }
            return res.status(200).send("Registrado correctamente, ya puede logearse")
        })(req, res, next)

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }

}

export const loginUser = async (req, res, next) => {
    try {
        passport.authenticate('login', (err, user) => {
            if (err) {
                return res.status(401).send({
                    message: "Ha ocurrido un error durante el login",
                    error: err.message
                })
            }
            if (!user) {
                return res.status(401).send("Correo electrónico o contraseña incorrecta")
            }
            req.session.login = true;
            req.session.user = user;
            return res.status(200).send(`Bienvenido ${req.session.user.first_name}, tu rol es ${req.session.user.role}`)
        })(req, res, next)

    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }

}

export const destroySession = async (req, res) => {
    try {
        if (req.session.login) {
            req.session.destroy()
            res.status(200).send("La sesión ha terminado, hasta la próxima")
        } else {
            return res.status(401).send("No existe sesion activa")
        }
    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }
}

export const getSession = async (req, res) => {
    try {
        if (req.session.login) {
            console.log(req.session.user)
            res.status(200).json({ response: req.session.user });
        } else {
            return res.status(401).send("No existe sesion activa")
        }
    } catch (error) {
        res.status(500).send({
            message: "Hubo un error en el servidor", 
            error: error.message
        })
    }
}