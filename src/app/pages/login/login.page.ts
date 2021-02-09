import { Router, Routes } from '@angular/router';
import { LoginService } from './../../services/login/login.service';
import { User } from '../../interfaces/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: User = {};
  incorrectPassword = false;
  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  async login() {
    this.incorrectPassword = false;
    this.loginService.login().subscribe(response => {
      for ( let user of response ) {
        if ( user.email === this.user.email &&
          user.password === this.user.password ) {
          this.loginService.userConnected = user;
          this.loginService.saveUserStorage();
          this.router.navigateByUrl('/home');
        }
      }
      this.incorrectPassword = true;
    });
  }

}
