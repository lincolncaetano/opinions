import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { CadastroPage } from '../cadastro/cadastro';
import { LoginPage } from '../login/login';
//import { UserData } from '../../providers/user-data';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loginPage = LoginPage;
  cadastroPage = CadastroPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) { }




}
