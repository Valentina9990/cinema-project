"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PeliculaDAO_1 = __importDefault(require("../dao/PeliculaDAO"));
class PeliculaControlador extends PeliculaDAO_1.default {
    damePeliculas(req, res) {
        PeliculaDAO_1.default.obtenerTodo([], res);
    }
}
const peliculaControlador = new PeliculaControlador();
exports.default = peliculaControlador;
