import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultado',
  imports: [],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css',
})



export class ResultadoComponent {
  

  @Input() set idExamen(value: string) {
    console.log('ID del examen:', value);
  }

  
}
export interface Examen {
  examen_id: number;
  tipo: 'JUNG' | 'VARK';
  nombre: string;
  descripcion: string;
}

export interface ArquetipoJung {
  arquetipo_id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface ResultadoJung {
  i_count: number;
  e_count: number;
  n_count: number;
  s_count: number;
  t_count: number;
  f_count: number;
  j_count: number;
  p_count: number;
  tipo_personalidad: string;
  arquetipo: ArquetipoJung;
}

export interface ResultadoVark {
  v: number;
  a: number;
  r: number;
  k: number;
  arquetipo: any | null;
}

export class ExamenPresentado {
  examen_presentado_id: number = 0;
  examen!: Examen;
  usuario_id: number | null = null;
  grupo: any | null = null;
  fecha_creacion: string = '';
  estado: string = '';
  
  resultado_vark: ResultadoVark | null = null;
  resultado_jung: ResultadoJung | null = null;
}