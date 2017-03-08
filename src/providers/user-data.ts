import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@Injectable()
export class UserData {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(public events: Events, public storage: Storage) {}

  login(usuario) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setId(usuario.id);
    this.setUsuario(usuario.id, usuario.username);
    this.events.publish('user:login');
  }

  signup(id) {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setId(id);
    this.events.publish('user:signup');
  }

  logout() {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('idUsuario');
    this.storage.remove('usuario');
    this.events.publish('user:logout');
  }

  setId(id) {
    this.storage.set('idUsuario', id);
  }

  setUsuario(id,username) {
    let usuario = {id: id, username: username}
    this.storage.set('usuario', usuario);
  }

  getUsuario() {
    return this.storage.get('usuario').then((value) => {
      if(value == null){
        return null;
      }
      return value;
    });
  }

  getId() {
    return this.storage.get('idUsuario').then((value) => {
      if(value == null){
        return null;
      }
      return value;
    });
  }

  // return a promise
  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}
