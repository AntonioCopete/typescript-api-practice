"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const PostsRoutes_1 = __importDefault(require("./routes/PostsRoutes"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        const MONGO_URI = "mongodb://localhost/TSapi";
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL)
            .then(db => console.log('DB connected'));
        this.app.set('port', process.env.PORT || 4000);
        // Middlewares
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, helmet_1.default)());
        this.app.use((0, compression_1.default)());
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts', PostsRoutes_1.default);
        this.app.use('/api/users', UserRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
