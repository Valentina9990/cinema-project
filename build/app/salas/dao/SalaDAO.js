"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sala_sql_1 = require("../repository/sala_sql");
const db_connection_1 = __importDefault(require("../../../config/connection/db-connection"));
class SalaDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .result(sala_sql_1.SQL_SALAS.GET_ALL, params)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({
                    respuesta: "Error al obtener los datos",
                });
            });
        });
    }
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 2;
                let respuBase;
                respuBase = yield consulta.one(sala_sql_1.SQL_SALAS.ADD, [
                    datos.nombreSala,
                    datos.tipoSala,
                    datos.capacidadSala,
                    datos.idCine
                ]);
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Ya existe la sala" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totio" });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            db_connection_1.default
                .task((consulta) => {
                return consulta.result(sala_sql_1.SQL_SALAS.DELETE, [datos.idSala]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Lo borré sin miedo",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Pailas, sql totiado" });
            });
        });
    }
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(sala_sql_1.SQL_SALAS.HOW_MANY, [datos.idSala]);
                if (cubi.existe > 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(sala_sql_1.SQL_SALAS.UPDATE, [
                        datos.nombreSala,
                        datos.capacidadSala,
                        datos.idCine,
                        datos.tipoSala,
                        datos.idSala
                    ]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "No se encontro la sala" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totió mano" });
            });
        });
    }
}
exports.default = SalaDAO;
