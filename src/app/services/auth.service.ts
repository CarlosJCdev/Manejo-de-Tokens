import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/usuario.modelo';
import { map } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url= 'https://identitytoolkit.googleapis.com/v1';
  private apiKey= 'AIzaSyAGnCdFZAursf8wIaaulIDRKKGloOav2yE';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
   }


   logout(){
    localStorage.removeItem('token');
   }


   login(usuario: User){
    const authData= {
      /* email: usuario.correo,
      password: usuario.password, 
      Estos dos son lo mismo, con el operador spread*/
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
      authData
    ).pipe(map(resp=>{
      console.log('Entro en el mapa del RXJS');
      this.guardarToken(resp['idToken']);
      return resp;
    }));
   }



   registerUser(usuario: User){
    const authData= {
      /* email: usuario.correo,
      password: usuario.password, 
      Estos dos son lo mismo, con el operador spread*/
      ...usuario,
      returnSecureToken: true
    };
    return this.http.post(
      `${ this.url}/accounts:signUp?key=${this.apiKey}`,
      authData
    ).pipe(map(resp=>{
      console.log('Entro en el mapa del RXJS');
      this.guardarToken(resp['idToken']);
      return resp;
    }));
   }



   private guardarToken(idToken: string){
    this.userToken= idToken;
    localStorage.setItem('token', idToken);
    //Validación de expiración de token, el token solo dura una hora
    let fecha= new Date();
    fecha.setSeconds(3600);
    localStorage.setItem('expira', fecha.getTime().toString());
     }

   private leerToken(){
     if(localStorage.getItem('token')){
       this.userToken= localStorage.getItem('token');
     }else{
       this.userToken=('');
     }
     return this.userToken;
   }

   estaAutenticado(): boolean{
    if(this.userToken.length < 2){
      return false;
    }
    const expira= Number(localStorage.getItem('expira'));
    const expirafecha= new Date();
    expirafecha.setTime(expira);

    if(expirafecha > new Date()){
      return true;
    }else{
      return false;
    }
   }
}
