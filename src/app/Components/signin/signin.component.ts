import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
// import { loadFull } from "tsparticles";


declare let $: any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private _auth: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }
  ngOnInit(): void {

    $('#signin').particleground({
      parallaxMultiplier: 5,
      density: 5000
    });

  }


  signInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required])
  })

  signIn() {
    if (this.signInForm.invalid) {
      return;
    }
    else {
      this._auth.signIn(this.signInForm.value).subscribe((data) => {
        if (data.message == 'success') {
          this._ToastrService.success("Your Are Logged In Successfuly", 'Logged In')
          localStorage.setItem('token', data.token);
          this._auth.saveData();
          this._Router.navigateByUrl('/profile');
        }
        else {
          this._ToastrService.error(data.message, "Failed to Login")
        }
      })
    }
  }


  // *******************************************************************************************************************


}
