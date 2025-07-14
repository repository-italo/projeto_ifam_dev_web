import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProdutosModule } from './components/produtos/list-produtos/list-produtos.component';
import { ClienteModule } from './components/cliente/cliente.component';
import { SharedModule } from './shared/shared-module';
import { CommonModule } from '@angular/common';
import { ListClientesModule } from './components/cliente/list-clientes/list-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    BrowserModule,
    ListProdutosModule,
    ClienteModule,
    ListClientesModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
