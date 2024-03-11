import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public Form!: FormGroup;
  public submitted!: boolean;
  public success!: boolean;

  constructor(
    private fb: FormBuilder,
    private API: WebapiService,
    private CF: CommonService
  ) { }
  ngOnInit(): void {
    this.submitted = this.success = false;
    this.Form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    if (location.host.includes('localhost')) {
      this.Form.patchValue({
        username: 'mobileuser',
        password: 'squadonly'
      })
    }
  }
  public submit() {
    this.submitted = true;
    if (!this.Form.invalid) {
      this.success = true;
      const { username, password } = this.Form.value;
      setTimeout(() => {
        this.API.Login(username, password)
          .then((r: any) => {
            if (r.status) {
              this.CF.SetLS$(this.CF.TokenUser, JSON.stringify(this.CF.Encrypt(r.data, this.CF.TokenUser)));
              this.Form.reset();
              this.CF.GotoURL('/dashboard') ;
              this.submitted = false;
              return
            }
            this.submitted = this.success = false;
            this.CF.SwalError(r.error, 'Error!');
          })
          .catch(err => {
            console.log(err);
            this.submitted = this.success = false;
            this.CF.SwalError('Something went wrong, Please try again')
          })
      });
    }
  }

}
