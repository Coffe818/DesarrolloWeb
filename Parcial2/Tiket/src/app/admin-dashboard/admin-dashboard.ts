import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { TicketService } from '../../shared/service/TicketService.service';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header';
import { Ticket } from '../../shared/models/ticket.model';

// Registrar componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit, AfterViewInit {
  ticketService = inject(TicketService);

  @ViewChild('pastelChart') pastelChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barResueltosChart') barResueltosChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barPendientesChart') barPendientesChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('barTotalChart') barTotalChartRef!: ElementRef<HTMLCanvasElement>;

  // Estadísticas
  totalResueltos = signal<number>(0);
  totalPendientes = signal<number>(0);
  totalGeneral = signal<number>(0);

  // Porcentajes
  porcentajeResueltos = signal<string>('0%');
  porcentajePendientes = signal<string>('0%');

  // Tickets cargados
  allTickets: Ticket[] = [];

  // Charts
  private pastelChart?: Chart;
  private barResueltosChart?: Chart;
  private barPendientesChart?: Chart;
  private barTotalChart?: Chart;

  ngOnInit() {
    // Cargar todos los tickets (sin paginación para el dashboard)
    this.loadAllTickets();
  }

  ngAfterViewInit() {
    // Los gráficos se crean después de cargar los datos
  }

  loadAllTickets() {
    // Cargar múltiples páginas hasta tener todos los tickets
    this.loadTicketsPage(1);
  }

  private loadTicketsPage(page: number) {
    this.ticketService.cargarTickets(page);
    
    // Esperar a que se carguen los datos
    setTimeout(() => {
      const tickets = this.ticketService.tickets();
      const currentPage = this.ticketService.currentPage();
      const totalPages = this.ticketService.totalPages();

      // Acumular tickets
      this.allTickets = [...this.allTickets, ...tickets];

      if (currentPage < totalPages) {
        // Cargar siguiente página
        this.loadTicketsPage(currentPage + 1);
      } else {
        // Ya cargamos todos, calcular estadísticas
        this.calculateStats();
        // Crear gráficos
        setTimeout(() => this.createCharts(), 100);
      }
    }, 500);
  }

  calculateStats() {
    const resueltos = this.allTickets.filter(t => t.estatus_ticket === 'RESUELTO').length;
    const pendientes = this.allTickets.filter(t => t.estatus_ticket === 'PENDIENTE').length;
    const total = this.allTickets.length;

    this.totalResueltos.set(resueltos);
    this.totalPendientes.set(pendientes);
    this.totalGeneral.set(total);

    // Calcular porcentajes
    if (total > 0) {
      const pctResueltos = Math.round((resueltos / total) * 100);
      const pctPendientes = Math.round((pendientes / total) * 100);
      this.porcentajeResueltos.set(`${pctResueltos}%`);
      this.porcentajePendientes.set(`${pctPendientes}%`);
    } else {
      this.porcentajeResueltos.set('0%');
      this.porcentajePendientes.set('0%');
    }
  }

  createCharts() {
    this.createPastelChart();
    this.createBarCharts();
  }

  createPastelChart() {
    if (!this.pastelChartRef?.nativeElement) return;

    const ctx = this.pastelChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    this.pastelChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Resueltos', 'Pendientes'],
        datasets: [{
          data: [this.totalResueltos(), this.totalPendientes()],
          backgroundColor: ['#28a745', '#ffc107'],
          borderColor: ['#ffffff', '#ffffff'],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Estado de Tickets',
            font: { size: 16 }
          }
        }
      }
    });
  }

  createBarCharts() {
    // Agrupar por municipio
    const statsPorMunicipio = this.groupByMunicipio();

    const municipios = Object.keys(statsPorMunicipio);
    const resueltos = municipios.map(m => statsPorMunicipio[m].resueltos);
    const pendientes = municipios.map(m => statsPorMunicipio[m].pendientes);
    const totales = municipios.map(m => statsPorMunicipio[m].total);

    // Gráfico de resueltos por municipio
    if (this.barResueltosChartRef?.nativeElement) {
      const ctx = this.barResueltosChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.barResueltosChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: municipios,
            datasets: [{
              label: 'Tickets Resueltos',
              data: resueltos,
              backgroundColor: '#28a745',
              borderColor: '#28a745',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Tickets Resueltos por Municipio',
                font: { size: 14 }
              }
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
          }
        });
      }
    }

    // Gráfico de pendientes por municipio
    if (this.barPendientesChartRef?.nativeElement) {
      const ctx = this.barPendientesChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.barPendientesChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: municipios,
            datasets: [{
              label: 'Tickets Pendientes',
              data: pendientes,
              backgroundColor: '#ffc107',
              borderColor: '#ffc107',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Tickets Pendientes por Municipio',
                font: { size: 14 }
              }
            },
            scales: {
              y: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
          }
        });
      }
    }

    // Gráfico de total por municipio
    if (this.barTotalChartRef?.nativeElement) {
      const ctx = this.barTotalChartRef.nativeElement.getContext('2d');
      if (ctx) {
        this.barTotalChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: municipios,
            datasets: [{
              label: 'Total Tickets',
              data: totales,
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderWidth: 1
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: 'Total Tickets por Municipio',
                font: { size: 14 }
              }
            },
            scales: {
              x: { beginAtZero: true, ticks: { stepSize: 1 } }
            }
          }
        });
      }
    }
  }

  groupByMunicipio(): { [municipio: string]: { resueltos: number, pendientes: number, total: number } } {
    const result: { [municipio: string]: { resueltos: number, pendientes: number, total: number } } = {};

    for (const ticket of this.allTickets) {
      const mun = ticket.municipio || 'Sin municipio';
      if (!result[mun]) {
        result[mun] = { resueltos: 0, pendientes: 0, total: 0 };
      }
      result[mun].total++;
      if (ticket.estatus_ticket === 'RESUELTO') {
        result[mun].resueltos++;
      } else {
        result[mun].pendientes++;
      }
    }

    return result;
  }

  ngOnDestroy() {
    // Limpiar gráficos al destruir el componente
    this.pastelChart?.destroy();
    this.barResueltosChart?.destroy();
    this.barPendientesChart?.destroy();
    this.barTotalChart?.destroy();
  }
}
