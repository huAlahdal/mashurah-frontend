import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../information.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  dest: number;
  serviceName = 3;
  service = 1;
  consType = 0;
  urgent = 1;
  array: any = [
    {
      value: 0,
      type: 'صياغة عقد جديد',
      price: 420,

      description: [
        // tslint:disable-next-line: max-line-length
        'يتم ذكر النقاط الأساسية أو شرح تفاصيل العقد المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة العقد بما يتناسب مع احتياجاتك ومتطلباتك.',
      ],
      howto: ['أكمل طلبك', 'سوف يتصل بك المحامي إذا احتاج الأمر', 'سوف يصيغ المحامي ويسلم العقد'],
      include: ['مساعدة شاملة من قبل المحامي من أجل صياغة عقد خاص بك', 'السرية والمهنية'],
      notInclude: ['أي عمل إضافي من قبل المحامي بعد أن يسلم العقد النهائي'],
    },

    {
      value: 1,
      type: 'المراجعة أو التعديل على عقد',
      price: 280,

      description: [
        'يتم ارسال مسودة العقدللمحامي كي يقوم بمراجعتها ومعرفة مدى صحة بنود العقدويتأكد أن حقوقك القانونية محفوظة.',
        'بعد مراجعة المحامي للمستند وإضافة ملاحظاته سوف يتواصل معك هاتفيا لمدة 30 دقيقة لمناقشة التعديلات الواجب ادخالها بالعقد.',
      ],

      howto: [
        'حمّل المستند',
        'اكمل طلبك',
        'سوف يصيغ المحامي ويسلم العقد',
        'سوف يراجع المحامي المسودة ويتصل بك خلال يومي عمل لإبداء ملاحظاته',
        'رسل العقدعلى بريدك الالكتروني بعد إضافة الملاحظات',
      ],

      include: [
        'مراجعة المحامي للمسودة',
        'مكالمة مجانية مدتها 30 دقيقة مع محام',
        'اجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناء على خبرته',
      ],

      notInclude: [
        // tslint:disable-next-line: max-line-length
        'كل عمل اضافي يتعدى المكالمة الهاتفية التي تستغرق 30 دقيقة، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي',
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
      this.array[id].price = this.array[id].price + 105;
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
