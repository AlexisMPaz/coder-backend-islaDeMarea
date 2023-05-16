export const roleValidation = (role) => {
    return async (req, res, next) => {
        if (!req.user) {
            return res.status(401).send({
                message: "Usuario no autorizado"
            })
        }
    
        if (req.user.role !== role) {
            return res.status(401).send({ 
                message: "No posee los permisos de rol necesarios" 
            });
        }
        next()
    }
}