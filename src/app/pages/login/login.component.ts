import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/usuario.modelo';
import { AuthService } from 'src/app/services/auth.service';
import _swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: User= new User;
  recordarUsuario= false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if( localStorage.getItem('email' )){
      this.usuario.email= localStorage.getItem('email');
      this.recordarUsuario= true;
    }
  }


  login( formulario: NgForm){
    if( formulario.invalid){return;}
    
    _swal("Espere porfavor", "procesando", "info");
    /*Se puede poner un spiner dentro del swal, y terminarlo cuando se tiene la data
     Swal.showLoading(*); */
    
    this.auth.login(this.usuario).subscribe( resp=>{
      console.log(resp);
      //Aqui se finaliza el loagind Swal.close();
      if(this.recordarUsuario){
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');
    }, (err)=>{
      _swal( err.error.error.message, "Check the data", "error");
    });
  }

}
