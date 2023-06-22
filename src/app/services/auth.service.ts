import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { User } from '../header/user.model';
import { SignUp } from '../Models/SignUp';
import { tap } from 'rxjs/operators';

export interface AuthResponseData {
  isActive: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  userInfo: {
    id: number;
    name: string;
    email: string;
    roleId: number;
    typeId: number;
    token: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signupUser(signipinfo: SignUp) {
    return this.http.post('https://www.mashurah.co/api/users/RegisterPerson', signipinfo);
  }

  signupLawyer(signipinfo: SignUp) {
    return this.http.post(
      'https://www.mashurah.co/api/users/RegisterServiceProvider',
      signipinfo
    );
  }

  signupCompany(signipinfo: SignUp) {
    return this.http.post('https://www.mashurah.co/api/users/RegisterCompany', signipinfo);
  }

  login(Logindata: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>('https://www.mashurah.co/api/users/login', Logindata)
      .pipe(
        tap(resData => {
          if (resData.userInfo) {
            this.handleAuth(
              resData.userInfo.id,
              resData.userInfo.name,
              resData.userInfo.email,
              resData.userInfo.roleId,
              resData.userInfo.typeId,
              resData.userInfo.token
            );
          }
        })
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  autoLogin() {
    const userData: {
      id: number;
      name: string;
      email: string;
      roleId: number;
      typeId: number;
      token: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');
    if (!userData) {
      return;
    }
    const loadUser = new User(
      userData.id,
      userData.name,
      userData.email,
      userData.roleId,
      userData.typeId,
      userData.token
    );
    if (loadUser._token) {
      this.user.next(loadUser);
    }
  }

  VerifySMSCode(smsCode: { code: string; email: string }) {
    return this.http.post('https://www.mashurah.co/api/users/VerifySMSCode', smsCode);
  }

  SendSMSCode(sendsmsCode: { email: string; password: string }) {
    return this.http.post(
      'https://www.mashurah.co/api/users/ReSendMobileVerification',
      sendsmsCode
    );
  }

  ChangePassword(changepassword: { oldPassword: string; newPassword: string }) {
    return this.http.post('https://www.mashurah.co/api/users/ChangePassword', changepassword);
  }

  ForgotPassword(forgotpassword: { email: string }) {
    return this.http.post('https://www.mashurah.co/api/users/ForgotPassword', forgotpassword);
  }

  VerifyForgotPassword(verifyforgotpassword: { code: string, email: string}) {
    return this.http.post(
      'https://www.mashurah.co/api/users/CheckForgotPassword',
      verifyforgotpassword
    );
  }

  ChangeForgotPassword(Changeforgotpassword: { code: string, email: string, newPassword: string }) {
    return this.http.post(
      'https://www.mashurah.co/api/users/VerifyForgotPassword',
      Changeforgotpassword
    );
  }

  private handleAuth(
    id: number,
    name: string,
    email: string,
    roleId: number,
    typeid: number,
    token: string
  ) {
    const user = new User(id, name, email, roleId, typeid, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
