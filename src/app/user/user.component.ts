import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isAdmin = false;
  islawyer = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      if (user) {
        if (user.roleId === 3) {
          this.router.navigate(['/admin']);
          this.isAdmin = true;
          this.islawyer = false;
        } else if (user.roleId === 2) {
          this.router.navigate(['/lawyer']);
          this.islawyer = true;
          this.isAdmin = false;
        } else {
          this.isAdmin = false;
          this.islawyer = false;
        }
      } else {
        this.isAdmin = false;
        this.islawyer = false;
      }
    });
  }

  onActivate() {
    // window.scroll(0,0);
    document.body.scrollTop = 0;
    // or document.querySelector('body').scrollTo(0,0)
  }
}
