import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServerSettings } from './server-settings';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

  private headers: Headers;

  constructor(public http:Http) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  login(usr): any {
    var url = ServerSettings.URL_SERVER+'/login';
    return this.http.post(url, JSON.stringify({usr : usr}), {headers: this.headers}).map(res => res.json());
  }

  cadastrarUsuario(usr): any {
    var url = ServerSettings.URL_SERVER+'/cadastraUsuario';
    return this.http.post(url, JSON.stringify({usuario : usr}), {headers: this.headers}).map(res => res.json());
  }

  alterarSenha(usr): any {
    var url = ServerSettings.URL_SERVER+'/alterarSenha';
    return this.http.post(url, JSON.stringify({usuario : usr}), {headers: this.headers}).map(res => res.json());
  }

  pesquisaUsuarioPorId(id): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuarioPorId/'+id;
    return this.http.get(url).map(res => res.json());
  }

  pesquisaUsuarioPorUsername(username): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuario/'+username;
    return this.http.get(url).map(res => res.json());
  }

  seguirUsuario(seguidor): any {
    var url = ServerSettings.URL_SERVER+'/seguirUsuario';
    return this.http.post(url, JSON.stringify({seguidor : seguidor}), {headers: this.headers}).map(res => res.json());
  }

  excluirSeguir(idUsuario, idUsuarioSeguido): any {
      var url = ServerSettings.URL_SERVER+'/unfollow/'+idUsuario+'/'+idUsuarioSeguido;
      return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

  listaSeguidores(id): any{
    var url = ServerSettings.URL_SERVER+'/listaSeguidores/'+id;
    return this.http.get(url).map(res => res.json());
  }

  listaSeguindo(id): any{
    var url = ServerSettings.URL_SERVER+'/listaSeguindo/'+id;
    return this.http.get(url).map(res => res.json());
  }

  bloquearUsuario(bloqueado): any {
    var url = ServerSettings.URL_SERVER+'/bloquearUsuario';
    return this.http.post(url, JSON.stringify({bloqueado : bloqueado}), {headers: this.headers}).map(res => res.json());
  }

  desbloquearUsurio(idUsuario, idUsuarioBloqueado): any {
      var url = ServerSettings.URL_SERVER+'/desbloquear/'+idUsuario+'/'+idUsuarioBloqueado;
      return this.http.delete(url,{headers: this.headers}).map(res => res.json());
  }

  pesquisaUsuariosBloqueados(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/pesquisaUsuariosBloqueados/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

}
