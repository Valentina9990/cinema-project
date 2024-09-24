"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const FuncionRuta_1 = __importDefault(require("../../app/funciones/route/FuncionRuta"));
const SalaRuta_1 = __importDefault(require("../../app/salas/route/SalaRuta"));
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.cargarConfiguracion();
        this.exponerEndpoint();
    }
    exponerEndpoint() {
        this.app.use("/room", SalaRuta_1.default);
        this.app.use("/shows", FuncionRuta_1.default);
    }
    cargarConfiguracion() {
        this.app.set("PORT", 3123);
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        //tamaño maximo archivo
        this.app.use(express_1.default.json({ limit: "50mb" }));
        //para que soporte la cantidad de caracteres URL
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    iniciar() {
        this.app.listen(this.app.get("PORT"), () => {
            //console.log("Listo me fui", this.app.get("PORT"));
            console.log(`Servidor iniciado en el puerto ${this.app.get("PORT")}`);
        });
    }
}
exports.default = Servidor;
