import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public userConnected: User = {};
  constructor(private http: HttpClient) { }

  login() {
    return this.http.get<any>(`assets/mock/user.json`);
  }

  saveUserStorage() {
    sessionStorage.setItem('user', JSON.stringify(this.userConnected));
  }

  getUserStorage() {
    let storageUser = sessionStorage.getItem('user');
    this.userConnected = JSON.parse(storageUser);
  }

  logout() {
    sessionStorage.removeItem('user');
  }
}
