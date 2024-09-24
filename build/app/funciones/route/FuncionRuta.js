"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FuncionControlador_1 = __importDefault(require("../controller/FuncionControlador"));
class FuncionRuta {
    constructor() {
        this.apiRutaFuncion = (0, express_1.Router)();
        this.apiRutaFuncion.get("/", FuncionControlador_1.default.getAll);
        this.apiRutaFuncion.post("/", FuncionControlador_1.default.add);
        this.apiRutaFuncion.delete("/:idFuncion", FuncionControlador_1.default.delete);
        this.apiRutaFuncion.put("/", FuncionControlador_1.default.update);
    }
}
const funcionRuta = new FuncionRuta().apiRutaFuncion;
exports.default = funcionRuta;
