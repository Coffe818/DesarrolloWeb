import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../shared/services/http.service';
import { TestService } from '../../shared/services/test.service';

// Interfaces basadas en tu JSON para un tipado robusto
interface ExamenInfo {
  examen_id: number;
  tipo: string;
  nombre: string;
  descripcion: string;
}

interface Arquetipo {
  arquetipo_id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}

interface ResultadoVark {
  v: number;
  a: number;
  r: number;
  k: number;
  arquetipo: Arquetipo;
}

interface ExamenPresentado {
  examen_presentado_id: number;
  examen: ExamenInfo;
  usuario_id: number;
  grupo: string;
  fecha_creacion: string;
  estado: string;
  resultado_vark: ResultadoVark | null;
  resultado_jung: any | null;
}

@Component({
  selector: 'app-resultados',
  imports: [DatePipe],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent implements OnInit {
  listaExamenes: ExamenPresentado[] = [];
  testService = inject(TestService);
  private router = inject(Router);

  ngOnInit(): void {
    this.obtenerHistorial();
  }

  obtenerHistorial() {
    this.testService.obtenerHistorial().subscribe({
      next: (resp:any) => {
        this.listaExamenes = resp;
      },
      error: (err) => {
        console.error('Error al recuperar el historial', err);
      },
    });
  }

  verResultado(idPresentado: number) {
    // Redirige a la ruta encargada de renderizar las métricas y gráficas del resultado
    this.router.navigateByUrl(`/resultado-examen/${idPresentado}`);
  }
}
