import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoggedIn = false;
  isLoading = false;
  error: string;

  signIn = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private _location: Location, private auth: AuthService) {}

  ngOnInit() {}

  signInSubmit() {
    if (!this.signIn.valid) {
      return;
    }
    this.isLoading = true;
    this.auth.login(this.signIn.value).subscribe(
      () => {
        this._location.back();
        this.isLoading = false;
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
  }

  onActivate() {
    window.scroll(0, 0);
  }
}
