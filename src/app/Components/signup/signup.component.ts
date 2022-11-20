import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private _auth: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {
    $('#signup').particleground({
      parallaxMultiplier: 5,
      density: 5000
    });
  }

  signUpForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.maxLength(12), Validators.minLength(3), Validators.required]),
    last_name: new FormControl(null, [Validators.maxLength(12), Validators.minLength(3), Validators.required]),
    age: new FormControl(null, [Validators.max(60), Validators.min(16), Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])

  })

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    this._auth.signUp(this.signUpForm.value).subscribe((data) => {
      if (data.message == 'success') {
        this._Router.navigateByUrl('/signin');
        this._ToastrService.success("Your Are Sign Up Successfuly", 'success')

      }
      else {
        this._ToastrService.error(data.message, "Failed to Sign Up")
      }
    })
  }

}
