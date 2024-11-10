class Usuario {
    public idUsuario: number;
    public nombreUsuario: string;
    public apellidoUsuario: string;
    public contrasenaUsuario: string;
    public emailUsuario: string;
    public fechaCreacion: Date;
    public fechaNacimientoUsuario: Date;
    public idCine: number;
    public idCargo: number;

    constructor(cod: number, nom: string, ape: string, con: string, ema: string, fcr: Date, fna: Date, cin: number, car: number) {
        this.idUsuario = cod;
        this.nombreUsuario = nom;
        this.apellidoUsuario = ape;
        this.contrasenaUsuario = con;
        this.emailUsuario = ema;
        this.fechaCreacion = fcr;
        this.fechaNacimientoUsuario = fna;
        this.idCine = cin;
        this.idCargo = car;
    }
}

export default Usuario;
