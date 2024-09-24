"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FuncionDAO_1 = __importDefault(require("../dao/FuncionDAO"));
const Funcion_1 = __importDefault(require("../entity/Funcion"));
class FuncionControlador extends FuncionDAO_1.default {
    getAll(req, res) {
        FuncionDAO_1.default.getAll([], res);
    }
    add(req, res) {
        const obj = new Funcion_1.default(0, 0, 0, "", "");
        obj.idSala = Number(req.body.id_sala);
        obj.idPelicula = Number(req.body.id_pelicula);
        obj.fechaFuncion = req.body.fecha_funcion;
        obj.horaInicioFuncion = req.body.hora_inicio_funcion;
        FuncionDAO_1.default.add(obj, res);
    }
    delete(req, res) {
        if (isNaN(Number(req.params.idFuncion))) {
            res.status(400).json({ response: "Falta el id" });
        }
        else {
            const id = Number(req.params.idFuncion);
            const obj = new Funcion_1.default(id, 0, 0, "", "");
            FuncionDAO_1.default.delete(obj, res);
        }
    }
    update(req, res) {
        const obj = new Funcion_1.default(0, 0, 0, "", "");
        obj.idFuncion = Number(req.body.id_funcion);
        obj.idSala = Number(req.body.id_sala);
        obj.idPelicula = Number(req.body.id_pelicula);
        obj.fechaFuncion = req.body.fecha_funcion;
        obj.horaInicioFuncion = req.body.hora_inicio_funcion;
        FuncionDAO_1.default.update(obj, res);
    }
}
const funcionControlador = new FuncionControlador();
exports.default = funcionControlador;
