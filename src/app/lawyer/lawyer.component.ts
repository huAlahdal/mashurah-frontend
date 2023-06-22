import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ServiceDataService } from '../services/serviceData.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-lawyer',
  templateUrl: './lawyer.component.html',
  styleUrls: ['./lawyer.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(window:resize)': 'onResize($event)' },
})
export class LawyerComponent implements OnInit {
  config = {
    backdrop: false,
    ignoreBackdropClick: false
  };
  error: string;
  isLoading = false;
  numberOfHours: number = null;
  modalRef: BsModalRef;
  onphone = false;
  selectedFile = Array<File>();
  rows: any;
  temp = [];
  ColumnMode = ColumnMode;
  formData = new FormData();
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _service: ServiceDataService,
    private modalService: BsModalService,
    private auth: AuthService,
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
        console.log(data)
        this.temp = [...data];
        this.rows = data;
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );

  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      { class: 'modal-dialog-scrollable modal-lg', backdrop: 'static'}
    );
  }

  closeModal() {
    this.modalRef.hide();
  }

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

  signout() {
    this.auth.logout();
  }
  changeStatus(status: number, orderID: number) {
    const updateItem = this.rows.filter(item => item.id === orderID);
    if (status === 3) {
      this.spinner.show();
      this._service.LawyerNegotiatingStatus(orderID).subscribe(
        () => {
          this.toastr.success('تم تغير الحالة إلى مناقشة', 'Success');
          this.spinner.hide();
          updateItem.forEach(element => {
            element.statusId = 4;
          });
        },
        errorMessage => {
          this.toastr.error(errorMessage, 'Error');
          this.spinner.hide();
        }
      );
    } else if (status === 4) {
      this.spinner.show();
      this._service.AcceptedByLawyerStatus(orderID, this.numberOfHours).subscribe(
        () => {
          this.modalRef.hide();
          this.toastr.success('تم تحديد عدد الساعات', 'Success');
          this.spinner.hide();
          this.numberOfHours = null;
          updateItem.forEach(element => {
            element.statusId = 5;
          });
        },
        errorMessage => {
          this.toastr.error(errorMessage, 'Error');
          this.spinner.hide();
        }
      );
    } else if (status === 6 || status === 7) {
      this._service.CompletedStatus(orderID, this.selectedFile).subscribe(
        () => {
          this.modalRef.hide();
          this.toastr.success('تم تسليم الطلب', 'Success');
          this.spinner.hide();
          this.numberOfHours = null;
          updateItem.forEach(element => {
            element.statusId = 8;
          });
        },
        error => {
          if (status === 6) {
            this.toastr.error('لم يقوم العميل بالدفع', 'Error');
          } else {
            this.toastr.error(error, 'Error');
          }
          this.spinner.hide();
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

  onSelectFile(fileInput: any) {
    this.selectedFile.push(<File>fileInput.target.files[0]);
  }

  ClearSelectFile() {
    this.selectedFile = Array<File>();
  }
}
