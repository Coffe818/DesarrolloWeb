import { Component, inject, Input, OnInit, signal, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PreguntaModel } from '../../shared/models/pregunta.model';
import { RespuestaModel } from '../../shared/models/respuesta.model';
import { MatRadioModule } from '@angular/material/radio';
import { TestService } from '../../shared/services/test.service';

class ExamenPregunta {
  descripcion: string = '';
  examen_id: number = 0;
  preguntas: PreguntaModel[] = [];
  tipo: string = '';
  nombre: string = '';
}

class ExamenRespondido {
  examen_id: number = 0;
  tipo: string = '';
  nombre: string = '';
  descripcion: string = '';
  preguntas: { pregunta_id: number; respuesta_id: number }[] = [];
}

@Component({
  selector: 'app-realizar-examen',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule],
  templateUrl: './realizar-examen.component.html',
  styleUrls: ['./realizar-examen.component.css'],
})
export class RealizarExamenComponent implements OnInit {
  examenCompleto: ExamenPregunta = new ExamenPregunta();
  preguntaActualIndex: number = 0;
  preguntaActual = signal<PreguntaModel | null>(null);
  respuestasActuales: RespuestaModel[] = [];
  esVark = signal(false);
  respuestaControl = new FormControl('');

  exmenFinal: ExamenRespondido = new ExamenRespondido();

  respuestasUsuario: (RespuestaModel | null)[] = [];
  testService = inject(TestService);

  @Input() set idTipo(value: string) {
    this.esVark.set(value === '1');
    this.generarExamen(value);
  }

  ngOnInit(): void {}

  generarExamen(tipo: string) {
    this.testService.generarExamen(tipo).subscribe({
      next: (data: any) => {
        this.examenCompleto = data;
        this.preguntaActualIndex = 0;
        this.respuestasUsuario = new Array(this.examenCompleto.preguntas.length).fill(null);
        this.exmenFinal.descripcion = this.examenCompleto.descripcion;
        this.exmenFinal.tipo = this.examenCompleto.tipo;
        this.exmenFinal.nombre = this.examenCompleto.nombre;
        this.exmenFinal.examen_id = this.examenCompleto.examen_id;
        this.cargarPreguntaActual();
      },
    });
  }

  cargarPreguntaActual(): void {
    if (this.preguntaActualIndex < this.examenCompleto.preguntas.length) {
      const data = this.examenCompleto.preguntas[this.preguntaActualIndex];
      this.preguntaActual.set(data);
      this.respuestasActuales = data.respuestas;

      const respuestaPrevia = this.exmenFinal.preguntas.find(
        (p) => p.pregunta_id === data.pregunta_id,
      );

      if (respuestaPrevia) {
        const valor = this.respuestasActuales.find(
          (r) => r.respuesta_id === respuestaPrevia.respuesta_id,
        );
        this.respuestaControl.setValue(valor as any);
      } else {
        this.respuestaControl.reset();
      }
      
    } else {
      this.preguntaActual.set(null);
      this.respuestasActuales = [];
      this.guardarExamenRespondido();
      console.log('¡Examen finalizado!');
    }
  }

  actualizarRespuestaLocal(): void {
    const preguntaId = this.preguntaActual()?.pregunta_id;
    const respuestaSeleccionada = this.respuestaControl.value as unknown as RespuestaModel;

    if (preguntaId && respuestaSeleccionada) {
      const index = this.exmenFinal.preguntas.findIndex((p) => p.pregunta_id === preguntaId);
      const datosRespuesta = {
        pregunta_id: preguntaId,
        respuesta_id: respuestaSeleccionada.respuesta_id,
      };

      if (index !== -1) {
        this.exmenFinal.preguntas[index] = datosRespuesta;
      } else {
        this.exmenFinal.preguntas.push(datosRespuesta);
      }
    }
  }

  siguientePregunta(): void {
    this.actualizarRespuestaLocal();
    this.preguntaActualIndex++;
    this.cargarPreguntaActual();
  }

  anteriorPregunta(): void {
    if (this.preguntaActualIndex > 0) {
      this.actualizarRespuestaLocal();
      this.preguntaActualIndex--;
      this.cargarPreguntaActual();
    }
  }

  guardarExamenRespondido(): void {
    this.testService.guardarExamen(this.exmenFinal).subscribe({
      next: (data) => {
        console.log('Examen guardado exitosamente:', data);
      },
      error: (error) => {
        console.error('Error al guardar el examen:', error);
      },
    });
  }
}
