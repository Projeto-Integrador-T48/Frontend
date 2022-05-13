import { Tema } from "./Tema";
import { Usuario } from "./Usuario";

export class Postagem {
    public id: number;
    public titulo: string;
    public descricao: string;    
    public foto: string;
    public data: Date;
    public tema: Tema;
    public valor: string;
    public usuario: Usuario;
}
