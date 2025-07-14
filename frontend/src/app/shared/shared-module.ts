import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import {InputTextModule} from "primeng/inputtext";
import {ProgressSpinnerModule} from 'primeng/progressspinner'
import { DropdownModule } from "primeng/dropdown";
import { FormsModule } from '@angular/forms';
import { TableModule } from "primeng/table";

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        ConfirmDialogModule,
        TableModule,
        DropdownModule,
        CardModule,
        ProgressSpinnerModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [MessageService, ConfirmationService],
    exports: [
        CommonModule,
        ButtonModule,
        InputTextModule,
        ToastModule,
        DropdownModule,
        TableModule,
        ConfirmDialogModule,
        CardModule,
        ProgressSpinnerModule,
        FormsModule,
        HttpClientModule,
    ]
})
export class SharedModule {}
