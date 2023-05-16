import passport from 'passport';
import { strategyJWT } from './Strategies/jwtStrategy.js';
import { findUserById } from '../../service/userService.js';

export const initializePassport = () => {
    passport.use('jwt', strategyJWT)

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id);
        done(null, user)
    })
}