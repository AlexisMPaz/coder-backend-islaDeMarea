import bcrypt from 'bcrypt';

export const createHash = (password) => {
    return bcrypt.hashSync(password, parseInt(process.env.SALT));
}

export const comparePassword = (passwordLogin, passwordDB) => {
    return bcrypt.compareSync(passwordLogin, passwordDB);
}