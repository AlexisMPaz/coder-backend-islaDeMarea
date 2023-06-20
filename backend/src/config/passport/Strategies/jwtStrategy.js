import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { findUserById } from '../../../service/userService.js';

const cookieExtractor = (req) => {
    const cookieHeader = req.headers.Cookie ;
    if (cookieHeader) {
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === 'jwt') {
                return value;
            }
        }
    }

    const token = req.cookies ? req.cookies.jwt : null;
    return token
}

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.JWT_SECRET
}

export const strategyJWT = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
        const user = await findUserById(jwt_payload.user.id)

        if (!user) {
            return done(null, false)
        }

        return done(null, user)

    } catch (error) {
        return done(error, false)
    }
})