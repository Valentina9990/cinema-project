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
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const menu_cine_sql_1 = require("../repository/menu_cine_sql");
class menu_cineDao {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(menu_cine_sql_1.SQL_MENU_CINE.GET_ALL, params)
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
            yield dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(menu_cine_sql_1.SQL_MENU_CINE.HOW_MANY, [datos.idMenuCine]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(menu_cine_sql_1.SQL_MENU_CINE.ADD, [datos.idMenuCine, datos.idComida, datos.idCine, datos.precio, datos.disponibilidad]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe el menu" });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({ respuesta: "se totió mano" });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .task((consulta) => {
                return consulta.result(menu_cine_sql_1.SQL_MENU_CINE.DELETE, [datos.idMenuCine]);
            })
                .then((respuesta) => {
                if (respuesta.rowCount > 0) {
                    res.status(200).json({
                        respuesta: "Menu eliminada correctamente",
                        info: respuesta.rowCount,
                    });
                }
                else {
                    res.status(404).json({
                        respuesta: "No se encontró el menu",
                    });
                }
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                if (miErrorcito.code === '23503') {
                    // Error de violación de integridad referencial (ON DELETE RESTRICT)
                    res.status(400).json({
                        respuesta: "No se puede eliminar el menu porque está relacionada con una reservacion",
                    });
                }
                else {
                    res.status(400).json({
                        respuesta: "Error al intentar eliminar el menu",
                        detalle: miErrorcito.message,
                    });
                }
            });
        });
    }
    static actualizaloYa(nuevoPrecio, res) {
        return __awaiter(this, void 0, void 0, function* () {
            dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                // Actualiza el precio de todos los registros en la tabla Menu_cine
                yield consulta.none(menu_cine_sql_1.SQL_MENU_CINE.UPDATE_MASIVO, [nuevoPrecio]);
            }))
                .then(() => {
                res.status(200).json({ respuesta: "Precios actualizados exitosamente" });
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Se totió mano" });
            });
        });
    }
    static MenuPaginadas(limit, offset, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .any("SELECT * FROM comidas ORDER BY precio LIMIT 10 OFFSET 0", [limit, offset])
                .then((menu) => {
                res.status(200).json(menu);
            })
                .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error al consultar comidas paginadas" });
            });
        });
    }
}
exports.default = menu_cineDao;
