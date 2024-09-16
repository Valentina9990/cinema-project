"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Servidor_1 = __importDefault(require("./config/api/Servidor"));
const myServidor = new Servidor_1.default();
myServidor.iniciar();
