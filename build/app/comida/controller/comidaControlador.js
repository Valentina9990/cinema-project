"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const comida_1 = __importDefault(require("../entity/comida"));
const comidaDao_1 = __importDefault(require("../dao/comidaDao"));
class ComidaControlador extends comidaDao_1.default {
    dameComida(req, res) {
        comidaDao_1.default.obtenerTodo([], res);
    }
    cogeTuComida(req, res) {
        const objCubi = new comida_1.default(0, "");
        objCubi.idComida = req.body.idComida;
        objCubi.nombreComida = req.body.nombreComida;
        comidaDao_1.default.grabeloYa(objCubi, res);
    }
    borrarTuComida(req, res) {
        // Validar si el parámetro idComida es un número
        if (isNaN(Number(req.params.idComida))) {
            res.status(400).json({ respuesta: "y el código mi vale?" });
        }
        else {
            // Obtener el idComida del request params
            const codiguito = Number(req.params.idComida);
            // Crear un objeto comida con el idComida correcto
            const objCubi = new comida_1.default(codiguito, ""); // El nombre se puede dejar vacío, solo interesa el ID
            // Llamar al método para eliminar la comida
            comidaDao_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuComida(req, res) {
        const nuevoNombre = req.body.nombre_comida;
        if (!nuevoNombre) {
            return res.status(400).json({ error: "El nombre de la comida no puede ser nulo o vacío" });
        }
        comidaDao_1.default.actualizaloYa(nuevoNombre, res);
    }
    obtenerComidasPaginadas(req, res) {
        const limit = Number(req.query.limit) || 10; // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar
        comidaDao_1.default.obtenerComidasPaginadas(limit, offset, res);
    }
}
const comidaControlador = new ComidaControlador();
exports.default = comidaControlador;
