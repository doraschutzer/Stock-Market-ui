import { LoginPageModule } from './../login/login.module';
import { AppModule } from './../../app.module';
import { HeaderComponent } from './../../components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: true,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    LoginPageModule,
    NgxMaskModule.forRoot(maskConfig),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    HomePage
  ]
})
export class HomePageModule {}
