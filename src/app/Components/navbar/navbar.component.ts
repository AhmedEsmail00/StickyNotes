import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _auth: AuthService) { }
  isLoggedIn = false;

  ngOnInit(): void {
    if (this._auth.hasLoggedIn.getValue() != null) {
      this.isLoggedIn = true;
      this._auth.hasLoggedIn.subscribe(() =>
        this.isLoggedIn = true
      )
    }
  }

  signOut() {
    this._auth.signOut();
    this.isLoggedIn = false;
  }

}
