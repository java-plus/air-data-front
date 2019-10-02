import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string="admin";
  password:string="Admin44000;";

  constructor(private authService:AuthServiceService) { }

  ngOnInit() {
  }

  authentification(email:string,password:string){
    console.log("nomUtilisateur : " + email,"password : " +password)
    this.authService.authentification(email,password)

  }

}
