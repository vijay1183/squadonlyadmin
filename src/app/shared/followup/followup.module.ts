import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FollowupComponent } from './followup.component';
import { FormsModule } from '@angular/forms';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbNavModule, NgbAlertModule, NgIf,
    DataTablesModule
  ],
  declarations: [FollowupComponent],
  exports: [FollowupComponent]
})
export class FollowupModule { }
