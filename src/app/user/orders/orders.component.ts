import {
  Component,
  OnInit,
  TemplateRef,
  ChangeDetectorRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { pay } from 'src/assets/js/script.js';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  // tslint:disable-next-line: no-host-metadata-property
  host: { '(window:resize)': 'onResize($event)' },
})
export class OrdersComponent implements OnInit {
  modalRef: BsModalRef;
  userSub: Subscription;
  isLoading = false;
  message: Subject<string> = new BehaviorSubject('loading :(');
  onPayment: number;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  onphone = false;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _service: ServiceDataService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    if (window.innerWidth < 1000) {
      this.onphone = true;
    }
  }

  ngOnInit() {
    window['angularComponentReference'] = {
      component: this,
      zone: this.ngZone,
      loadAngularFunction: () => this.paymentDone(this.onPayment),
    };

    setTimeout(() => {
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
    });
  }

  angularFunctionCalled() {
    console.log(this.onPayment);
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    this.message.next('all done loading :)');
    this.cdr.detectChanges();
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

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
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

  paymentSessionID(orderID: number) {
    this.spinner.show();
    console.log(orderID);
    this._service.paymentSessionID(orderID).subscribe(
      sessionID => {
        console.log(sessionID);
        pay(sessionID);
        this.onPayment = orderID;
        this.spinner.hide();
      },
      errorMessage => {
        console.log(errorMessage);
        this.toastr.error(errorMessage, 'Error');
        this.spinner.hide();
      }
    );
  }

  paymentDone(orderID: number) {
    const updateItem = this.rows.filter(item => item.id === orderID);
    this.toastr.success('تمة عملية الدفع بنجاح', 'ناجح');
    updateItem.forEach(element => {
      element.statusId = 7;
    });
  }

  changeStatus(status: number, orderID: number) {
    const updateItem = this.rows.filter(item => item.id === orderID);
    if (status === 5) {
      this.spinner.show();
      this._service.AcceptedByClientStatus(orderID).subscribe(
        () => {
          this.toastr.success('تمة الموافقة من قبل العميل', 'ناجح');
          this.closeModal();
          this.spinner.hide();
          updateItem.forEach(element => {
            element.statusId = 6;
          });
        },
        errorMessage => {
          console.log(errorMessage);
          this.toastr.error(errorMessage, 'مشكلة');
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

  onResize(event) {
    if (event.target.innerWidth < 1000) {
      this.onphone = true;
    } else {
      this.onphone = false;
    }
  }
}
