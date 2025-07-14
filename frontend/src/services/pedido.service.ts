import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import {Pedido} from "../models/pedido-model"
import { map } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends BaseService {

    constructor(
        private http: HttpClient
    ) {
        super();
    }

    getPedidos() {
        return this.http.get<Pedido[]>(`${this.BASE_URL}/pedidos/`).pipe(
            map((pedidos) => )
        );
    }

    getPedidosByClienteId (id: number) {
        return this.http.get<>
    }

    getPedidoById(id: number): any {

    }

    create(pedido: any): void {

    }

    update(id: number, updatedPedido: any): void {

    }

    delete(id: number): void {

    }
}
