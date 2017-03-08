import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { ServerSettings } from './server-settings';
import 'rxjs/add/operator/map';

@Injectable()
export class NotificacaoService {

  private headers: Headers;

  constructor(public http:Http) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Accept', 'application/json');
  }

  listaNotificaoUsuario(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/listaNotificaoUsuario/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

  listaNotificaoPendentesUsuario(idUsuario): any{
    var url = ServerSettings.URL_SERVER+'/listaNotificaoPendentesUsuario/'+idUsuario;
    return this.http.get(url).map(res => res.json());
  }

  salvaNotificao(notificacao): any {
    var url = ServerSettings.URL_SERVER+'/salvaNotificao';
    return this.http.post(url, JSON.stringify({notificacao : notificacao}), {headers: this.headers}).map(res => res.json());
  }

  atualizaNotificacao(listaNotificacao): any {
      var url = ServerSettings.URL_SERVER+'/atualizaNotificacao';
      return this.http.post(url, JSON.stringify({listaNotif : listaNotificacao}), {headers: this.headers}).map(res => res.json());
  }

}
