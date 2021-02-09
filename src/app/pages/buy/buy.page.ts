import { Component, Input, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.page.html',
  styleUrls: ['./buy.page.scss'],
})
export class BuyPage implements OnInit {
  buyAction: {
    id?: number,
    amount?: number,
    value?: number
  } = {};
  actionInfo: any;
  totalValue = 0;
  form: FormGroup;

  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.verifyIfUserIsConnected();
    this.getActionStorage();
    this.form = new FormGroup({
      amount: new FormControl("", { validators: [Validators.required, Validators.min(1)]}),
      value: new FormControl("", { validators: [Validators.required, Validators.min(this.actionInfo.action.minValue), Validators.max(this.actionInfo.action.maxValue)]}),
    });
  }

  verifyIfUserIsConnected() {
    this.loginService.getUserStorage();
    if ( !this.loginService.userConnected.email ) {
      this.router.navigateByUrl('/login');
    }
  }

  getActionStorage() {
    let actionInfo = sessionStorage.getItem('buyAction');

    if ( !actionInfo ) {
      this.router.navigateByUrl('/home');
    }

    this.actionInfo = JSON.parse(actionInfo);
  }

  buy() {
    if ( this.form.valid ) {
      this.loginService.userConnected.userActions.forEach(element => {
        if ( element.actionId == this.actionInfo.action.id ) {
          element.actions.push({
            id: this.actionInfo.index+1,
            amount: this.form.get('amount').value,
            value: this.form.get('value').value
          });
        }
      });
    }
    this.loginService.saveUserStorage()
    sessionStorage.removeItem('buyAction');
    this.router.navigateByUrl('/home');
  }

  back() {
    this.router.navigateByUrl('/home');
  }

}
