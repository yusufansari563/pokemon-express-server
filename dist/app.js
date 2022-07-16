"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import repository from nodemodule;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
// import from repository files
// import { router } from "./routes/PokedexRoute";
const Config_1 = require("./config/Config");
const logging_1 = __importDefault(require("./library/logging"));
const Author_1 = __importDefault(require("./routes/Author"));
const PokedexRoute_1 = __importDefault(require("./routes/PokedexRoute"));
const MoveRoute_1 = __importDefault(require("./routes/MoveRoute"));
const ItemsRoute_1 = __importDefault(require("./routes/ItemsRoute"));
const TypeRoute_1 = __importDefault(require("./routes/TypeRoute"));
// code start here
const app = (0, express_1.default)();
// app.use('/pokedex', router);
app.get("/test", (req, res, next) => {
    res.send("/ test server api");
});
mongoose_1.default.connect(Config_1.config.mongo.url, { retryWrites: true, w: 'majority' }).then(res => {
    logging_1.default.info("connected to mongoDB");
    StartServer();
}).catch(err => {
    logging_1.default.error(err.message);
});
const StartServer = () => {
    app.use((req, res, next) => {
        logging_1.default.info(`Incoming -> Method: ${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress}`);
        res.on('finish', () => {
            logging_1.default.info(`Incoming -> Method: ${req.method} - Url: ${req.url} - IP: ${req.socket.remoteAddress} - Status: [${res.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
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
    app.use('/authors', Author_1.default);
    app.use('/pokedex', PokedexRoute_1.default);
    app.use('/moves', MoveRoute_1.default);
    app.use('/items', ItemsRoute_1.default);
    app.use('/types', TypeRoute_1.default);
    // health check point
    app.get('/ping', (req, res, next) => res.status(200).json({ "message": "pong" }));
    // Error handling
    app.use((req, res, next) => {
        const error = new Error('Not found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(app).listen(Config_1.config.server.port, () => {
        logging_1.default.info(`Server started on port ${Config_1.config.server.port}`);
    });
};
