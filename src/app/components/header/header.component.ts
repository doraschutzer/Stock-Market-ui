import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {}

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }

}
