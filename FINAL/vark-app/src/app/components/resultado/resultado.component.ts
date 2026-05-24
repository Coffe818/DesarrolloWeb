import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, inject, Input, signal, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { TestService } from '../../shared/services/test.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-resultado',
  imports: [CommonModule, DatePipe],
  templateUrl: './resultado.component.html',
  styleUrl: './resultado.component.css',
})



export class ResultadoComponent {
  @ViewChild('graficaCanvas') graficaCanvas!: ElementRef;

  resultado = signal<ExamenPresentado | null>(null);
  chart: any;
  testService = inject(TestService);
  
  @Input() set idExamen(value: string) {
    if (value) {
      this.cargarResultado(value);
    }
  }

  cargarResultado(id: string) {
    this.testService.obtenerResultado(parseInt(id)).subscribe({
      next: (data) => {
        const resultado = data as ExamenPresentado;
        this.resultado.set(resultado);
        setTimeout(() => {
          this.renderGrafica(resultado);
        }, 10);
      }
    });
  }

  renderGrafica(data: ExamenPresentado) {
    if (this.chart) this.chart.destroy();

    const ctx = this.graficaCanvas.nativeElement.getContext('2d');
    
    if (data.resultado_jung) {
      this.renderJung(ctx, data.resultado_jung);
    } else if (data.resultado_vark) {
      this.renderVark(ctx, data.resultado_vark);
    }
  }

  private renderJung(ctx: any, res: ResultadoJung) {
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Introversión', 'Extraversión', 'Intuición', 'Sensación', 'Pensamiento', 'Sentimiento', 'Juicio', 'Percepción'],
        datasets: [{
          label: 'Perfil Jung',
          data: [res.i_count, res.e_count, res.n_count, res.s_count, res.t_count, res.f_count, res.j_count, res.p_count],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(54, 162, 235)',
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

  private renderVark(ctx: any, res: ResultadoVark) {
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Visual', 'Auditivo', 'Lectura/Escritura', 'Kinestésico'],
        datasets: [{
          label: 'Puntaje VARK',
          data: [res.v, res.a, res.r, res.k],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      }
    });
  }

  imprimirResultado() {
    const resultadoElement = document.getElementById('resultado');
    
    if (!resultadoElement) {
      console.error('No se encontró el elemento de resultado');
      return;
    }

    const resultado = this.resultado();
    if (!resultado) return;

    html2canvas(resultadoElement, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      let heightLeft = imgHeight;
      let position = 0;

      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL('image/png');

      while (heightLeft >= 0) {
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;
        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

      const fileName = `resultado_${resultado.examen.nombre.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
      pdf.save(fileName);
    }).catch((error) => {
      console.error('Error al generar PDF:', error);
      alert('Error al generar el PDF. Intenta de nuevo.');
    });
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