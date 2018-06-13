import { socio } from "app/socio";
import { livro } from "app/livro";

export class reserva{
    idReserva: number;
    socio: socio;
    livro: livro;
    dataReserva: Date;
    ativa: boolean;
}