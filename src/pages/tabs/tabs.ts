import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NotificacaoPage } from '../notificacao/notificacao';
import { FeedPage } from '../feed/feed';
import { ProfilePage } from '../profile/profile';

import { UserData } from '../../providers/user-data';
import { NotificacaoService } from '../../providers/notificacao-service';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = FeedPage;
  tab2Root: any = NotificacaoPage;
  tab3Root: any = ProfilePage;

  retornoNotif: any;
  public listaNotif = [];
  public nNotif = 0;

  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    public notificacaoService: NotificacaoService

  ) {

    this.userData.getUsuario().then((usuarioLog) => {
      this.notificacaoService.listaNotificaoPendentesUsuario(usuarioLog.id).subscribe(
        data => this.retornoNotif = data,
        err => this.logError(err),
        () => this.listaNotificaoComplete()
      );
    });

  }

  listaNotificaoComplete(){
    if(this.retornoNotif != false){
      this.listaNotif = this.retornoNotif;
      this.nNotif = this.listaNotif.length;
    }
  }

  logError(err){
    console.log(err);
  }

  zeraNotf(){
    this.nNotif = 0;
  }

}
