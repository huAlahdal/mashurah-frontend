import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  userSub: Subscription;
  admin = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      if (user) {
        if (user.email === 'admin@test.test') {
          this.admin = true;
        } else {this.admin = false; }
      } else {this.admin = false; }
    });
  }

}
