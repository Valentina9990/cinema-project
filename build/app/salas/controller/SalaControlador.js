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
        objCubi.idSala = req.body.idSala;
        objCubi.nombreSala = req.body.nombreSala;
        objCubi.capacidad = req.body.capacidad;
        objCubi.idCine = req.body.idCine;
        objCubi.idTipoSala = req.body.idTipoSala;
        SalaDAO_1.default.grabeloYa(objCubi, res);
    }
    borrarTuSala(req, res) {
        if (isNaN(Number(req.params.idSala))) {
            res.status(400).json({ respuesta: "y el codigo mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idSala);
            const objCubi = new Sala_1.default(codiguito, "", 0, 0, 0);
            SalaDAO_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuSala(req, res) {
        const objCubi = new Sala_1.default(0, "", 0, 0, 0);
        objCubi.idSala = req.body.idSala;
        objCubi.nombreSala = req.body.nombreSala;
        objCubi.capacidad = req.body.capacidad;
        objCubi.idCine = req.body.idCine;
        objCubi.idTipoSala = req.body.idTipoSala;
        SalaDAO_1.default.actualiceloYa(objCubi, res);
    }
}
const salaControlador = new SalaControlador();
exports.default = salaControlador;
