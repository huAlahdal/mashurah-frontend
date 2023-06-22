import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../information.model';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnInit {
  dest: number;
  serviceName = 7;
  service = 1;
  consType = 0;
  urgent = 1;
  array: any = [
    {
      value: 0,
      type: 'من 1 - 10 صفحات',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .',
      ],
      howto: ['إرفاق الملف', 'أكمل طلبك', 'سوف يقوم المترجم بمباشرة الترجمة'],
      include: ['مكالمة هاتفية مدتها 20 دقيقة', 'السرية والمهنية'],
      notInclude: [
        'مراجعة النماذج والمستندات',
        'أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .',
      ],
    },

    {
      value: 1,
      type: 'من 10 - 20 صفحة',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .',
      ],
      howto: ['إرفاق الملف', 'أكمل طلبك', 'سوف يقوم المترجم بمباشرة الترجمة'],
      include: ['مكالمة هاتفية مدتها 20 دقيقة', 'السرية والمهنية'],
      notInclude: [
        'مراجعة النماذج والمستندات',
        'أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .',
      ],
    },

    {
      value: 2,
      type: 'أكثر من 20 صفحة',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .',
      ],
      howto: ['إرفاق الملف', 'أكمل طلبك', 'سوف يقوم المترجم بمباشرة الترجمة'],
      include: ['مكالمة هاتفية مدتها 20 دقيقة', 'السرية والمهنية'],
      notInclude: [
        'مراجعة النماذج والمستندات',
        'أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .',
      ],
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
