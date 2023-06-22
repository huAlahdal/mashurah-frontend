import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.autoLogin();
  }

  onActivate() {
    window.scroll(0, 0);
  }

}
