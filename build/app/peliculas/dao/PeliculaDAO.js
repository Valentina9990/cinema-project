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
const pelicula_sql_1 = require("../repository/pelicula_sql");
class PeliculaDAO {
    static obtenerTodo(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .result(pelicula_sql_1.SQL_PELICULAS.GET_ALL, params)
                .then((resultado) => {
                res.status(200).json(resultado.rows);
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({
                    respuesta: "Error al obtener datos",
                });
            });
        });
    }
    static ObtenerConPaginacion(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = params;
            yield db_connection_1.default
                .result(pelicula_sql_1.SQL_PELICULAS.PAGINACION, [limit, offset])
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
    //Realizar restricción  en el agregar que no permita repetidos, hacer la restricción por nombres
    static grabeloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(pelicula_sql_1.SQL_PELICULAS.HOW_MANY_NAME, [
                    datos.nombrePelicula,
                ]);
                if (cubi.existe == 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(pelicula_sql_1.SQL_PELICULAS.ADD, [
                        datos.nombrePelicula,
                        datos.idGenero,
                        datos.duracionPelicula,
                        datos.idioma,
                    ]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({
                            respuesta: "Ya existe una pelicula con este mismo nombre",
                        });
                        break;
                    default:
                        res.status(200).json(respuBase);
                        break;
                }
            })
                .catch((miError) => {
                console.log(miError);
                res.status(400).json({
                    respuesta: "No se puede procesar la solicitud",
                });
            });
        });
    }
    static borreloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            db_connection_1.default.task((consulta) => {
                return consulta.result(pelicula_sql_1.SQL_PELICULAS.DELETE, [datos.idPelicula]);
            })
                .then((respuesta) => {
                res.status(200).json({
                    respuesta: "Se borró la pelicula exitosamente",
                    info: respuesta.rowCount,
                });
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({
                    respuesta: "No se puede eliminar la pelicula porque está siendo referenciada en otra tabla",
                });
            });
        });
    }
    //ACTUALIZAR UN REGISTRO POR ID
    static actualiceloYa(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let queHacer = 1;
                let respuBase;
                const cubi = yield consulta.one(pelicula_sql_1.SQL_PELICULAS.HOW_MANY, [
                    datos.idPelicula,
                ]);
                if (cubi.existe > 0) {
                    queHacer = 2;
                    respuBase = yield consulta.one(pelicula_sql_1.SQL_PELICULAS.UPDATE, [
                        datos.idPelicula,
                        datos.nombrePelicula,
                        datos.idGenero,
                        datos.duracionPelicula,
                        datos.idioma,
                    ]);
                }
                return { queHacer, respuBase };
            }))
                .then(({ queHacer, respuBase }) => {
                switch (queHacer) {
                    case 1:
                        res.status(400).json({
                            respuesta: "No se encontró la pelicula",
                        });
                        break;
                    default:
                        res.status(200).json({
                            respuesta: "Se actualizó correctamente la pelicula",
                            respuBase,
                        });
                        break;
                }
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({
                    respuesta: "No se puede procesar la solicitud de actualización",
                });
            });
        });
    }
    //ACTUALIZAR TODOS LOS IDIOMAS DE LOS REGISTROS POR UNO ESPECIFICO
    static actualizaTodo(datos, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_connection_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                const respuBase = yield consulta.any(pelicula_sql_1.SQL_PELICULAS.UPDATE_ALL, [
                    datos.idioma,
                ]);
                return { respuBase };
            }))
                .then(({ respuBase }) => {
                if (respuBase.length > 0) {
                    res.status(200).json({
                        respuesta: "Los idiomas de todas las peliculas fueron actualizados",
                    });
                }
                else {
                    res.status(400).json({
                        respuesta: "No se lograron actualizar los idiomas de las peliculas",
                    });
                }
            })
                .catch((miErrorcito) => {
                console.log(miErrorcito);
                res.status(400).json({
                    respuesta: "No se puede procesar la solicitud de actualización",
                });
            });
        });
    }
    static obtenerConFuncionesPaginadas(params, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset } = params;
            yield db_connection_1.default
                .result(pelicula_sql_1.SQL_PELICULAS.GET_ALL_WITH_SHOWS_PAGINATED, [limit, offset])
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
}
exports.default = PeliculaDAO;
