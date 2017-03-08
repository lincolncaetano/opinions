import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../../providers/usuario-service';
import { UserData } from '../../providers/user-data';

import { TabsPage } from '../tabs/tabs';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuario = {};
  usuarioLogado = {};
  submitted = false;
  retornoUsuario;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioService: UsuarioService,
    public userData: UserData) {}

  ionViewDidLoad() {

  }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.usuarioService.login(this.usuario).subscribe(
        data =>this.retornoUsuario = data,
        err => this.logError(err),
        () => this.loginComplete()
      );
    }
  }

  logError(err){
    console.log(err);
  }

  loginComplete(){
    if(this.retornoUsuario != false){
      this.userData.login(this.retornoUsuario);
      this.userData.getUsuario().then((usuario) => {
        this.usuarioLogado = usuario;
        console.log(this.usuarioLogado);
      });
      console.log(this.usuarioLogado);
      this.navCtrl.push(TabsPage);
    }
  }

}
