import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-resultados',
  imports: [],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css',
})
export class ResultadosComponent {
  

  @Input() set idExamen(value: string) {
    console.log('ID del examen:', value);
  }

  
}
