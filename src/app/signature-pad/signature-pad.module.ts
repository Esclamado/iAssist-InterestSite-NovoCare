import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WindowRef } from './window-ref.service';
import {DocumentRef} from './document-ref.service';

import { ArxSignaturePadComponent } from './signature-pad.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [ CommonModule, ReactiveFormsModule ],
    exports: [ ArxSignaturePadComponent ],
    declarations: [ ArxSignaturePadComponent ],
    providers: [ WindowRef, DocumentRef ]
})
export class ArxSignaturePadModule {
}

