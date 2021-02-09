import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ActionService } from 'src/app/services/action/action.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  actions: any;
  collapseCard = true;
  collapseCardId: any;
  userConnected: User;

  constructor(
    public loginService: LoginService,
    public actionService: ActionService,
    private router: Router,
    private alertCtrl: AlertController,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.verifyIfUserIsConnected();
    this.getActions();
  }

  verifyIfUserIsConnected() {
    this.loginService.getUserStorage();
    if ( !this.loginService.userConnected.email ) {
      this.router.navigateByUrl('/login');
    }
  }

  collapseUpDown(action){
    action.collapseCard = !action.collapseCard;
  }

  getActions() {
    this.actionService.getActions().subscribe(res => {
      this.actions = res;
    });
  }

  async showToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async sendAction(maxValue, actionId, orders, index) {
    let addOrder = true;
    const alert = await this.alertCtrl.create({
      header: 'Vender Ação',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Quantidade',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Vender',
          handler: data => {
            if ( !data.amount || data.amount > maxValue ) {
              this.showToast("Quantidade inválida.");
            } else {
              if ( orders ) {
                orders.forEach(element => {
                  if ( element.userActionId == actionId && element.type === 'VENDA') {
                    this.showToast("Já existe ordem de venda aberta para esta ação.");
                    addOrder = false;
                  }
                });
              }
              if ( addOrder ) {
                if ( !orders ) orders = [];
                orders.push({
                  type: "VENDA",
                  userActionId: actionId,
                  amount: data.amount
                });
                this.loginService.userConnected.userActions[index-1].orders = orders;
                this.loginService.saveUserStorage();
              }
            }
          }
        }
      ]
    });
    alert.present();
  }

  setActionStorage(action, index) {
    sessionStorage.setItem('buyAction', JSON.stringify({
      action: action,
      index: index
    }));
    this.router.navigateByUrl('/buy');
  }

}
