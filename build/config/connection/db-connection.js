"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_promise_1 = __importDefault(require("pg-promise"));
const optionsPG_1 = require("./optionsPG");
dotenv_1.default.config({ path: ".env" });
const name = String(process.env.DATABASE_NAME);
const user = String(process.env.DATABASE_USER);
const port = Number(process.env.PORT);
const server = String(process.env.SERVER);
const password = String(process.env.PASSWORD);
console.log(name, user, port, server, password);
const pgp = (0, pg_promise_1.default)(optionsPG_1.optionsPG);
const pool = pgp({
    user: user,
    password: password,
    port: port,
    database: name,
    host: server,
});
//programacion en cadenas
pool
    .connect()
    .then((myconn) => {
    console.log(`Conectado a la base de datos: ${name}`);
    myconn.done();
})
    .catch((miError) => {
    console.error("Error al conectar a la base de datos:", miError);
});
exports.default = pool;
