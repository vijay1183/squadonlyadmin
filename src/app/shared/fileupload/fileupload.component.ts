import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
import Swal from "sweetalert2";
@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent {
  @ViewChild('fileuploadDiv', { static: false }) public filediv: ElementRef | undefined;
  @Input() title: string = 'Upload Thumbnail';
  @Input() podcast: any = '';
  @Input() attachments = [];
  @Output() fileuploads = new EventEmitter();
  public submiting: boolean = false;
  public progress: number = 0;
  public uploadedImages: { imageData: string | ArrayBuffer; url: string; uuid: string }[] = new Array();
  constructor(
    private CF: CommonService,
    private API: WebapiService
  ) {
    setTimeout(() => {
      if (this.attachments && this.attachments.length > 0) {
        this.uploadedImages = this.attachments;
      }
    });
  }
  public async uploadImg(event: any) {
    if (event.target.files[0].size > 10000000) {
      this.CF.SwalWarning('Each File should be less than', '10 MB of size.');
      return;
    }
    this.API.UploadFile(event.target.files[0], this.podcast['PodcastId'])
      .pipe(
        map((event: any) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              of(Math.round((event.loaded * 100) / event.total))
                .subscribe(
                  progress => this.progress = progress
                );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return of(error);
        })
      )
      .subscribe((evt: any) => {       
        if (typeof evt === 'object') {
          this.progress = 0;
          if (evt.body) {
            this.submiting = false;
            const file = event.target.files && event.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                const obj = {
                  imageData: (<FileReader>event.target).result,
                  url: evt.body,
                  uuid: `uuid${Math.floor(1000 + Math.random() * 9000)}`
                }
                // this.uploadedImages.push(obj);
                // this.filediv.nativeElement.value = '';
                return this.fileuploads.emit(Object.assign({ action: 'add' }, obj));
              };
            }
            return
          }
          this.CF.SwalError('Something went wrong, please try again.')
          this.submiting = false;
        }
      });
  }
  public DownloadFile(linkSource: any) {    
    Swal.fire({
      title: "",
      imageUrl: (linkSource['imageData']) ? linkSource['imageData'] : linkSource['url'],
      // imageHeight: 1500,
      imageAlt: "image"
    });
  }
  public Delete(file: { imageData: string | ArrayBuffer; url: string; uuid: string }) {
    Swal.fire({
      title: "",
      imageUrl: file['url'],
      text: "Are you sure? Want to delete this image?",
      // icon: "warning",
      showCancelButton: true,
      confirmButtonText: "&nbsp; &nbsp; Yes! &nbsp; &nbsp; ",
      cancelButtonText: "No, Continue",
    }).then((result) => {
      if (result.value) {
        // file['action'] = 'delete';
        this.uploadedImages = this.uploadedImages.filter(x => x['uuid'] !== file['uuid']);
        return this.fileuploads.emit(file);
      }
    });
  }
}
