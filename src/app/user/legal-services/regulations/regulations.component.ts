import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../information.model';

@Component({
  selector: 'app-regulations',
  templateUrl: './regulations.component.html',
  styleUrls: ['./regulations.component.scss'],
})
export class RegulationsComponent implements OnInit {
  dest: number;
  serviceName = 4;
  service = 1;
  consType = 0;
  urgent = 1;
  summeryData: Information;

  array: any = [
    {
      value: 0,
      type: 'إعداد لائحة دعوى',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك',
      ],

      howto: [
        'أكمل طلبك',
        'سوف يتصل بك المحامي إذا احتاج الأمر',
        'سوف يصيغ المحامي ويسلم المذكرة',
        'ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات',
      ],
      include: ['مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك', 'السرية والمهنية'],
      notInclude: ['أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.'],
    },

    {
      value: 1,
      type: 'مراجعة لائحة دعوى',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك',
      ],

      howto: [
        'أكمل طلبك',
        'سوف يتصل بك المحامي إذا احتاج الأمر',
        'سوف يصيغ المحامي ويسلم المذكرة',
        'ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات',
      ],
      include: ['مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك', 'السرية والمهنية'],
      notInclude: ['أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.'],
    },
  ];

  constructor(
    private test: ServiceDataService,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  ngOnInit() {
    this.dest = this.route.snapshot.params['urgent'];
  }

  addData(id: number) {
    if (this.urgent === 2) {
      this.array[id].price = this.array[id].price + 70;
    }
    const summery: Information = new Information(
      Number(this.dest),
      Number(this.serviceName),
      Number(this.service),
      Number(this.urgent),
      this.array[id].value + 1,
      this.array[id].price,
      this.array[id].description,
      this.array[id].howto,
      this.array[id].include,
      this.array[id].notInclude
    );
    this.test.addData(summery);
  }

  backClicked() {
    this._location.back();
  }
}
