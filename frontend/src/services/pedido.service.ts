import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";
import {Pedido} from "../models/pedido-model";

@Injectable({
  providedIn: 'root',
})
export class PedidoService extends BaseService<Pedido> {

    constructor(http: HttpClient) {
        super(
            http,
            Pedido,
            "pedidos"
        );
    }
}
