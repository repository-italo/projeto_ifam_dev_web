import { Injectable } from "@angular/core";
import { Cliente } from "src/models/cliente-model";
import { BaseService } from "./base.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ClienteService extends BaseService<Cliente> {

    constructor(http: HttpClient) {
        super(
            http,
            Cliente,
            "clientes"
        );
     }
}
