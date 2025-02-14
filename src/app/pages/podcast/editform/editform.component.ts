import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, shareReplay } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.scss']
})
export class EditformComponent implements OnInit {
  @Input() selectedPOD: any;
  @Output() formSubmmited = new EventEmitter<any>();
  public Form!: FormGroup;
  public submitted: boolean = false;
  public success: boolean = false;
  public isUpdate: boolean = false;
  public FormReset: boolean = false;
  public Categories$: Observable<any> | undefined;
  constructor(
    public API: WebapiService,
    private fb: FormBuilder,
    public CF: CommonService,
  ) { }
  ngOnInit() {
    this.Categories$ = this.API.getAPI('/GetPodCastCategories?StartRowIndex=0&PageSize=10', true).pipe(shareReplay(1));
    this.createForm();
    this.Form.patchValue({
      "podcastId": this.selectedPOD['PodcastId'],
      "title": this.selectedPOD['Title'],
      "description": this.selectedPOD['Description'],
      "podcastCategoryId": this.selectedPOD['PodcastCategoryId'],
      "code": this.selectedPOD['Code'],
      "publishedDatetime": this.selectedPOD['PublishedDatetime'],
      "goLiveDateTime": this.selectedPOD['GoLiveDateTime'],
      "source": this.selectedPOD['Source'],
      "authorId": this.selectedPOD['AuthorId'],
      "status": this.selectedPOD['Status'],
      "isVerified": this.selectedPOD['IsVerified'],
      // "updatedBy": this.selectedPOD['UpdatedBy'],
      "podcastTagId": this.selectedPOD['PodcastTagId'],
    })
  }
  private createForm() {
    this.FormReset = false;
    this.submitted = this.success = false;
    this.Form = this.fb.group({
      "podcastId": 0,
      "code": "",
      "title": ["", [Validators.required]],
      "description": ["", [Validators.required]],
      "podcastCategoryId": ["", [Validators.required]],
      "publishedDatetime": null,
      "goLiveDateTime": null,
      "source": "",
      "authorId": 0,
      "status": 0,
      "isVerified": 0,
      "updatedBy": "80ED3024-BAEC-4E92-A80F-04906B3EE251",
      "podcastTagId": 0
    });
    setTimeout(() => this.FormReset = true, 0);
  }
  public submit() {
    this.submitted = true;
    if (!this.Form.invalid) {
      const payload = this.Form.value;      
      this.success = true;
      const path = "UpdatePodcast";
      this.API.putApis(path, payload)
        .then((r: any) => {
          this.success = false;
          if (r.status) {
            this.CF.CloseModal();
            this.CF.SwalSuccess(r["data"]["Message"]);
            this.formSubmmited.emit('btnClick');
            return;
          }
          this.CF.SwalError(r.error, "Error!");
        })
        .catch((err) => {
          console.log(err);
          this.success = false;
          this.CF.SwalError("Something went wrong, Please try again");
        });
    }
  }
}
