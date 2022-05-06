import { Postagem } from "./Postagem";

export class Tema {
    public id: number;
    public categoria: string;
    public valor: string;
    public postagem: Postagem[];
}