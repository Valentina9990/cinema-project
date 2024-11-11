"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const SalaRuta_1 = __importDefault(require("../../app/salas/route/SalaRuta"));
const comidaRuta_1 = __importDefault(require("../../app/comida/route/comidaRuta"));
const menu_cineRuta_1 = __importDefault(require("../../app/menu_cine/route/menu_cineRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndPoint();
    }
    cargarConfiguracion() {
        this.app.set("PORT", 3123);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        //tamaño maximo de archivo
        this.app.use(express_1.default.json({ limit: "50mb" }));
        //para que soporte la cantidad de caracteres URL
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    exponerEndPoint() {
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/meal", comidaRuta_1.default);
        this.app.use("/menu", menu_cineRuta_1.default);
    }
    iniciar() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Listo me fui", this.app.get("PORT"));
        });
    }
}
exports.default = Servidor;
