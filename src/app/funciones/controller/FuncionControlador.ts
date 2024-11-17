import { Request, Response } from "express";
import FuncionDAO from "../dao/FuncionDAO";
import Funcion from "../entity/Funcion";

class FuncionControlador extends FuncionDAO {
    public getAll(req: Request, res: Response): void {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const size = parseInt(req.query.size as string) || 10;
            const offset = (page - 1) * size;
            const params = { limit: size, offset: offset };

            FuncionDAO.getAllPaginated(params, res);
        } catch (error) {
            res.status(500).json({
                message: "Error al obtener las funciones.",
            });
        }
    }

    public add(req: Request, res: Response): void {
        console.log(req.body);
        try {
            const { id_sala, id_pelicula, fecha_funcion, hora_inicio_funcion } =
                req.body;

            if (!id_sala || isNaN(Number(id_sala))) {
                res.status(400).json({
                    message: "El id de la sala es inválido o está vacío.",
                });
                return;
            }

            if (!id_pelicula || isNaN(Number(id_pelicula))) {
                res.status(400).json({
                    message: "El id de la película es inválido o está vacío.",
                });
                return;
            }

            if (!fecha_funcion) {
                res.status(400).json({
                    message: "La fecha de la función es requerida.",
                });
                return;
            }

            if (!hora_inicio_funcion) {
                res.status(400).json({
                    message: "La hora de inicio de la función es requerida.",
                });
                return;
            }

            const obj: Funcion = new Funcion(
                0,
                Number(id_sala),
                Number(id_pelicula),
                fecha_funcion,
                hora_inicio_funcion
            );
            FuncionDAO.add(obj, res);
        } catch (error) {
            res.status(500).json({ message: "Error al agregar la función." });
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const idFuncion = Number(req.params.idFuncion);

            if (isNaN(idFuncion)) {
                res.status(400).json({
                    message: "El ID de la función es inválido o está vacío.",
                });
                return;
            }

            const funcionExistente = await FuncionDAO.findById(idFuncion);

            if (!funcionExistente) {
                res.status(404).json({
                    message: "La función que intenta eliminar no existe.",
                });
                return;
            }

            const obj: Funcion = new Funcion(idFuncion, 0, 0, "", "");
            FuncionDAO.delete(obj, res);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar la función." });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const {
                id_funcion,
                id_sala,
                id_pelicula,
                fecha_funcion,
                hora_inicio_funcion,
            } = req.body;

            if (!id_funcion || isNaN(Number(id_funcion))) {
                res.status(400).json({
                    message: "El ID de la función es inválido o está vacío.",
                });
                return;
            }

            if (!id_sala || isNaN(Number(id_sala))) {
                res.status(400).json({
                    message: "El ID de la sala es inválido o está vacío.",
                });
                return;
            }

            if (!id_pelicula || isNaN(Number(id_pelicula))) {
                res.status(400).json({
                    message: "El ID de la película es inválido o está vacío.",
                });
                return;
            }

            if (!fecha_funcion) {
                res.status(400).json({
                    message: "La fecha de la función es requerida.",
                });
                return;
            }

            if (!hora_inicio_funcion) {
                res.status(400).json({
                    message: "La hora de inicio de la función es requerida.",
                });
                return;
            }

            const funcionExistente = await FuncionDAO.findById(
                Number(id_funcion)
            );

            if (!funcionExistente) {
                res.status(404).json({
                    message: "La función que intenta actualizar no existe.",
                });
                return;
            }

            const obj: Funcion = new Funcion(
                Number(id_funcion),
                Number(id_sala),
                Number(id_pelicula),
                fecha_funcion,
                hora_inicio_funcion
            );
            FuncionDAO.update(obj, res);
        } catch (error) {
            res.status(500).json({
                message: "Error al actualizar la función.",
            });
        }
    }
}

const funcionControlador = new FuncionControlador();
export default funcionControlador;
