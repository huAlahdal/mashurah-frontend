import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { User } from './user.model';
import { ToastrService } from 'ngx-toastr';
// import { ServiceDataService } from '../services/serviceData.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('closebutton') closeModel: ElementRef;
  @ViewChild('Smsbutton') SMSModel: ElementRef;
  isLoggedIn: boolean;
  isLoading = false;
  error: string;
  disable = false;
  modalRef: BsModalRef;
  email: string;
  password: string;
  userInfo: User;
  changePass: {oldPassword: string, newPassword: string} = {oldPassword: null, newPassword: null};
  // accountType = 'حساب مستخدم';

  signIn = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  signUp = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    mobile: new FormControl(''),
    // Country: new FormControl('المملكة العربية السعودية'),
    accountType: new FormControl('حساب مستخدم'),
    comapanyName: new FormControl({ value: null, disabled: true }, Validators.required),
    checkbox: new FormControl(false),
  });

  forgotpassword = new FormGroup({
    email: new FormControl(null, Validators.required),
  });

  verifyforgotpassword = new FormGroup({
    code: new FormControl(''),
    newPassword: new FormControl(''),
  });

  verifySMScode = new FormGroup({
    code: new FormControl(null, Validators.required),
  });

  constructor(
    private auth: AuthService,
    private route: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.auth.user.subscribe(user => {
      this.userInfo = user;
      this.isLoggedIn = !!user;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.error = null;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-scrollable modal-lg' })
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  signout() {
    this.auth.logout();
    this.route.navigate(['/']);
  }

  signInSubmit(template: TemplateRef<any>) {
    if (!this.signIn.valid) {
      return;
    }
    this.spinner.show();
    this.auth.login(this.signIn.value).subscribe(
      response => {
        this.spinner.hide();
        this.error = null;
        this.closeModal();
        if (!response.isMobileVerified) {
          this.email = this.signIn.value.email;
          this.password = this.signIn.value.password;
          this.openModal(template);
        } else {
          this.signIn.reset();
        }
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.spinner.hide();
      }
    );
  }

  get signUpf() {
    return this.signUp;
  }

  signUpSubmit(template: TemplateRef<any>, lawyerApprov: TemplateRef<any>) {
    if (!this.signUp.valid || !this.signUp.value.checkbox) {
      return;
    }
    this.signUp.value.checkbox = null;
    if (this.signUp.value.accountType === 'حساب مستخدم') {
      this.signUp.controls['accountType'].disable();
      if (this.signUp.controls.comapanyName.disabled) {
        this.spinner.show();
        this.auth.signupUser(this.signUp.value).subscribe(
          () => {
            this.closeModal();
            this.spinner.hide();
            this.email = this.signUp.value.email;
            this.password = this.signUp.value.password;
            this.signUp.reset();
            this.error = null;
            this.signUp.controls['accountType'].enable();
            this.openModal(template);
          },
          errorMessage => {
            this.signUp.controls['accountType'].enable();
            this.error = errorMessage;
            this.spinner.hide();
          }
        );
      } else {
        this.spinner.show();
        this.auth.signupCompany(this.signUp.value).subscribe(
          resData => {
            console.log(resData);
            this.spinner.hide();
            this.error = null;
            this.closeModal();
            this.email = this.signUp.value.email;
            this.password = this.signUp.value.password;
            this.signUp.reset();
            this.signUp.controls['accountType'].enable();
            this.openModal(template);
          },
          errorMessage => {
            this.error = errorMessage;
            this.signUp.controls['accountType'].enable();
            this.spinner.hide();
          }
        );
      }
    } else if (this.signUp.value.accountType === 'حساب محامي') {
      this.signUp.controls['accountType'].disable();
      this.spinner.show();
      this.auth.signupLawyer(this.signUp.value).subscribe(
        resData => {
          console.log(resData);
          this.spinner.hide();
          this.error = null;
          this.closeModal();
          this.email = this.signUp.value.email;
          this.password = this.signUp.value.password;
          this.signUp.reset();
          this.signUp.controls['accountType'].enable();
          this.openModal(lawyerApprov);
        },
        errorMessage => {
          this.error = errorMessage;
          this.signUp.controls['accountType'].enable();
          this.spinner.hide();
        }
      );
    }
  }

  ForgotPasswordF(template: TemplateRef<any>) {
    this.spinner.show();
    this.auth.ForgotPassword(this.forgotpassword.value).subscribe(
      () => {
        this.spinner.hide();
        this.closeModal();
        this.openModal(template);
      },
      errormessage => {
        this.error = errormessage;
        this.spinner.hide();
      }
    );
  }

  VerifiyForgotPasswordF(template: TemplateRef<any>) {
    // tslint:disable-next-line: no-unused-expression
    this.spinner.show;
    this.auth.VerifyForgotPassword({code: this.verifySMScode.value.code, email: this.forgotpassword.value.email}).subscribe(
      () => {
        this.closeModal();
        this.openModal(template);
        this.spinner.hide();
      },
      errorMessage => {
        this.error = errorMessage;
        this.spinner.hide();
      }
    );
  }

  ChangeForgotPasswordF() {
    this.spinner.show();
    this.verifyforgotpassword.value.code = this.verifySMScode.value.code;
    this.auth.ChangeForgotPassword({
    code: this.verifyforgotpassword.value,
    email: this.forgotpassword.value.email,
    newPassword: this.verifyforgotpassword.value
    }).subscribe(
      () => {
        this.spinner.hide();
        this.closeModal();
      },
      errormessage => {
        this.error = errormessage;
        this.spinner.hide();
      }
    );
  }

  VerifiySMSCodeF() {
    this.spinner.show();
    this.auth.VerifySMSCode({ code: this.verifySMScode.value.code, email: this.email }).subscribe(
      () => {
        this.auth.login({ email: this.email, password: this.password }).subscribe(
          () => {
            this.spinner.hide();
            this.error = null;
            this.closeModal();
            this.signIn.reset();
          },
          errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.closeModal();
            this.spinner.hide();
          }
        );

        this.email = null;
        this.password = null;
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.spinner.hide();
      }
    );
  }

  SendSMSCode() {
    this.spinner.show();
    this.auth.SendSMSCode({ email: this.email, password: this.password }).subscribe(
      () => {
        this.spinner.hide();
      },
      errormessage => {
        this.error = errormessage;
        this.spinner.hide();
      }
    );
  }

  ChangePasswordF() {
    this.spinner.show();
    this.auth.ChangePassword(this.changePass).subscribe(() => {
      this.toastr.success('تم تغير رمز المرور', 'success')
      this.error = null;
      this.spinner.hide();
      this.closeModal();
      this.changePass.newPassword = null;
      this.changePass.oldPassword = null;
    }, errormessage => {
      this.error = errormessage;
      this.spinner.hide();
    });
  }

  onChangedEvent(acctyp: string) {
    if (acctyp === 'شركة') {
      this.signUp.controls['comapanyName'].enable();
    } else {
      this.signUp.controls['comapanyName'].disable();
    }
  }
}
