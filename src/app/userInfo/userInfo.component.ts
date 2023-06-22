import { Component, OnInit } from '@angular/core';
import { User } from '../header/user.model';
import { AuthService } from '../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-userInfo',
  templateUrl: './userInfo.component.html',
  styleUrls: ['./userInfo.component.scss']
})
export class UserInfoComponent implements OnInit {
  error: string = null;
  userInfo: User;
  changePass: {oldPassword: string, newPassword: string} = {oldPassword: null, newPassword: null};
  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.userInfo = user;
    });
  }

  ChangePasswordF() {
    this.spinner.show();
    this.auth.ChangePassword(this.changePass).subscribe(() => {
      this.toastr.success('تم تغير رمز المرور', 'success')
      this.error = null;
      this.spinner.hide();
      this.changePass.newPassword = null;
      this.changePass.oldPassword = null;
    }, errormessage => {
      this.error = errormessage;
      this.spinner.hide();
    });
  }

}
