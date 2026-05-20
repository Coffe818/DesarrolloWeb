import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpService } from '../../shared/services/http.service';
import { TestService } from '../../shared/services/test.service';



@Component({
  selector: 'app-grupos',
  imports: [DatePipe],
  templateUrl: './grupos.component.html',
  styleUrl: './grupos.component.css',
})
export class GruposComponent  {

}
