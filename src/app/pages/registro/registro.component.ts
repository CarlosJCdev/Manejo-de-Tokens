
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/usuario.modelo';
import { AuthService } from 'src/app/services/auth.service';
import _swal from 'sweetalert';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: User;
  recordarmeUsuario: false;

  constructor(private autenticacion: AuthService, private router: Router) { }

  ngOnInit() { 
    this.usuario= new User;
    this.usuario.email= 'carlos';
  }
  enter( formulario: NgForm){
    if( formulario.invalid){return;}

    _swal("Espere porfavor", "procesando", "info");
    /*Se puede poner un spiner dentro del swal, y terminarlo cuando se tiene la data
     Swal.showLoading(*); */
    
    this.autenticacion.registerUser(this.usuario).subscribe(rest=>{
      console.log(rest);
      //Aqui se finaliza el loagind Swal.close();
      if(this.recordarmeUsuario){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err)=>{
      _swal( err.error.error.message, "Check the data", "error");
    });
  }
}
