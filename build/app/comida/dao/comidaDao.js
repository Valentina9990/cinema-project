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
const comida_sql_1 = require("../repository/comida_sql");
class comidaDao {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .result(comida_sql_1.SQL_COMIDAS.GET_ALL, params)
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
                // Verificar si el idComida ya existe
                const cubiId = yield consulta.one(comida_sql_1.SQL_COMIDAS.HOW_MANY, [datos.idComida]);
                if (cubiId.existe == 0) {
                    // Verificar si el nombre de la comida ya existe
                    const cubiNombre = yield consulta.one(comida_sql_1.SQL_COMIDAS.CHECK_NAME, [datos.nombreComida]);
                    if (cubiNombre.existe == 0) {
                        queHacer = 2;
                        respuBase = yield consulta.one(comida_sql_1.SQL_COMIDAS.ADD, [datos.idComida, datos.nombreComida]);
                    }
                    else {
                        // Si el nombre de la comida ya existe
                        queHacer = 3;
                    }
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({ respuesta: "Compita ya existe la comida con ese ID" });
                        break;
                    case 3:
                        res.status(400).json({ respuesta: "Compita ya existe una comida con ese nombre" });
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
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const existe = yield consulta.one(comida_sql_1.SQL_COMIDAS.EXITS_IN_MENU, [datos.idComida]);
                if (existe != 0) {
                    throw new Error("Error al eliminar esta referenciado en la tabla menu");
                }
                return yield consulta.result(comida_sql_1.SQL_COMIDAS.DELETE, [datos.idComida]);
            }))
                .then((respuesta) => {
                if (respuesta.rowCount > 0) {
                    res.status(200).json({
                        respuesta: "Comida eliminada correctamente",
                        info: respuesta.rowCount,
                    });
                }
                else {
                    res.status(404).json({
                        respuesta: "No se encontró la comida",
                    });
                }
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                if (miErrorcito.code === '23503') {
                    // Error de violación de integridad referencial (ON DELETE RESTRICT)
                    res.status(400).json({
                        respuesta: "No se puede eliminar la comida porque está relacionada con un menú de cine.",
                    });
                }
                else {
                    res.status(400).json({
                        respuesta: "Error al intentar eliminar la comida",
                        detalle: miErrorcito.message,
                    });
                }
            });
        });
    }
    static actualizaloYa(nuevoNombre, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!nuevoNombre) {
                return res.status(400).json({ error: "El nombre de la comida no puede ser nulo o vacío" });
            }
            dbConnection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                yield consulta.none(comida_sql_1.SQL_COMIDAS.UPDATE_MASIVO, [nuevoNombre]);
            }))
                .then(() => {
                res.status(200).json({ respuesta: "Nombres actualizados exitosamente" });
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({ respuesta: "Se totió mano" });
            });
        });
    }
    static obtenerComidasPaginadas(limit, offset, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default
                .any("SELECT * FROM comidas ORDER BY nombre_comida LIMIT $1 OFFSET $2", [limit, offset])
                .then((comidas) => {
                res.status(200).json(comidas);
            })
                .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error al consultar comidas paginadas" });
            });
        });
    }
}
exports.default = comidaDao;
