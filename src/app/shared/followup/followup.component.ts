import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss']
})
export class FollowupComponent {
  @Input() selectedOption: any = '';
  @Input() selectedRecord: any = '';
  @Input() JobRun_id: any = '';
  @Input() status: any = [];
  public submitting: boolean = false;
  public comments: string = '';
  @Output() showTableEvent = new EventEmitter<boolean>();
  public active = 1;
  public showTable: boolean = true;
  private clearTimer: any;
  public historyData: any = [];
  public columnDefs: any = [];
  constructor(
    private API: WebapiService,
    public CF: CommonService
  ) { }
  public async submitComment() {
    if (!this.selectedOption) {
      this.CF.SwalWarning('Select one option');
      return
    }
    const user = await this.CF.userinfo();
    const payload = {
      "Action_id": (this.selectedRecord?.Action_id) ? this.selectedRecord['Action_id'] : 0,
      "JobRun_id": parseFloat(this.JobRun_id),
      "Rowid": (this.selectedRecord?.rowid) ? this.selectedRecord['rowid'] : (this.selectedRecord?.Rowid) ? (this.selectedRecord['Rowid']) : null,
      // "RowJsonData": encodeURIComponent(JSON.stringify(this.selectedRecord)),
      "RowJsonData": JSON.stringify(this.selectedRecord),
      "CurrentStatus": this.selectedOption,
      "UserLatestNotes": this.comments,
      "ADUsername": user.ADUsername,
      "LoggedInUsername": user.ADUsername
    }
    const path = 'DQ_User_Action/InsUpdUser_Action';
    this.submitting = true;
    this.API.postApis(path, payload)
      .then(res => {
        this.submitting = false;
        if (res.status) {
          this.showTableEvent.emit(false);
          this.CF.showSuccess(res.data)
        } else {
          this.CF.SwalError(res.error);
        }
      }).catch(() => {
        this.CF.SwalError('Something went wrong; Please try again.')
        this.submitting = false;
      })
  }
  public navChanged(event: any) {
    this.showTable = false;
    setTimeout(() => {
      if (this.active === 2) {
        const path = `DQ_User_Action/SelUserActionHistoryByRowID?Rowid=${this.selectedRecord['rowid']}`;
        this.API.getApis(path)
          .then(res => {
            this.bindData(res)
            this.showTable = true;
          }).catch(() => {
            this.showTable = true;
          })
      }
    });
  }
  private bindData(response: any) {
    this.historyData = [];
    this.columnDefs = [];
    if (response.status) {
      let { History_id, JobRun_id, RowsAffected, Action_id, ADUsername, Rowid, RowJsonData, ...headings } = response['data'][0];
      Object.keys(headings).forEach((key: any) => {
        this.columnDefs.push({ headerName: key.replace(/([a-z])([A-Z])/g, "$1 $2"), field: key })
      });
      if (this.clearTimer) {
        clearTimeout(this.clearTimer);
      }
      this.clearTimer = setTimeout(() => {
        this.historyData = JSON.parse(JSON.stringify(response['data']));
      });
    }
  }
}
