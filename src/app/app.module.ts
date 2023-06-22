import { PrivacyPolicyComponent } from './user/PrivacyPolicy/PrivacyPolicy.component';
import { UsageConComponent } from './user/usageCon/usageCon.component';
import { ReglationsComponent } from './user/reglations/reglations.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './user/main-page/main-page.component';
import { LegalServicesComponent } from './user/legal-services/legal-services.component';
import { FooterComponent } from './footer/footer.component';
import { ConsultationComponent } from './user/legal-services/consultation/consultation.component';
import { AllServicesComponent } from './user/legal-services/all-services/all-services.component';
import { SummeryComponent } from './user/legal-services/summery/summery.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { NewsComponent } from './user/news/news.component';
import { AboutServicesComponent } from './user/about-services/about-services.component';
import { CompaniesComponent } from './user/legal-services/companies/companies.component';
import { ReviewComponent } from './user/legal-services/review/review.component';
import { RegulationsComponent } from './user/legal-services/regulations/regulations.component';
import { PropertyComponent } from './user/legal-services/property/property.component';
import { InsuranceComponent } from './user/legal-services/insurance/insurance.component';
import { LitigationComponent } from './user/legal-services/litigation/litigation.component';
import { TranslationComponent } from './user/legal-services/translation/translation.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { OrdersComponent } from './user/orders/orders.component';
import { UserComponent } from './user/user.component';
import { AdminComponent } from './admin/admin.component';
import { ChatUIComponent } from './chat-ui/chat-ui.component';
import { SignupComponent } from './user/signup/signup.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { DescriptionComponent } from './user/legal-services/description/description.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { ErrorInterceptorProvider } from './services/error-interceptor.service';
import { LawyerComponent } from './lawyer/lawyer.component';
import { ModalModule } from 'ngx-bootstrap/modal';
// import {MatInputModule,MatPaginatorModule,MatProgressSpinnerModule,MatSortModule,MatTableModule,} from '@angular/material';
import { PasswordChangeComponent } from './header/password-change/password-change.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserInfoComponent } from './userInfo/userInfo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

export function tokenGetter() {
  const userData: {
    id: string;
    name: string;
    email: string;
    typeid: string;
    roleId: string;
    token: string;
  } = JSON.parse(localStorage.getItem('userData') || '{}');
  return userData.token;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    LegalServicesComponent,
    FooterComponent,
    ConsultationComponent,
    AllServicesComponent,
    SummeryComponent,
    AboutUsComponent,
    NewsComponent,
    AboutServicesComponent,
    CompaniesComponent,
    ReviewComponent,
    RegulationsComponent,
    PropertyComponent,
    InsuranceComponent,
    LitigationComponent,
    TranslationComponent,
    LoginModalComponent,
    PageNotFoundComponent,
    OrdersComponent,
    UserComponent,
    AdminComponent,
    ChatUIComponent,
    SignupComponent,
    AdminPageComponent,
    DescriptionComponent,
    LoadingSpinnerComponent,
    LawyerComponent,
    PasswordChangeComponent,
    ReglationsComponent,
    UsageConComponent,
    PrivacyPolicyComponent,
      UserInfoComponent
   ],

  imports: [
    BrowserModule,
    OverlayModule,
    // MatInputModule,
    // MatTableModule,
    // MatPaginatorModule,
    // MatSortModule,
    // MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxDatatableModule,
    FontAwesomeModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['www.mashurah.co', 'www.mashurah.co/api/users/GetServiceProviders'],
        disallowedRoutes: ['www.mashurah.co/api/users'],
      },
    }),
    ModalModule.forRoot(),
  ],
  providers: [ErrorInterceptorProvider, ToastrService],
  bootstrap: [AppComponent],
})
export class AppModule {}
