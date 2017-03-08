import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-lista-usuario',
  templateUrl: 'lista-usuario.html'
})
export class ListaUsuarioPage {
  idUsuario : any;
  retornoUsuario: any;
  opcao: any;
  listaUsuario = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public usuarioService: UsuarioService,
  ) {
    this.idUsuario = navParams.get('idUsuario');
    this.opcao = navParams.get('opcao');

    if(this.opcao == 'seguidores'){
      this.usuarioService.listaSeguidores(navParams.get('idUsuario')).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.listaUsuarioComplete()
      );
    }else if(this.opcao == 'seguidos'){
      this.usuarioService.listaSeguindo(navParams.get('idUsuario')).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.listaUsuarioComplete()
      );
    }

  }

  listaUsuarioComplete(){
    if(this.retornoUsuario != false){
      this.listaUsuario = this.retornoUsuario;
    }
  }

  logError(err){
    console.log(err);
  }

  openPerfil(item){
    this.navCtrl.push(ProfilePage, {idUsuario: item.id});
  }



}
