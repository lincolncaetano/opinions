import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { TranslateModule , TranslateStaticLoader, TranslateLoader} from 'ng2-translate/ng2-translate';
import {HttpModule, Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { BuscaPage } from '../pages/busca/busca';
import { NotificacaoPage } from '../pages/notificacao/notificacao';
import { FeedPage } from '../pages/feed/feed';
import { ProfilePage } from '../pages/profile/profile';
import { ImgModalPage } from '../pages/img-modal/img-modal';
import { ConfiguracoesPage } from '../pages/configuracoes/configuracoes';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { AlterarSenhaPage } from '../pages/alterar-senha/alterar-senha';
import { UsuariosBloqueadosPage } from '../pages/usuarios-bloqueados/usuarios-bloqueados';
import { IdiomaPage } from '../pages/idioma/idioma';
import { PostagemPage } from '../pages/postagem/postagem';
import { CompartilharPage } from '../pages/compartilhar/compartilhar';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { Cadastro2Page } from '../pages/cadastro2/cadastro2';
import { ListaUsuarioPage } from '../pages/lista-usuario/lista-usuario';
import { ListaPostagemPage } from '../pages/lista-postagem/lista-postagem';

import { UserData } from '../providers/user-data';
import { UsuarioService } from '../providers/usuario-service';
import { PostagemService } from '../providers/postagem-service';
import { NotificacaoService } from '../providers/notificacao-service';

export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    BuscaPage,
    NotificacaoPage,
    FeedPage,
    ProfilePage,
    ImgModalPage,
    ConfiguracoesPage,
    EditarPerfilPage,
    AlterarSenhaPage,
    UsuariosBloqueadosPage,
    IdiomaPage,
    PostagemPage,
    CompartilharPage,
    LoginPage,
    CadastroPage,
    Cadastro2Page,
    ListaUsuarioPage,
    ListaPostagemPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    BuscaPage,
    NotificacaoPage,
    FeedPage,
    ProfilePage,
    ImgModalPage,
    ConfiguracoesPage,
    EditarPerfilPage,
    AlterarSenhaPage,
    UsuariosBloqueadosPage,
    IdiomaPage,
    PostagemPage,
    CompartilharPage,
    LoginPage,
    CadastroPage,
    Cadastro2Page,
    ListaUsuarioPage,
    ListaPostagemPage
  ],
  providers: [NotificacaoService, PostagemService, UsuarioService, UserData, Storage,{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
