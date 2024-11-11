"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class menu {
    constructor(codMenu, codComi, codCine, codPre, disPo) {
        this.idMenuCine = codMenu;
        this.idComida = codComi;
        this.idCine = codCine;
        this.precio = codPre;
        this.disponibilidad = disPo;
    }
}
exports.default = menu;
