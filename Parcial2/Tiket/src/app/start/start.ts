import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './start.html',
  styleUrl: './start.css',
})
export class Start {}
