import dotenv from "dotenv";//import anonimos dotenv sirve para hacer el archivo de configuracion
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG"; //llama al camelCase

dotenv.config({ path: "variables.env" }) //sirve para sacar la informacion que se va usar de la bd

const nombre = String(process.env.NOMBRE_BASE_DE_DATO); //para que quede bonito
const usuario = String(process.env.EL_USUARIO); //para que quede bonito
const puerto = Number(process.env.EL_PUERTO); //para que quede bonito
const servidor = String(process.env.EL_SERVIDOR); //para que quede bonito
const clave = String(process.env.LA_CLAVE); //para que quede bonito

const pgp = pgPromise(optionsPG); //cree una variable para conectarse a la base
const pool = pgp({//coneccion a la pg promise
    user:usuario,
    password:clave,
    port: puerto,
    database: nombre,
    host: servidor
});

pool.connect().then((miConn)=>{
    console.log("SIRVE",nombre);
    miConn.done();
}).catch((miError)=>{ //programacion en cadena, flecha anonima, la funcion anonima "()=>{}"
    console.log(miError);
});

export default pool;

