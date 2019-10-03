import { Component, OnInit } from '@angular/core';
import { FavorisService } from '../services/favoris.service';
@Component({
  selector: 'app-liste-favoris',
  templateUrl: './liste-favoris.component.html',
  styleUrls: ['./liste-favoris.component.scss']
})
export class ListeFavorisComponent implements OnInit {


  listeFavoris = [];


  constructor(private favoriService: FavorisService) { }



  ngOnInit() {
    this.listeFavoris = this.favoriService.listeFavoris;
  }

}
