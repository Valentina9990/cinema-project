"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_cine_1 = __importDefault(require("../entity/menu_cine"));
const menu_cineDao_1 = __importDefault(require("../dao/menu_cineDao"));
class menu_cineControlador extends menu_cineDao_1.default {
    dameMenu_cine(req, res) {
        menu_cineDao_1.default.obtenerTodo([], res);
    }
    cogeTuMenu(req, res) {
        const objCubi = new menu_cine_1.default(0, 0, 0, 0, true);
        objCubi.idMenuCine = req.body.idMenuCine;
        objCubi.idComida = req.body.idComida;
        objCubi.idCine = req.body.idCine;
        objCubi.precio = req.body.precio;
        objCubi.disponibilidad = req.body.disponibilidad;
        menu_cineDao_1.default.grabeloYa(objCubi, res);
    }
    borrarTuComida(req, res) {
        if (isNaN(Number(req.params.idMenuCine))) {
            res.status(400).json({ respuesta: "y el código mi vale?" });
        }
        else {
            const codiguito = Number(req.params.idMenuCine);
            const objCubi = new menu_cine_1.default(codiguito, 0, 0, 0, true);
            menu_cineDao_1.default.borreloYa(objCubi, res);
        }
    }
    actualizaTuMenu(req, res) {
        const nuevoPrecio = req.body.precio;
        menu_cineDao_1.default.actualizaloYa(nuevoPrecio, res);
    }
    obtenerMenuPaginadas(req, res) {
        const limit = Number(req.query.limit) || 10; // canditad de filas a mostras
        const offset = Number(req.query.offset) || 0; // desde que fila empezar
        menu_cineDao_1.default.MenuPaginadas(limit, offset, res);
    }
}
const menu_CineControlador = new menu_cineControlador();
exports.default = menu_CineControlador;
