import { Response } from './../Models/lesson';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Information } from '../user/legal-services/information.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
// import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ServiceDataService {
  summery: Information;
  orders: Information;
  formData = new FormData();

  result: string;
  characters: string;
  charactersLength: number;
  emtyFile: File[];
  constructor(
    private http: HttpClient,
    private route: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  addData(data: Information) {
    this.summery = data;
  }

  adddiscountId(discountId: string) {
    this.summery.discountId = discountId;
  }

  addNewData(problem: string, selectedFile: File[]): boolean {
    let Discaount: string;
    this.formData.append('dest', this.summery.dest.toString());
    this.formData.append('mainservice', this.summery.serviceName.toString());
    this.formData.append('service', this.summery.service.toString());
    this.formData.append('urgent', this.summery.urgent.toString());
    this.formData.append('type', this.summery.type.toString());
    if (problem) {
      this.summery.problem = problem;
      this.formData.append('description', this.summery.problem);
    }
    if (this.summery.discountId) {
      Discaount = this.summery.discountId.toString();
      this.formData.append('code', Discaount);
    }
    if (selectedFile) {
      selectedFile.forEach(file => {
        this.formData.append('files', file);
      });
    } else if (!selectedFile) {this.formData.append('files', ''); }

    this.spinner.show();
    this.http.post('https://www.mashurah.co/api/Consultations', this.formData).subscribe(
      () => {
        this.spinner.hide();
        this.toastr.success('تم اضافة طلب جديد', 'Success');
        this.route.navigate(['/myorders']);
        return false;
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error, 'Error');
        return false;
      }
    );
   this.formData.delete('dest');
   this.formData.delete('mainservice');
   this.formData.delete('service');
   this.formData.delete('urgent');
   this.formData.delete('type');
   this.formData.delete('description');
   this.formData.delete('code');
   this.formData.delete('files');
    return false;
  }

  getData() {
    return this.summery;
  }

  FetchData() {
    return this.http.get<Response>('https://www.mashurah.co/api/Consultations');
  }

  ReviewingStatus(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/Reviewing',
      {}
    );
  }

  LawyerNegotiatingStatus(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/LowyarNegotiating',
      {}
    );
  }

  AcceptedByLawyerStatus(orderID: number, NumberOfHours: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' +
        orderID +
        '/status/AcceptedByLowyar/' +
        NumberOfHours,
      {}
    );
  }

  AcceptedByClientStatus(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/AcceptedByClient',
      {}
    );
  }

  PaymentDoneStatus(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/PaymentDone',
      {}
    );
  }

  paymentSessionID(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/CreatePaymentSession',
      {},
      { responseType: 'text' }
    );
  }

  CompletedStatus(orderID: number, selectedFile: File[]) {
    const formDataCompelete = new FormData();
    if (selectedFile) {
      selectedFile.forEach(file => {
        formDataCompelete.append('files', file); });
      }

    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/Completed',
      formDataCompelete
    );
  }

  CanceledStatus(orderID: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' + orderID + '/status/Canceled',
      {}
    );
  }

  GetServiceProvider() {
    return this.http.get('https://www.mashurah.co/api/users/GetServiceProviders');
  }

  assginServiceProvider(orderID: number, serviceProviderId: number) {
    return this.http.patch(
      'https://www.mashurah.co/api/Consultations/' +
        orderID +
        '/status/AssigninedToServiceProvider/' +
        serviceProviderId,
      {}
    );
  }

  GetDiscount(code: string) {
    return this.http.get<{code: string, percentage: number}>('https://www.mashurah.co/api/Consultations/CheckDiscount/' + code);
  }

  // NumberOfHours(orderID: number, NumberOfHours: number) {
  //   return this.http.patch(
  //     'https://www.mashurah.co/api/Consultations/' + orderID + '/NumberOfHours/' + NumberOfHours,
  //     {}
  //   );
  // }
}
