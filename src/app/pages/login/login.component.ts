import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: any = FormGroup;
  strMsg: string;
  submitted = false;

  constructor(private _authService: AuthService, private _httpService: HttpService, private _formBuilder: FormBuilder,
    private _toastrService: ToastrService) {
    this.strMsg = "";
    this._authService.logout();
  }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.formGroup = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  PostData(signupForm: any) {
    if (this.formGroup.valid) {
      this._httpService.post(environment.BASE_API_PATH + "CustomerMaster/Login/", this.formGroup.value).subscribe(
        logindata => {
          if (logindata.isSuccess) {
            this._authService.login(logindata.data);
            this.strMsg = this._authService.getMessage();
            if (this.strMsg != "") {
              this._toastrService.error(this.strMsg, "Login");
              this.reset();
            }
          } else {
            this._toastrService.error("Invalid Credentials !", "Login");
            this.reset();
          }
        });
    } else {
      this._toastrService.error("Login failed !", "Login");
      this.reset();
    }
  }
  reset() {
    this.formGroup.controls['userName'].setValue('');
    this.formGroup.controls['password'].setValue('');
  }
}