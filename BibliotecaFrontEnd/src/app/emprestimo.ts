import { pessoa } from "app/pessoa";
import { livro } from "app/livro";

export class emprestimo{
    _idEmprestimo: number;
    socio: pessoa;
    livro: livro;
    status: string;
    ativo: boolean;
    dataReserva: Date;
    dataEmprestimo: Date;
    dataRetorno: Date;
    dataDevolucao: Date; 
}