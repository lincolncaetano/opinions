import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { Cadastro2Page } from '../cadastro2/cadastro2';


@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html'
})
export class CadastroPage {

  usuario = {};
  submitted = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {

  }

  onCadastro(form: NgForm) {
    this.submitted = true;
    if (form.valid) {
      this.navCtrl.push(Cadastro2Page, {usuario: this.usuario});
    }
  }

}
