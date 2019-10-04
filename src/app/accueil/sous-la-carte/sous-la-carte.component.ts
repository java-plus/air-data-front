import { Component, OnInit } from '@angular/core';
import { CarteService } from 'src/app/services/carte.service';
import { Observable } from 'rxjs';
import { MesureMeteo } from 'src/app/model/MesureMeteo';



@Component({
  selector: 'app-sous-la-carte',
  templateUrl: './sous-la-carte.component.html',
  styleUrls: ['./sous-la-carte.component.scss']
})
export class SousLaCarteComponent implements OnInit {

  mesuresPollution = this.carteService.subMesuresPollutionCommuneConcerne;
  mesuresMeteo:MesureMeteo;
  constructor(private carteService:CarteService) { }

  ngOnInit() {
    this.carteService.subMesuresMeteoCommuneConcerne.subscribe((data)=>this.mesuresMeteo=data);
  }

}
