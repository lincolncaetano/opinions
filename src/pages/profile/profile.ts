import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

import { ConfiguracoesPage } from '../configuracoes/configuracoes';
import { ListaUsuarioPage } from '../lista-usuario/lista-usuario';
import { ListaPostagemPage } from '../lista-postagem/lista-postagem';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  configuracoesPage = ConfiguracoesPage;
  retornoUsuario: any;
  usuario: any = {};
  usuarioLogado: any;
  retornoUsuarioLogado : any;
  seguidores;
  seguidos;
  publicacoes;
  perfilAdmin = false;
  isSeguido = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userData: UserData,
    public usuarioService: UsuarioService,
    public actionSheetCtrl: ActionSheetController
  ) {

    this.userData.getUsuario().then((usuarioLog) => {
      this.usuarioService.pesquisaUsuarioPorId(usuarioLog.id).subscribe(
        data => this.retornoUsuarioLogado = data,
        err => this.logError(err),
        () => this.buscaUsuarioLogado()
      );
    });

    if(navParams.get('idUsuario') != null){
      this.usuarioService.pesquisaUsuarioPorId(navParams.get('idUsuario')).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.buscaUsuarioComplete()
      );
    }
    else{
      this.userData.getUsuario().then((usuarioLog) => {
        this.usuarioService.pesquisaUsuarioPorId(usuarioLog.id).subscribe(
          data => this.retornoUsuario = data,
          err => this.logError(err),
          () => this.buscaUsuarioComplete()
        );
      });
    }

  }

  buscaUsuarioLogado(){
    if(this.retornoUsuarioLogado != false){
      this.usuarioLogado = this.retornoUsuarioLogado;
    }
  }

  logError(err){
    console.log(err);
  }

  buscaUsuarioComplete(){
    if(this.retornoUsuario != false){
      this.usuario = this.retornoUsuario;
      this.publicacoes = this.usuario.listaPostagens.length;
      this.seguidores = this.usuario.listaUsuarioSeguem.length;
      this.seguidos = this.usuario.listaUsuariosSeguidos.length;
    }
    this.validaPerfil();
  }

  validaPerfil(){
    this.userData.getUsuario().then((usuarioLog) => {
      if(usuarioLog.id == this.usuario.id){
        this.perfilAdmin = true;
      }
    });
  }

  seguirUsuario(){

      let seguir ={
        id : {idUsuario: this.usuarioLogado.id, idUsuarioSeguido: this.usuario.id},
        usuario : {id: this.usuarioLogado.id},
        usuarioSeguido : this.usuario
      }

      this.usuarioService.seguirUsuario(seguir).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.seguirUsuarioComplete()
      );

  }

  seguirUsuarioComplete(){
    if(this.retornoUsuario != false){
      let jaAdd = false;
      for(let item of this.usuarioLogado.listaUsuariosSeguidos) {
        if(item.id.idUsuarioSeguido == this.usuario.id){
          jaAdd = true;
        }
      }
      if(!jaAdd){
        this.usuarioLogado.listaUsuariosSeguidos.push(this.retornoUsuario);
      }
    }
  }

  isSegue(){
    if(this.usuarioLogado != null){
      for(let item of this.usuarioLogado.listaUsuariosSeguidos) {
        if(item.id.idUsuarioSeguido == this.usuario.id){
          return true;
        }
      }
    }
    return false;
  }

  excluirSeguir(){
    this.usuarioService.excluirSeguir(this.usuarioLogado.id, this.usuario.id).subscribe(
      data => this.retornoUsuario = data,
      err => this.logError(err),
      () => this.excluirSeguirComplete()
    );
  }

  excluirSeguirComplete(){
    if(this.retornoUsuario != false){
      let index = 0;
      for(let item of this.usuarioLogado.listaUsuariosSeguidos) {
        if(item.id.idUsuarioSeguido == this.usuario.id){
          this.usuarioLogado.listaUsuariosSeguidos.splice(index, 1);
        }
        index++;
      }
    }
  }

  openMaisOpcoes() {

    let jaAdd = false;
    for(let item of this.usuarioLogado.listaUsuarioBloqueado) {
      if(item.id.idUsuarioBloqueado == this.usuario.id){
        jaAdd = true;
      }
    }
    if(jaAdd){
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Desbloquear',
            role: 'destructive',
            handler: () => {
              this.desbloquearUsuario();
            }
          },{
            text: 'Denunciar',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }else{
      let actionSheet = this.actionSheetCtrl.create({
        buttons: [
          {
            text: 'Bloquear',
            role: 'destructive',
            handler: () => {
              this.bloquearUsuario();
            }
          },{
            text: 'Denunciar',
            role: 'destructive',
            handler: () => {
              console.log('Destructive clicked');
            }
          },{
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }




  bloquearUsuario(){

    this.usuarioService.excluirSeguir(this.usuarioLogado.id, this.usuario.id).subscribe(
      data => this.retornoUsuario = data,
      err => this.logError(err),
      () => this.excluirSeguirComplete()
    );

    this.usuarioService.excluirSeguir(this.usuario.id, this.usuarioLogado.id).subscribe(
      data => this.retornoUsuario = data,
      err => this.logError(err),
      () => this.excluirSeguirComplete()
    );

      let bloqueado ={
        id : {idUsuario: this.usuarioLogado.id, idUsuarioBloqueado: this.usuario.id},
        usuario : {id: this.usuarioLogado.id},
        usuarioBloqueado : this.usuario
      }
      this.usuarioService.bloquearUsuario(bloqueado).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.bloquearUsuarioComplete()
      );
  }

  bloquearUsuarioComplete(){
    if(this.retornoUsuario != false){
      let jaAdd = false;
      for(let item of this.usuarioLogado.listaUsuarioBloqueado) {
        if(item.id.idUsuarioBloqueado == this.usuario.id){
          jaAdd = true;
        }
      }
      if(!jaAdd){
        this.usuarioLogado.listaUsuarioBloqueado.push(this.retornoUsuario);
      }
    }
  }

  desbloquearUsuario(){
    this.usuarioService.desbloquearUsurio(this.usuarioLogado.id, this.usuario.id).subscribe(
      data => this.retornoUsuario = data,
      err => this.logError(err),
      () => this.desbloquearUsuarioComplete()
    );
  }

  desbloquearUsuarioComplete(){
    if(this.retornoUsuario != false){
      let index = 0;
      for(let item of this.usuarioLogado.listaUsuarioBloqueado) {
        if(item.id.idUsuarioBloqueado == this.usuario.id){
          this.usuarioLogado.listaUsuarioBloqueado.splice(index, 1);
        }
        index++;
      }
    }
  }

  openListaUsuario(item, opcao){
    this.navCtrl.push(ListaUsuarioPage, {idUsuario: item.id, opcao: opcao});
  }

  openListaPostagem(item){
    this.navCtrl.push(ListaPostagemPage, {usuario: item});
  }

}
