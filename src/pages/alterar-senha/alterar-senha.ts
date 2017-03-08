import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { UserData } from '../../providers/user-data';
import { UsuarioService } from '../../providers/usuario-service';

@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html'
})
export class AlterarSenhaPage {

  usuario: any = {};
  retornoUsuario: any;
  retornoCadastro: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public userData: UserData,
    public usuarioService: UsuarioService
  ) {

    this.userData.getId().then((id) => {
      this.usuarioService.pesquisaUsuarioPorId(id).subscribe(
        data => this.retornoUsuario = data,
        err => this.logError(err),
        () => this.buscaUsuarioComplete()
      );
    });

  }

  logError(err){
    console.log(err);
  }

  buscaUsuarioComplete(){
    if(this.retornoUsuario != false){
      this.usuario = this.retornoUsuario;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlterarSenhaPage');
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }

  salvarSenha(form: NgForm){

    if(this.usuario.novaSenha != this.usuario.confirmacao){
      alert("nova senha diferente");
    }else{
      this.usuarioService.alterarSenha(this.usuario).subscribe(
        data =>this.retornoCadastro = data,
        err => this.logError(err),
        () => this.salvarComplete()
      );
    }

  }

  salvarComplete(){
    if(this.retornoCadastro != false){
      this.usuario = this.retornoUsuario;
      this.dismiss();
    }
  }

}
