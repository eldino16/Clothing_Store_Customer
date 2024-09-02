import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { MustMatchValidator } from 'src/app/shared/validations/validation.validator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  formGroup: any = FormGroup;
  submitted = false;
  constructor(private _httpService: HttpService, private _formBuilder: FormBuilder, private _toastrService: ToastrService) {
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.formGroup = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatchValidator('password', 'confirmPassword')
    });
    this.formGroup.reset();
  }
  // convenience getter for easy access to form fields
  get ctrl() { return this.formGroup.controls; }

  onSubmit(formData: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }

    this._httpService.post(environment.BASE_API_PATH + "CustomerMaster/Save/", formData.value).subscribe(
      data => {
        if (data.isSuccess) {
          this._toastrService.info('Data saved successfully! ', 'CREATE ACCOUNT');
          this.formGroup.reset();
        } else {
          this._toastrService.error(data.errors[0], 'CREATE ACCOUNT');
        }
      }
    );
  }

}
