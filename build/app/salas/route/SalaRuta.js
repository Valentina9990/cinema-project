"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SalaControlador_1 = __importDefault(require("../controller/SalaControlador"));
class SalaRuta {
    constructor() {
        this.apiRutaSala = (0, express_1.Router)();
        this.apiRutaSala.get("/getall", SalaControlador_1.default.dameSalas);
    }
}
const salaRuta = new SalaRuta().apiRutaSala;
exports.default = salaRuta;
