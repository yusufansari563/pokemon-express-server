// import repository from nodemodule;
import express, { Application, Request, Response, NextFunction } from "express";
import http from "http";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";

// import from repository files
// import { router } from "./routes/PokedexRoute";
// import swaggerDocument from "./../swagger.json";
import { config } from "./config/Config";
import Logging from "./library/logging";
import AuthorRouter from './routes/Author';
import PokeDexRouter from './routes/PokedexRoute';
import MovesRouter from './routes/MoveRoute';
import ItemsRouter from './routes/ItemsRoute';
import TypesRouter from './routes/TypeRoute';
// code start here
const app: Application = express();

// app.use('/pokedex', router);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.send("/ test server api");
})

mongoose.connect(config.mongo.url, { retryWrites: true, w: 'majority' }).then(res => {
    Logging.info("connected to mongoDB");
    StartServer();
}).catch(err => {
    Logging.error(err.message);
})

const StartServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incoming -> Method: ${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress}`);

        res.on('finish', () => {
            Logging.info(`Incoming -> Method: ${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress} - Status: [${res.statusCode}]`);
        })

        next();
    });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-control-Allow-Origin', '*');
        res.header('Access-control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });

    // routes
    app.use('/authors', AuthorRouter);
    app.use('/pokedex', PokeDexRouter);
    app.use('/moves', MovesRouter);
    app.use('/items', ItemsRouter);
    app.use('/types', TypesRouter);

    // app.use(
    //     '/',
    //     swaggerUi.serve,
    //     swaggerUi.setup(swaggerDocument)
    // );
    // health check point
    app.get('/ping', (req, res, next) => res.status(200).json({ "message": "pong" }));

    // Error handling
    app.use((req, res, next) => {
        const error = new Error('Not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    })

    http.createServer(app).listen(config.server.port, () => {
        Logging.info(`Server started on port ${config.server.port}`);
    })
}