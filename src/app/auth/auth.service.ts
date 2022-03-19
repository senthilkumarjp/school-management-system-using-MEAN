import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({providedIn: "root"})
export class AuthService {
private token:string;
private isAuthenticated = false;
private authStatusListener = new Subject<boolean>();

 constructor(private http: HttpClient, private router: Router) {}

 getToken(){
   return this.token;
 }

 getIsAuth(){
   return this.isAuthenticated;
 }

 getAuthStatusListener(){
   return this.authStatusListener.asObservable();
 }

 createUser(email: string, password:string){
   const authData: AuthData ={ email:email, password:password}
   this.http.post("http://localhost:3000/user/signup", authData)
   .subscribe(response =>{
     console.log(response)
   })
 }

login(email: string, password:string){
  const authData: AuthData ={ email:email, password:password}
  this.http.post<{token:string}>("http://localhost:3000/user/login", authData)
  .subscribe(response =>{
    const token = response.token;
    this.token= token;
    this.authStatusListener.next(true);
    this.router.navigate(['create']);
  })
}


logout(){
  this.token =null;
  this.isAuthenticated = false;
  this.authStatusListener.next(false);
  this.router.navigate(['login']);
}
}

