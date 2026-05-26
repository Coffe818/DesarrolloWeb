import { CommonModule,  } from '@angular/common';
import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { TestService } from '../../shared/services/test.service';

@Component({
  selector: 'app-grupos',
  imports: [CommonModule, ],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css',
})
export class GruposComponent {
  @ViewChild('graficaVarkCanvas') graficaVarkCanvas!: ElementRef;
  @ViewChild('graficaJungCanvas') graficaJungCanvas!: ElementRef;

  examenesGrupo = signal<ExamenesGrupo | null>(null);
  grupoSeleccionado = signal<string>('');
  chartVark: any;
  chartJung: any;
  testService = inject(TestService);

  onGrupoChange(evento: Event) {
    const target = evento.target as HTMLSelectElement;
    const grupo = target.value;
    this.grupoSeleccionado.set(grupo);
    if (grupo) {
      this.cargarExamenesGrupo(grupo);
    }
  }

  tieneDataVark(): boolean {
    const data = this.examenesGrupo();
    if (!data || !data.resultado_vark) return false;
    return data.resultado_vark.v > 0 || data.resultado_vark.a > 0 || 
           data.resultado_vark.r > 0 || data.resultado_vark.k > 0;
  }

  tieneDataJung(): boolean {
    const data = this.examenesGrupo();
    if (!data || !data.resultado_jung) return false;
    return (data.resultado_jung.i_count > 0 || data.resultado_jung.e_count > 0 || 
            data.resultado_jung.n_count > 0 || data.resultado_jung.s_count > 0 || 
            data.resultado_jung.t_count > 0 || data.resultado_jung.f_count > 0 || 
            data.resultado_jung.j_count > 0 || data.resultado_jung.p_count > 0) 
            && data.resultado_jung.arquetipo !== null;
  }

  cargarExamenesGrupo(grupo: string) {
    this.testService.obtenerExamenesGrupo(grupo).subscribe({
      next: (data) => {
        const resultado = data as ExamenesGrupo;
        this.examenesGrupo.set(resultado);
        setTimeout(() => {
          this.renderGraficas(resultado);
        }, 10);
      }
    });
  }

  renderGraficas(data: ExamenesGrupo) {
    if (data.resultado_vark) {
      this.renderVark(data.resultado_vark);
    }
    if (data.resultado_jung) {
      this.renderJung(data.resultado_jung);
    }
  }

  private renderVark(res: ResultadoVark) {
    if (this.chartVark) this.chartVark.destroy();

    const ctx = this.graficaVarkCanvas.nativeElement.getContext('2d');
    this.chartVark = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Visual', 'Auditivo', 'Lectura/Escritura', 'Kinestésico'],
        datasets: [{
          label: 'Puntaje VARK',
          data: [res.v, res.a, res.r, res.k],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true
      }
    });
  }

  private renderJung(res: ResultadoJung) {
    if (this.chartJung) this.chartJung.destroy();

    const ctx = this.graficaJungCanvas.nativeElement.getContext('2d');
    this.chartJung = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Introversión', 'Extraversión', 'Intuición', 'Sensación', 'Pensamiento', 'Sentimiento', 'Juicio', 'Percepción'],
        datasets: [{
          label: 'Perfil Jung',
          data: [res.i_count, res.e_count, res.n_count, res.s_count, res.t_count, res.f_count, res.j_count, res.p_count],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          r: {
            max: 5,
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 11
              }
            },
            pointLabels: {
              font: {
                size: 12,
                weight: 'bold'
              }
            }
          }
        }
      }
    });
  }
}

export interface Arquetipo {
  arquetipo_id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
}

export interface ResultadoVark {
  v: number;
  a: number;
  r: number;
  k: number;
  arquetipo: Arquetipo;
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
  arquetipo: Arquetipo;
}

export interface ExamenesGrupo {
  grupo: string;
  resultado_vark: ResultadoVark;
  resultado_jung: ResultadoJung;
}
