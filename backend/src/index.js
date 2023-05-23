import './config/dotenv.js';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { __dirname } from './path.js';
import router from './routes/index.routes.js';
import passport from 'passport'
import { initializePassport } from './config/passport/passport.js';
import cors from 'cors';
import { Server } from "socket.io";
import errorHandler from './config/middlewares/errorHandler.js';
import { addLogger } from './utils/logger/logger.js';

//CORS
const whiteList = ["http://localhost:3000"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: 'GET, POST, PUT, DELETE',
    optionsSuccessStatus: 200,
    preflightContinue: false,
    maxAge: 3600,
};

//Iniciar Server
const app = express()

//MIDDLEWARES
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(addLogger);

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

//Errors
app.use(errorHandler);

//PUERTO DEL SERVIDOR
const port = process.env.APP_PORT || 8080;
app.set("port", port);
const server = app.listen(app.get("port"), () => console.log(`Server on port ${app.get("port")}`));

//Servidor Socket
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
        allowedHeaders: ['Content-Type', 'Authorization'],
        methods: 'GET, POST, PUT, DELETE',
        optionsSuccessStatus: 200,
        preflightContinue: false,
        maxAge: 3600,
    },
});
