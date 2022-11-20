import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Service/api.service';
import { AuthService } from 'src/app/Service/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
declare let $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private _ApiService: ApiService, private _auth: AuthService, private spinner: NgxSpinnerService) { }

  notes: any;
  deletObj: { token: any, NoteID: any } = { token: null, NoteID: null }
  noteAddValue: { title: string, desc: string, userID: any, token: any } = { title: '', desc: '', userID: '', token: '' };
  noteUpdateValue: { title: string, desc: string, token: any, NoteID: any } = { title: '', desc: '', token: '', NoteID: '' };

  title: string = '';
  desc: string = '';
  noteID: string = '';



  ngOnInit(): void {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);

    $('#profile').particleground({
      parallaxMultiplier: 5,
      density: 5000
    });
    this.getNotes();
    this._ApiService.crudStatus.subscribe(() =>
      this.getNotes()
    )
  }
  getNotes() {
    this._ApiService.getNotes().subscribe((data) => {
      console.log(data);
      console.log('ay haga ......-----------..');
      this.notes = data.Notes;
    })
  }

  addNote(title: any, content: any) {
    this.noteAddValue.token = this._auth.token;


    this.noteAddValue.userID = this._auth.userData._id;
    this.noteAddValue.title = title.value;
    this.noteAddValue.desc = content.value;
    this._ApiService.addNote(this.noteAddValue).subscribe((data) => {
      console.log(data)
    });
  }

  updateValue(title: string, desc: string, _id: string) {
    this.title = title;
    this.desc = desc;
    this.noteID = _id;
  }
  updateId(_id: string) {
    this.noteID = _id
  }

  updateNote() {
    this.noteUpdateValue.token = this._auth.token;
    console.log('this is token');
    this.noteUpdateValue.NoteID = this.noteID;
    this.noteUpdateValue.desc = this.desc;
    this.noteUpdateValue.title = this.title;
    this._ApiService.updateNote(this.noteUpdateValue).subscribe((data) => {
      console.log(data);
      console.log(this.noteUpdateValue)
    })
  }

  deleteNote() {
    this.deletObj.token = this._auth.token;
    this.deletObj.NoteID = this.noteID;
    this._ApiService.deleteNote(this.deletObj).subscribe((data) => {
      console.log(data);
      console.log(localStorage.getItem('token'));
    })
  }

}
