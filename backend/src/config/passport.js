import local from 'passport-local';
import passport from 'passport';
import GitHubStrategy from 'passport-github2';
import { createHash, comparePassword } from '../utils/bcrypt.js';
import { findUserByEmail, findUserById, createUser } from '../service/userService.js';
import { createCart } from '../service/cartService.js';

const LocalStrategy = local.Strategy;

export const initializePassport = () => {

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            const { first_name, last_name, email, age } = req.body;

            try {
                const user = await findUserByEmail(username)
                if (user) {
                    return done(null, false);
                }
                const cart = await createCart();
                const hashPassword = createHash(password);
                const newUser = await createUser({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    age: age,
                    role: "Usuario",
                    password: hashPassword,
                    idCart: cart._id
                })
                return done(null, newUser);
            } catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {

        try {
            const user = await findUserByEmail(username);
            if (!user) {
                return done(null, false);
            }
            if (comparePassword(password, user.password)) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error);
        }
    }));

    passport.use('github', new GitHubStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/auth/github/callback'
    }, async (accessToken, refreshToken, profile, done) => {

        try {
            const user = await findUserByEmail(profile._json.email);

            if (user) { //Usuario ya existe en BDD
                return done(null, user)
            } else {
                const cart = await createCart()
                const passwordHash = createHash('coder123')
                const userCreated = await createUser({
                    first_name: profile._json.name,
                    last_name: ' ',
                    email: profile._json.email,
                    age: 18,
                    role: "Usuario",
                    password: passwordHash,
                    cartId: cart._id
                });
                return done(null, userCreated)
            }
        } catch (error) {
            return done(error)
        }
    }))

    //Iniciar la session del usuario
    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id)
        done(null, user)
    });
}