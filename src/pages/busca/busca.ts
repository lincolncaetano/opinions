import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html'
})
export class BuscaPage {

  searchQuery: string = '';
  items: any[];

  retornoUsuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public usuarioService: UsuarioService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscaPage');
  }

  initializeItems() {

    if(this.searchQuery != ''){
      this.usuarioService.pesquisaUsuarioPorUsername(this.searchQuery).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.buscaUsuarioComplete()
      );
    }else{
      this.items = [];
    }


 }

 logError(err){
   console.log(err);
 }

 buscaUsuarioComplete(){
   if(this.retornoUsuario != false){
     this.items = this.retornoUsuario;
   }
 }

 getItems(ev: any) {
    this.initializeItems();
  }

  openPerfil(item){
    this.navCtrl.push(ProfilePage, {idUsuario: item.id});
  }

}
