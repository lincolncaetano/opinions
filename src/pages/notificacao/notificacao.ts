import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { NotificacaoService } from '../../providers/notificacao-service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-notificacao',
  templateUrl: 'notificacao.html'
})
export class NotificacaoPage {

  retornoNotif: any;
  retorno: any;
  listaMotif = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public notificacaoService: NotificacaoService
  ) {
    
    this.userData.getUsuario().then((usuarioLog) => {
      this.notificacaoService.listaNotificaoUsuario(usuarioLog.id).subscribe(
        data => this.retornoNotif = data,
        err => this.logError(err),
        () => this.listaNotificaoComplete()
      );
    });

  }

  ionViewDidEnter(){

    let listnotP = [];
    for(let notificacao of this.listaMotif){
      if(notificacao.status == "P"){
        listnotP.push(notificacao);
      }
    }

    if(listnotP.length > 0){
      this.notificacaoService.atualizaNotificacao(listnotP)
      .subscribe(
        data => this.retorno = data,
        err => this.logError(err),
        () => this.atualizacaoComplete()
      );
    }
  }

  atualizacaoComplete(){
  }

  listaNotificaoComplete(){
    if(this.retornoNotif != false){
      this.listaMotif = this.retornoNotif;
    }
  }

  logError(err){
    console.log(err);
  }

  openPerfil(item){
    this.navCtrl.push(ProfilePage, {idUsuario: item.id});
  }


}
