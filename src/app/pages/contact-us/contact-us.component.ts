import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  formGroup: any = FormGroup;
  submitted = false;
  constructor(private _httpService: HttpService, private _formBuilder: FormBuilder, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.createContactUsForm();
  }
  createContactUsForm() {
    this.formGroup = this._formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
      MobileNo: ['', Validators.required],
      Message: ['', Validators.required]
    });
    this.formGroup.reset();
  }

  // convenience getter for easy access to form fields
  get ctrl() { return this.formGroup.controls; }

  postData(formData: any) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formGroup.invalid) {
      return;
    }

    this._httpService.post(environment.BASE_API_PATH + "ContactUs/Save/", formData.value).subscribe((data: any) => {
      if (data.isSuccess) {
        this._toastrService.info('Data saved successfully! ', 'Contact Us');
        this.formGroup.reset();
      } else {
        this._toastrService.error(data.errors[0], 'Contact Us');
      }
    }
    );
  }


}