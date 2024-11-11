import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: ".env" });

const name = String(process.env.DATABASE_NAME);
const user = String(process.env.DATABASE_USER);
const port = Number(process.env.PORT);
const server = String(process.env.SERVER);
const password = String(process.env.PASSWORD);

const pgp = pgPromise(optionsPG);

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

export default pool;