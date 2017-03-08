import { Component } from '@angular/core';
import {EventEmitter,Output} from 'angular2/core';
import { NavController, NavParams, ModalController, ActionSheetController  } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { PostagemService } from '../../providers/postagem-service';

import { ImgModalPage } from '../img-modal/img-modal';
import { BuscaPage } from '../busca/busca';
import { PostagemPage } from '../postagem/postagem';
import { ProfilePage } from '../profile/profile';

@Component({
  selector: 'page-lista-postagem',
  templateUrl: 'lista-postagem.html'
})
export class ListaPostagemPage {

  buscaPage = BuscaPage;
  listaPostagem: any;
  retornoPost: any;
  private usuarioLogado: any = {};
  usuario: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public userData: UserData,
    public postagemService: PostagemService,
    public actionSheetCtrl: ActionSheetController
  ){

    this.init();
  }

  init(){
    this.userData.getUsuario().then((usuario) => {
      this.usuarioLogado = usuario;
    });

    this.usuario = this.navParams.get('usuario');

    this.postagemService.listaPostagemUsuario(this.usuario.id).subscribe(
      data => this.retornoPost = data,
      err => this.logError(err),
      () => this.buscaPostagemComplete()
    );
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.init();

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

  logError(err){
    console.log(err);
  }

  buscaPostagemComplete(){
    if(this.retornoPost != false){
      this.listaPostagem = this.retornoPost;
    }
  }

  presentProfileModal(postagem, numberSlide) {

    let imgNum = {postagem: postagem, imgNum: numberSlide}
    let profileModal = this.modalCtrl.create(ImgModalPage, imgNum);
    profileModal.present();

  }

  openPostagem(){
    let postagemModal = this.modalCtrl.create(PostagemPage);
    postagemModal.present();
  }

  cadastraCurtida(postagem,opcao){

    let curtida:any = {};
    curtida.id = {postagemId: postagem.id, usuarioId:this.usuarioLogado.id}
    curtida.usuario = this.usuarioLogado;
    curtida.postagem = postagem;
    curtida.opcao = opcao;

    this.postagemService.cadastraCurtida(curtida).subscribe(
      data => this.retornoPost = data,
      err => this.logError(err),
      () => this.curtidaComplete()
    );
  }

  curtidaComplete(){
    if(this.retornoPost != null){
      let curtida = this.retornoPost;
      for(let itemPost of this.listaPostagem) {
        if(itemPost.id == curtida.id.postagemId){
          if(curtida.opcao == 1){
            this.retiraVoto(itemPost.listaCurtidasOp2);
            this.adicionaVoto(itemPost.listaCurtidasOp1,curtida);
          }
          if(curtida.opcao == 2){
            this.retiraVoto(itemPost.listaCurtidasOp1);
            this.adicionaVoto(itemPost.listaCurtidasOp2,curtida);
          }
        }
      }
    }
  }

  retiraVoto(lista){
    let index = 0;
    for(let item of lista) {
      if(item.id.usuarioId == this.usuarioLogado.id){
        lista.splice(index, 1);
      }
      index++;
    }
  }

  adicionaVoto(lista,curtida){
    let adicionado = false;
    for(let item of lista) {
      if(item.id.usuarioId == curtida.id.usuarioId){
        adicionado = true;
      }
    }
    if(!adicionado){
      lista.push(curtida);
    }
  }

  isActive(postagem,opcao){
    if(opcao == 1){
      return this.isActiveAux(postagem.listaCurtidasOp1);
    }else{
      return this.isActiveAux(postagem.listaCurtidasOp2);
    }
  }

  isActiveAux(lista){
    for(let curtida of lista) {
      if(curtida.id.usuarioId == this.usuarioLogado.id){
        return true;
      }
    }
    return false;
  }

  openPerfil(item){
    this.navCtrl.push(ProfilePage, {idUsuario: item.id});
  }

  openMaisOpcoes() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
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
