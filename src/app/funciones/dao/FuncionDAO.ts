import { Response } from "express";
import pool from "../../../config/connection/db-connection";
import Funcion from "../entity/Funcion";
import { SQL_FUNCIONES } from "../repository/funcion_sql";

class FuncionDAO {
    protected static async getAll(params: any, res: Response) {
        await pool
            .result(SQL_FUNCIONES.GET_ALL, params)
            .then((result) => {
                res.status(200).json(result.rows);
            })
            .catch((error) => {
                console.log(error);
                res.status(400).json({
                    response: "Error al obtener los datos",
                });
            });
    }

    protected static async add(data: Funcion, res: Response): Promise<any> {
        await pool
            .task(async (query) => {
                let whatToDo = 2;
                let response: any;

                const exists = await query.one(SQL_FUNCIONES.HOW_MANY, [data.idFuncion]);

                if (exists.existe > 0) {
                    whatToDo = 1;
                    return { whatToDo };
                }
                
                response = await query.one(SQL_FUNCIONES.ADD, [
                    data.idSala,
                    data.idPelicula,
                    data.fechaFuncion,
                    data.horaInicioFuncion
                ]);
                
                return { whatToDo, baseResponse: response };
            })
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
            .catch((error: any) => {
                console.log(error);
                res.status(400).json({ response: "Error al guardar los datos" });
            });
    }

    protected static async delete(data: Funcion, res: Response): Promise<any> {
        pool
            .task((query) => {
                return query.result(SQL_FUNCIONES.DELETE, [data.idFuncion]);
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
    }

    protected static async update(data: Funcion, res: Response): Promise<any> {
        await pool
            .task(async (query) => {
                let whatToDo = 1;
                let response: any;

                const exists = await query.one(SQL_FUNCIONES.HOW_MANY, [data.idFuncion]);

                if (exists.existe > 0) {
                    response = await query.one(SQL_FUNCIONES.UPDATE, [
                        data.idSala,
                        data.idPelicula,
                        data.fechaFuncion,
                        data.horaInicioFuncion,
                        data.idFuncion
                    ]);
                    whatToDo = 2;
                }

                return { whatToDo, baseResponse: response };
            })
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
            .catch((error: any) => {
                console.log(error);
                res.status(400).json({ response: "Error al actualizar los datos" });
            });
    }

    protected static async findById(id: number): Promise<Funcion> {
        const funcion = await pool.oneOrNone(SQL_FUNCIONES.FIND_BY_ID, [id]);
        return funcion;
    }
}

export default FuncionDAO;