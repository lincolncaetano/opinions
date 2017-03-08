import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform  } from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';

import { UserData } from '../../providers/user-data';

import { EditarPerfilPage } from '../editar-perfil/editar-perfil';
import { AlterarSenhaPage } from '../alterar-senha/alterar-senha';
import { UsuariosBloqueadosPage} from '../usuarios-bloqueados/usuarios-bloqueados';
import { IdiomaPage} from '../idioma/idioma';


@Component({
  selector: 'page-configuracoes',
  templateUrl: 'configuracoes.html'
})
export class ConfiguracoesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public plt: Platform,
    public userData: UserData) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfiguracoesPage');
  }

  openEditarPerfil() {
    let profileModal = this.modalCtrl.create(EditarPerfilPage);
    profileModal.present();
  }

  openAlterarSenha() {
    let alteraSenhaModal = this.modalCtrl.create(AlterarSenhaPage);
    alteraSenhaModal.present();
  }

  openUsuariosBloqueados() {
    this.navCtrl.push(UsuariosBloqueadosPage);
  }

  openIdioma() {
    let idiomaModal = this.modalCtrl.create(IdiomaPage);
    idiomaModal.present();
  }

  launch(url) {
    new InAppBrowser(url, '_system');
  }

  logout(){
    this.userData.logout();

    this.userData.hasLoggedIn().then((hasSeenTutorial) => {

      console.log(hasSeenTutorial);

    });
  }

}
