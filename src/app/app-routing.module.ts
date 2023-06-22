import { AdminComponent } from './admin/admin.component';
import { PrivacyPolicyComponent } from './user/PrivacyPolicy/PrivacyPolicy.component';
import { UsageConComponent } from './user/usageCon/usageCon.component';
import { ReglationsComponent } from './user/reglations/reglations.component';
import { MainGuard } from './services/main.guard';
import { LawyerComponent } from './lawyer/lawyer.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './user/main-page/main-page.component';
import { LegalServicesComponent } from './user/legal-services/legal-services.component';
import { AllServicesComponent } from './user/legal-services/all-services/all-services.component';
import { ConsultationComponent } from './user/legal-services/consultation/consultation.component';
import { CompaniesComponent } from './user/legal-services/companies/companies.component';
import { ReviewComponent } from './user/legal-services/review/review.component';
import { RegulationsComponent } from './user/legal-services/regulations/regulations.component';
import { PropertyComponent } from './user/legal-services/property/property.component';
import { InsuranceComponent } from './user/legal-services/insurance/insurance.component';
import { LitigationComponent } from './user/legal-services/litigation/litigation.component';
import { TranslationComponent } from './user/legal-services/translation/translation.component';
import { SummeryComponent } from './user/legal-services/summery/summery.component';
import { AboutUsComponent } from './user/about-us/about-us.component';
import { NewsComponent } from './user/news/news.component';
import { AboutServicesComponent } from './user/about-services/about-services.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrdersComponent } from './user/orders/orders.component';
import { SignupComponent } from './user/signup/signup.component';
import { DescriptionComponent } from './user/legal-services/description/description.component';
import { AuthGuard } from './services/auth.guard';
import { UserInfoComponent } from './userInfo/userInfo.component';

const appRoutes: Routes = [
  { path: '', canActivate: [MainGuard], component: MainPageComponent },
  {
    path: 'services',
    canActivate: [MainGuard],
    component: LegalServicesComponent,
    children: [
      { path: '', component: AllServicesComponent },
      { path: 'consultation/:urgent', component: ConsultationComponent },
      { path: 'companies/:urgent', component: CompaniesComponent },
      { path: 'review/:urgent', component: ReviewComponent },
      { path: 'regulations/:urgent', component: RegulationsComponent },
      { path: 'property/:urgent', component: PropertyComponent },
      { path: 'insurance/:urgent', component: InsuranceComponent },
      { path: 'litigation/:urgent', component: LitigationComponent },
      { path: 'translation/:urgent', component: TranslationComponent },
      { path: 'summery', component: SummeryComponent },
      { path: 'description', component: DescriptionComponent },
    ],
  },

  { path: 'signin', component: SignupComponent },
  { path: 'userInfo', canActivate: [MainGuard], component: UserInfoComponent },
  { path: 'about_us', canActivate: [MainGuard], component: AboutUsComponent },
  { path: 'news', canActivate: [MainGuard], component: NewsComponent },
  { path: 'about_services/:id', canActivate: [MainGuard], component: AboutServicesComponent },
  { path: 'myorders', canActivate: [AuthGuard, MainGuard], component: OrdersComponent },
  { path: 'admin', canActivate: [AuthGuard], component: AdminComponent },
  { path: 'lawyer', canActivate: [AuthGuard], component: LawyerComponent },
  { path: 'general_terms', canActivate: [MainGuard], component: ReglationsComponent },
  { path: 'use_terms', canActivate: [MainGuard], component: UsageConComponent },
  { path: 'privacy_policy', canActivate: [MainGuard], component: PrivacyPolicyComponent },
  { path: '404', canActivate: [MainGuard], component: PageNotFoundComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
