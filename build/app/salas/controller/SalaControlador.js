"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SalaDAO_1 = __importDefault(require("../dao/SalaDAO"));
const Sala_1 = __importDefault(require("../entity/Sala"));
class SalaControlador extends SalaDAO_1.default {
    dameSalas(req, res) {
        SalaDAO_1.default.obtenerTodo([], res);
    }
    cogeTuSala(req, res) {
        const objCubi = new Sala_1.default(0, "", 0, 0, 0);
        objCubi.nombreSala = req.body.nombre_sala;
        objCubi.capacidadSala = req.body.sala_capacidad;
        objCubi.idCine = req.body.id_cine;
        objCubi.tipoSala = req.body.id_tipo_sala;
        SalaDAO_1.default.grabeloYa(objCubi, res);
    }
    borraTuSala(req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "Y el codigo?" });
        }
        else {
            const codigo = Number(req.params.idSala);
            const objCubi = new Sala_1.default(codigo, "", 0, 0, 0);
            SalaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuSala(req, res) {
        const objCubi = new Sala_1.default(0, "", 0, 0, 0);
        objCubi.idSala = Number(req.body.id_sala);
        objCubi.nombreSala = String(req.body.nombre_sala);
        objCubi.capacidadSala = Number(req.body.sala_capacidad);
        objCubi.idCine = Number(req.body.id_cine);
        objCubi.tipoSala = Number(req.body.id_tipo_sala);
        SalaDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const salaControlador = new SalaControlador();
exports.default = salaControlador;
