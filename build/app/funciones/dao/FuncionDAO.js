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
const db_connection_1 = __importDefault(require("../../../config/connection/db-connection"));
const funcion_sql_1 = require("../repository/funcion_sql");
class FuncionDAO {
    static getAll(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .result(funcion_sql_1.SQL_FUNCIONES.GET_ALL, params)
                .then((result) => {
                res.status(200).json(result.rows);
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({
                    response: "Error al obtener los datos",
                });
            });
        });
    }
    static add(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((query) => __awaiter(this, void 0, void 0, function* () {
                let whatToDo = 2;
                let response;
                const exists = yield query.one(funcion_sql_1.SQL_FUNCIONES.HOW_MANY, [data.idFuncion]);
                if (exists.existe > 0) {
                    whatToDo = 1;
                    return { whatToDo };
                }
                response = yield query.one(funcion_sql_1.SQL_FUNCIONES.ADD, [
                    data.idSala,
                    data.idPelicula,
                    data.fechaFuncion,
                    data.horaInicioFuncion
                ]);
                return { whatToDo, baseResponse: response };
            }))
                .then(({ whatToDo, baseResponse }) => {
                switch (whatToDo) {
                    case 1:
                        res.status(400).json({ response: "La función ya existe" });
                        break;
                    default:
                        res.status(200).json(baseResponse);
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({ response: "Error al guardar los datos" });
            });
        });
    }
    static delete(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            db_connection_1.default
                .task((query) => {
                return query.result(funcion_sql_1.SQL_FUNCIONES.DELETE, [data.idFuncion]);
            })
                .then((result) => {
                res.status(200).json({
                    response: "Función eliminada",
                    info: result.rowCount,
                });
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({ response: "Error al eliminar la función" });
            });
        });
    }
    static update(data, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((query) => __awaiter(this, void 0, void 0, function* () {
                let whatToDo = 1;
                let response;
                const exists = yield query.one(funcion_sql_1.SQL_FUNCIONES.HOW_MANY, [data.idFuncion]);
                if (exists.existe > 0) {
                    response = yield query.one(funcion_sql_1.SQL_FUNCIONES.UPDATE, [
                        data.idSala,
                        data.idPelicula,
                        data.fechaFuncion,
                        data.horaInicioFuncion,
                        data.idFuncion
                    ]);
                    whatToDo = 2;
                }
                return { whatToDo, baseResponse: response };
            }))
                .then(({ whatToDo, baseResponse }) => {
                switch (whatToDo) {
                    case 1:
                        res.status(400).json({ response: "La función no existe" });
                        break;
                    default:
                        res.status(200).json(baseResponse);
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res.status(400).json({ response: "Error al actualizar los datos" });
            });
        });
    }
}
exports.default = FuncionDAO;
