import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(window:resize)': 'onResize($event)' },
})
export class AdminPageComponent implements OnInit {
  modalRef: BsModalRef;
  lawyers: any;
  userSub: Subscription;
  isLoading = false;
  lawyerID: number = null;
  onphone = false;

  rows = [];
  temp = [];
  ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _service: ServiceDataService,
    private auth: AuthService,
    private route: Router,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    if (window.innerWidth < 1000) {
      this.onphone = true;
    }
  }

  onResize(event) {
    if (event.target.innerWidth < 1000) {
      this.onphone = true;
    } else {
      this.onphone = false;
    }
  }

  ngOnInit() {
    this.spinner.show();
    this._service.FetchData().subscribe(
      (data: any) => {
        this.temp = [...data];
        this.rows = data;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );

    this._service.GetServiceProvider().subscribe(data => {
      this.lawyers = data;
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-dialog-scrollable modal-lg' })
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

  // ReviewingStatus(orderID: number) {
  //   this._service.ReviewingStatus(orderID).subscribe(() => {
  //     console.log('Changed to Reviewing');
  //   });
  // }

  CancelOrder(orderID: number) {
    const updateItem = this.rows.filter(item => item.id === orderID);
    this.spinner.show();
    this._service.CanceledStatus(orderID).subscribe(
      () => {
        this.toastr.success('تم إلغاء الطلب', 'ناجح');
        this.closeModal();
        this.spinner.hide();
        updateItem.forEach(element => {
          if (element.statusId < 7) {
            element.statusId = 9;
          } else {
            element.statusId = 10;
          }
        });
      },
      error => {
        this.spinner.hide();
        this.toastr.error(error, 'مشكلة');
      }
    );
  }

  // assignServiceProvider(orderID: number) {
  //   this.modalRef.hide()
  //    this._service.assginServiceProvider(orderID, this.lawyerID).subscribe(() => {
  //      this.modalRef.hide()
  //      console.log('assgined a lawyer');
  //     })

  // }

  signout() {
    this.auth.logout();
    this.route.navigate(['/']);
  }

  changeStatus(status: number, orderID: number) {
    const updateItem = this.rows.filter(item => item.id === orderID);
    if (status === 1) {
      this.spinner.show();
      this._service.ReviewingStatus(orderID).subscribe(
        () => {
          this.toastr.success('تم تحويل الحالة إلى مراجعة', 'Success');
          this.spinner.hide();
          updateItem.forEach(element => {
            element.statusId = 2;
          });
        },
        errorMessage => {
          this.toastr.error(errorMessage, 'Error');
          this.spinner.hide();
        }
      );
    } else if (status === 2) {
      this.spinner.show();
      this._service.assginServiceProvider(orderID, this.lawyerID).subscribe(
        () => {
          this.modalRef.hide();
          this.toastr.success('تم تحديد محامي للطلب', 'Success');
          this.spinner.hide();
          updateItem.forEach(element => {
            element.statusId = 3;
          });
        },
        errorMessage => {
          this.spinner.hide();
          this.toastr.error(errorMessage, 'Error');
        }
      );
    }
  }
  findIndexToUpdate(newItem) {
    return newItem.id === this;
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.temp.filter(function(d) {
      const rVal =
        d.id.toString().includes(val) ||
        d.clientName.includes(val) ||
        d.clientMobile.includes(val) ||
        d.clientEmail.includes(val) ||
        // d.serviceProviderName.includes(val) ||
        // d.serviceProviderMobile.includes(val) ||
        // d.serviceProviderEmail.includes(val) ||
        d.createdAt.toString().includes(val);
      return rVal;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
}
