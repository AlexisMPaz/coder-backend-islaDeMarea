import './config/dotenv.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import { __dirname } from './path.js';
import * as path from 'path';
import  router  from './routes/index.routes.js';
import passport from 'passport'
import { initializePassport } from './config/passport.js';
import cors from 'cors';

//CORS
const whiteList = ['http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by Cors'))
        }
    }
}

//Iniciar Server
const app = express()

//MIDDLEWARES
app.use(cookieParser(process.env.SIGNED_COOKIE))
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URLMONGODB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 500
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//MONGOOSE
const connectionMongoose = async () => {
    await mongoose.connect(process.env.URLMONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .catch((err) => console.log(err));
}

connectionMongoose()

//ROUTES
app.use('/', router);

//PUERTO DEL SERVIDOR
const port = process.env.APP_PORT || 8080;
app.set("port", port);
const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));

