import { RespuestaModel } from "./respuesta.model";

export class PreguntaModel {
    pregunta_id: number = 0;
    texto?: string = '';
    respuestas: RespuestaModel[] = [];
}
