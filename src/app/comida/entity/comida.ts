class comida {
    public idComida : number;
    public nombreComida: string;
    public precioComida: number;

    constructor(cod:number, nom:string, pre:number){
        this.idComida = cod;
        this.nombreComida = nom;
        this.precioComida = pre;
    }

}
export default comida;
