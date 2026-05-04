import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms'; 
import { PreguntaModel } from '../../shared/models/pregunta.model';
import { RespuestaModel } from '../../shared/models/respuesta.model';
import { MatRadioModule } from '@angular/material/radio';

interface ExamenPregunta {
  pregunta: PreguntaModel;
  respuestas: RespuestaModel[];
}

@Component({
  selector: 'app-realizar-examen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './realizar-examen.component.html',
  styleUrls: ['./realizar-examen.component.css']
})
export class RealizarExamenComponent implements OnInit {

  examenCompleto: ExamenPregunta[] = [];
  preguntaActualIndex: number = 0;
  
  preguntaActual: PreguntaModel | null = null;
  respuestasActuales: RespuestaModel[] = [];
  respuestaControl = new FormControl(null);

  ngOnInit(): void {
    this.simularCargaExamen();
    this.cargarPreguntaActual();
  }

  simularCargaExamen(): void {
    this.examenCompleto = [
      {
        pregunta: { id: 1, examen_id: 1, texto: '¿Qué preferís hacer en tu tiempo libre?' },
        respuestas: [
          { id: 1, pregunta_id: 1, texto: 'Leer un libro o ver un documental', valor: 'R' },
          { id: 2, pregunta_id: 1, texto: 'Escuchar música o un podcast', valor: 'A' },
          { id: 3, pregunta_id: 1, texto: 'Salir a caminar y explorar', valor: 'K' },
          { id: 4, pregunta_id: 1, texto: 'Mirar una película o una serie', valor: 'V' }
        ]
      },
      {
        pregunta: { id: 2, examen_id: 1, texto: 'Cuando aprendés algo nuevo, ¿cómo te resulta más fácil?' },
        respuestas: [
          { id: 5, pregunta_id: 2, texto: 'Viendo diagramas y gráficos', valor: 'V' },
          { id: 6, pregunta_id: 2, texto: 'A través de la práctica, haciendo las cosas', valor: 'K' },
          { id: 7, pregunta_id: 2, texto: 'Leyendo el manual o los apuntes', valor: 'R' },
          { id: 8, pregunta_id: 2, texto: 'Escuchando la explicación de un profesor', valor: 'A' }
        ]
      },
      {
        pregunta: { id: 3, examen_id: 1, texto: 'Imaginá que estás armando un mueble, ¿qué hacés primero?' },
        respuestas: [
          { id: 9, pregunta_id: 3, texto: 'Leo las instrucciones paso a paso', valor: 'R' },
          { id: 10, pregunta_id: 3, texto: 'Miro los dibujos del manual', valor: 'V' },
          { id: 11, pregunta_id: 3, texto: 'Empiezo a ensamblar las piezas a ver qué pasa', valor: 'K' },
          { id: 12, pregunta_id: 3, texto: 'Le pido a alguien que me lo explique en voz alta', valor: 'A' }
        ]
      }
    ];
  }

  cargarPreguntaActual(): void {
    this.respuestaControl.reset();
    if (this.preguntaActualIndex < this.examenCompleto.length) {
      const data = this.examenCompleto[this.preguntaActualIndex];
      this.preguntaActual = data.pregunta;
      this.respuestasActuales = data.respuestas;
    } else {
      this.preguntaActual = null;
      this.respuestasActuales = [];
      console.log('¡Examen finalizado!');
    }
  }

  siguientePregunta(): void {
    const seleccionada = this.respuestaControl.value;
    if (seleccionada) {
      console.log('Respuesta seleccionada:', seleccionada);
    }
    this.preguntaActualIndex++;
    this.cargarPreguntaActual();
  }
}
