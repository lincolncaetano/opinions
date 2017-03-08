import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-usuarios-bloqueados',
  templateUrl: 'usuarios-bloqueados.html'
})
export class UsuariosBloqueadosPage {

  listaBloqueados: any = [];
  retornoUsuarioLogado : any;
  retornoUsuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userData: UserData,
    public usuarioService: UsuarioService,
  ) {

    this.userData.getUsuario().then((usuarioLog) => {
      this.usuarioService.pesquisaUsuariosBloqueados(usuarioLog.id).subscribe(
        data => this.retornoUsuarioLogado = data,
        err => this.logError(err),
        () => this.buscaUsuarioLogado()
      );
    });

  }

  logError(err){
    console.log(err);
  }

  buscaUsuarioLogado(){
    if(this.retornoUsuarioLogado != false){
      this.listaBloqueados = this.retornoUsuarioLogado;
    }
  }

  desbloquearUsuario(usuario){

    this.userData.getUsuario().then((usuarioLog) => {
      this.usuarioService.desbloquearUsurio(usuarioLog.id, usuario.id).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.desbloquearUsuarioComplete()
      );
    });


  }

  desbloquearUsuarioComplete(){
    if(this.retornoUsuario != false){
      let index = 0;
      for(let item of this.listaBloqueados) {
        if(item.usuarioBloqueado.id == this.retornoUsuario.id.idUsuarioBloqueado){
          this.listaBloqueados.splice(index, 1);
        }
        index++;
      }
    }
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  openPerfil(item){
    this.navCtrl.push(ProfilePage, {idUsuario: item.id});
  }

}
