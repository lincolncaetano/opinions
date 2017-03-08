import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServerSettings } from './server-settings';
import 'rxjs/add/operator/map';

@Injectable()
export class PostagemService {

  private headers: Headers;

  constructor(public http:Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  listaPostagemUsuario(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/listaPostagemUsuario/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

  listaPostagem(): any{
    var url = ServerSettings.URL_SERVER+'/postagem/lista';
    return this.http.get(url).map(res => res.json());
  }

  postagemNova(postagem): any {
    var url = ServerSettings.URL_SERVER+'/postagemNova';
    return this.http.post(url, JSON.stringify({postagem : postagem}), {headers: this.headers}).map(res => res.json());
  }

  cadastraCurtida(curtida): any {
    var url = ServerSettings.URL_SERVER+'/cadastraCurtida';
    return this.http.post(url, JSON.stringify({curtida : curtida}), {headers: this.headers}).map(res => res.json());
  }

}
