import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Information } from '../information.model';
import { ServiceDataService } from 'src/app/services/serviceData.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
})
export class ConsultationComponent implements OnInit {
  dest: number;
  serviceName = 1;
  serviceType = 1;
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
      price: 175,
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
      type: 'التحدث مع محامي',
      price: 140,

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
    // console.log(summery);
     this.test.addData(summery);
  }

  backClicked() {
    this._location.back();
  }

  selectedServ(data: any) {
    if (data === '1') {
      console.log('here?')
      this.service = 1;
    } else if (data === '2') {
      this.service = 5;
    } else if (data === '3') {
      this.service = 14;
    } else if (data === '4') {
      this.service = 18;
    } else if (data === '5') {
      this.service = 22;
    } else if (data === '6') {
      this.service = 27;
    } else if (data === '7') {
      this.service = 33;
    }
  }
}
