import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../information.model';

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
})
export class InsuranceComponent implements OnInit {
  dest: number;
  serviceName = 6;
  service = 1;
  consType = 0;
  urgent = 1;
  array: any = [
    {
      value: 0,
      type: 'استشارة مع إرفاق مستندات',
      price: 525,
      description: ['اكتب استشارتك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.'],
      howto: ['اكتب استشارتك', 'اكمل طلبك', 'سوف يجيب المحامي على سؤالك'],
      include: [
        'كتابة سؤال',
        'اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناء على خبرته',
        'السرية والمهنية',
      ],

      notInclude: [
        // tslint:disable-next-line: max-line-length
        'كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي',
      ],
    },

    {
      value: 1,
      type: 'استشارة بدون مستندات',
      price: 350,
      description: ['اكتب استشارتك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.'],
      howto: ['اكتب استشارتك', 'اكمل طلبك', 'سوف يجيب المحامي على سؤالك'],
      include: [
        'كتابة سؤال',
        'اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناء على خبرته',
        'السرية والمهنية',
      ],

      notInclude: [
        // tslint:disable-next-line: max-line-length
        'كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي',
      ],
    },

    {
      value: 2,
      type: 'مراجعة عقد التأمين',
      price: 350,

      description: [
        'يتم ارسال مسودة العقدللمحامي كي يقوم بمراجعتها ومعرفة مدى صحة بنود العقدويتأكد أن حقوقك القانونية محفوظة.',
        'بعد مراجعة المحامي للمستند وإضافة ملاحظاته سوف يتواصل معك هاتفيا لمدة 30 دقيقة لمناقشة التعديلات الواجب ادخالها بالعقد.',
      ],

      howto: [
        ' حمّل المستند',
        'اكمل طلبك',
        'سوف يصيغ المحامي ويسلم المستند',
        'سوف يراجع المحامي المسودة ويتصل بك خلال يومي عمل لإبداء ملاحظاته',
        'يرسل العقدعلى بريدك الالكتروني بعد إضافة الملاحظات',
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

    {
      value: 3,
      type: 'التحدث مع محامي',
      price: 280,

      description: [
        // tslint:disable-next-line: max-line-length
        'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.',
      ],
      howto: [
        'أكمل طلبك.',
        'سوف يتواصل معك المحامي في أقرب فرصة.',
        'ناقش مشكلتك مع محامي لمدة 25 دقيقة.',
      ],

      include: [
        'مكالمة هاتفية لمدة 25 دقيقة مع محامي',
        'إجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناءً على خبرته.',
        ' سرية تامة وعلاقة وثيقة بينك وبين المحامي بمجرد بدء المكالمة الهاتفية.',
      ],

      notInclude: [
        ' مراجعة نماذج ومستندات',
        // tslint:disable-next-line: max-line-length
        'كل عمل إضافي يتعدى المكالمة الهاتفية، إذا كنت تبحث عن خدمات إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورتك أو الإتفاق مباشرةً مع المحامي.',
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
