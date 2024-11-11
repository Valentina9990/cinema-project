"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); //import anonimos dotenv sirve para hacer el archivo de configuracion
const pg_promise_1 = __importDefault(require("pg-promise"));
const optionsPG_1 = require("./optionsPG"); //llama al camelCase
dotenv_1.default.config({ path: "variables.env" }); //sirve para sacar la informacion que se va usar de la bd
const nombre = String(process.env.NOMBRE_BASE_DE_DATO); //para que quede bonito
const usuario = String(process.env.EL_USUARIO); //para que quede bonito
const puerto = Number(process.env.EL_PUERTO); //para que quede bonito
const servidor = String(process.env.EL_SERVIDOR); //para que quede bonito
const clave = String(process.env.LA_CLAVE); //para que quede bonito
const pgp = (0, pg_promise_1.default)(optionsPG_1.optionsPG); //cree una variable para conectarse a la base
const pool = pgp({
    user: usuario,
    password: clave,
    port: puerto,
    database: nombre,
    host: servidor
});
pool.connect().then((miConn) => {
    console.log("SIRVE", nombre);
    miConn.done();
}).catch((miError) => {
    console.log(miError);
});
exports.default = pool;
