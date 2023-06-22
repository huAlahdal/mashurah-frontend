import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ServiceDataService } from 'src/app/services/serviceData.service';
import { Information } from '../information.model';

@Component({
  selector: 'app-summery',
  templateUrl: './summery.component.html',
  styleUrls: ['./summery.component.scss'],
})
export class SummeryComponent implements OnInit {
  summeryData: Information;
  discountID: string = null;
  isloading = false;
  workingdisc = false;
  discPers = 0;
  error: string = null;
  allData = [
    {
        id: 1,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'الاستشارات القانونية',
        Service: [
            {
                id: 1,
                name: 'دعوى إلغاء قرار اداري',
            },
            {
                id: 2,
                name: 'دعوى العقود الادارية',

            },
            {
                id: 3,
                name: 'تعويض عن قرار إداري',

            },
            {
                id: 4,
                name: 'دعوى تأديبية',

            },
            {
                id: 5,
                name: 'قتل',

            },
            {
                id: 6,
                name: 'إعتداء',

            },
            {
                id: 7,
                name: 'الأحوال تحرش',

            },
            {
                id: 8,
                name: 'قذف وسب وشتم',

            },
            {
                id: 9,
                name: 'مخدرات',

            },
            {
                id: 10,
                name: 'سرقة',

            },
            {
                id: 11,
                name: 'سحر',

            },
            {
                id: 12,
                name: 'انتحال شخصية',

            },
            {
                id: 13,
                name: 'جرائم معلوماتية',

            },
            {
                id: 14,
                name: 'مواريث',

            },
            {
                id: 15,
                name: 'نفقة',

            },
            {
                id: 16,
                name: 'حضانة',

            },
            {
                id: 17,
                name: 'ولاية',

            },
            {
                id: 18,
                name: 'خلافات عمالية',

            },
            {
                id: 19,
                name: 'تعويض عن إصابات العمل',

            },
            {
                id: 20,
                name: 'فصل تعسفي',

            },
            {
                id: 21,
                name: 'مستحقات مالية',

            },
            {
                id: 22,
                name: 'منازعات تجارية',

            },
            {
                id: 23,
                name: 'الشركات والشركاء',

            },
            {
                id: 24,
                name: 'الآوراق التجارية',

            },
            {
                id: 25,
                name: 'علامات تجارية',

            },
            {
                id: 26,
                name: 'وكالات تجارية',

            },
            {
                id: 27,
                name: 'مطالبة مالية',

            },
            {
                id: 28,
                name: 'بيوع',

            },
            {
                id: 29,
                name: 'كفالة',

            },
            {
                id: 30,
                name: 'وكالة',

            },
            {
                id: 31,
                name: 'اجارة',

            },
            {
                id: 32,
                name: 'مقاولة',

            },
            {
                id: 33,
                name: 'منازعات مصرفية',

            },
            {
                id: 34,
                name: 'تمويل مصرفي',

            },
            {
                id: 35,
                name: 'تزوير وأختلاس',

            },
            {
                id: 36,
                name: 'أخرى',

            }
        ],
        type: [
            {
                id: 1,
                name: 'استشارة مع إرفاق مستندات',
                urgent: [{id: 1, name: 'عادية', price: 525}, {id: 2, name: 'مستعجلة', price: 630}]
            },
            {
                id: 2,
                name: 'استشارة بدون مستندات',
                urgent: [{id: 1, name: 'عادية', price: 175}, {id: 2, name: 'مستعجلة', price: 280}]
            },
            {
                id: 3,
                name: 'التحدث مع محامي',
                urgent: [{id: 1, name: 'عادية', price: 140}, {id: 2, name: 'مستعجلة', price: 245}]
            }
        ]
    },

    {
        id: 2,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'شركات',
        Service: [
            {
                id: 1,
                name: 'شركة تضامن',
            },
            {
                id: 2,
                name: 'شركة توصية بسيطة',
            },
            {
                id: 3,
                name: 'شركة ذات شخص واحد',
            },
            {
                id: 4,
                name: 'شركة محاصة',
            },
            {
                id: 5,
                name: 'شركة مساهمة',
            },
            {
                id: 6,
                name: 'شركة مسئولية محدودة',
            },
        ],
        type: [
            {
                id: 1,
                name: 'استشارة مع إرفاق مستندات',
                urgent: [{id: 1, name: 'عادية', price: 525}, {id: 2, name: 'مستعجلة', price: 595}]
            },
            {
                id: 2,
                name: 'استشارة بدون مستندات',
                urgent: [{id: 1, name: 'عادية', price: 350}, {id: 2, name: 'مستعجلة', price: 420}]
            },
            {
                id: 3,
                name: 'إعداد مستند يخص الشركة أو الشركاء',
                urgent: [{id: 1, name: 'عادية', price: 350}, {id: 2, name: 'مستعجلة', price: 420}]
            },
            {
                id: 4,
                name: 'مراجعة مستند يخص الشركة أو الشركاء',
                urgent: [{id: 1, name: 'عادية', price: 280}, {id: 2, name: 'مستعجلة', price: 350}]
            },
            {
                id: 5,
                name: 'التحدث مع محامي',
                urgent: [{id: 1, name: 'عادية', price: 280}, {id: 2, name: 'مستعجلة', price: 350}]
            }
        ]
    },
    {
        id: 3,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'إعداد ومراجعة العقود',
        Service: [
            {
                id: 1,
                name: 'اتفاقية سرية معلومات',
            },
            {
                id: 2,
                name: 'عقد استشارة',
            },
            {
                id: 3,
                name: 'عقد امتياز تجاري',
            },
            {
                id: 4,
                name: 'عقد إيجار',
            },
            {
                id: 5,
                name: 'عقد بيع',
            },
            {
                id: 6,
                name: 'عقد تأجير معدات',
            },
            {
                id: 7,
                name: 'عقد تسويق',
            },
            {
                id: 8,
                name: 'عقد تشييد وبناء',
            },
            {
                id: 9,
                name: 'عقد تصنيع',
            },
            {
                id: 10,
                name: 'عقد تقديم خدمات',
            },
            {
                id: 11,
                name: 'عقد توريد',
            },
            {
                id: 12,
                name: 'عقد توزيع',
            },
            {
                id: 13,
                name: 'عقد شراء',
            },
            {
                id: 14,
                name: 'عقد شراكة',
            },
            {
                id: 15,
                name: 'عقد عدم منافسة',
            },
            {
                id: 16,
                name: 'عقد عمل',
            },
            {
                id: 17,
                name: 'عقد قرض عقد ترخيص',
            },
            {
                id: 18,
                name: 'عقد مقاولة',
            },
            {
                id: 19,
                name: 'عقد نقل حقوق ملكية فكرية',
            },
            {
                id: 20,
                name: 'عقد نقل ملكية',
            },
            {
                id: 21,
                name: 'مذكرة تفاهم',
            },
            {
                id: 22,
                name: 'شيء آخر',
            },
        ],
        type: [
            {
                id: 1,
                name: 'صياغة عقد جديد',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 525}]
            },
            {
                id: 2,
                name: 'المراجعة أو التعديل على عقد',
                urgent: [{id: 1, name: 'عادية', price: 280}, {id: 2, name: 'مستعجلة', price: 385}]
            },
        ]
    },
    {
        id: 4,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'إعداد اللوائح والمذكرات',
        Service: [
            {
                id: 1,
                name: 'لائحة دعوى',
            },
            {
                id: 2,
                name: 'مذكرة جوابية',
            },
            {
                id: 3,
                name: 'مذكرة اعتراضية',
            },
        ],
        type: [
            {
                id: 1,
                name: 'إعداد لائحة دعوى',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 490}]
            },
            {
                id: 2,
                name: 'مراجعة لائحة دعوى',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 490}]
            },
        ]
    },
    {
        id: 5,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'الملكية الفكرية',
        Service: [
            {
                id: 1,
                name: 'بحث أولي بسيط (3 وثائق كحد أقصى)',
            },
            {
                id: 2,
                name: 'بحث أولي متقدم (3 وثائق على الأقل مع تقرير وتوصيات)',
            },
            {
                id: 3,
                name: 'صياغة الطلب وطني / خليجي ( بسيط) حد أقصى 5 صفحات',
            },
            {
                id: 4,
                name: 'صياغة طلب وطني أو خليجي (معقد)',
            },
            {
                id: 5,
                name: 'تقديم ومتابعة طلب دولي PCT حتى صدور تقرير- عربي',
            },
            {
                id: 6,
                name: 'تقديم ومتابعة طلب دولي PCT حتى صدور التقرير- انجليزي',
            },
            {
                id: 7,
                name: 'أي إجراء إضافي على الطلب الدولي PCT بعد التسجيل',
            },
            {
                id: 8,
                name: 'إيداع فقط طلب وطني بدون مراجعة الطلب',
            },
            {
                id: 9,
                name: 'إيداع فقط طلب خليجي بدون مراجعة الطلب',
            },
            {
                id: 10,
                name: 'إيداع الطلب الوطني مع المراجعة قبل الايداع',
            },
            {
                id: 11,
                name: 'إيداع الطلب خليجي مع المراجعة قبل الايداع',
            },
            {
                id: 12,
                name: 'إيداع طلب في دولة واحدة خارج المملكة',
            },
            {
                id: 13,
                name: 'عقود التراخيص / الفرنشايز /عقود تجارية بالعربي',
            },
            {
                id: 14,
                name: 'عقود التراخيص / الفرنشايز /عقود تجارية بالإنجليزي',
            },
            {
                id: 15,
                name: 'تسجيل علامة تجارية',
            },
            {
                id: 16,
                name: 'تسجيل مصنف أدبي او فني بمكتبة الملك فهد الوطنية',
            },
            {
                id: 17,
                name: 'الرد على تقرير الفحص الشكلي والتعديل',
            },
            {
                id: 18,
                name: 'الرد على تقرير الفحص الموضوعي فقط',
            },
            {
                id: 19,
                name: 'الرد على تقرير الفحص الموضوعي1أو2 مع إعادة الصياغة',
            },
            {
                id: 20,
                name: 'الوساطة لتوقيع أي عقد مع أي جهة حكومية أو شركات أو غيرها',
            },
        ],
        type: [
            {
                id: 1,
                name: 'استشارة سريعة',
                urgent: [{id: 2, name: 'مشروع لمرة واحدة', price: 525}, {id: 1, name: 'مجرد استشارة', price: 455} ]
            },
            {
                id: 2,
                name: 'التحدث مع محامي',
                urgent: [{id: 2, name: 'مشروع لمرة واحدة', price: 420}, {id: 1, name: 'مجرد استشارة', price: 350}]
            },
        ]
    },
    {
        id: 6,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'التأمين',
        Service: [
            {
                id: 1,
                name: 'التأمين الطبي',
            },
            {
                id: 2,
                name: 'تأمين الحرائق',
            },
            {
                id: 3,
                name: 'تأميـن الحوادث',
            },
            {
                id: 4,
                name: 'تآمين الممتلكات',
            },
            {
                id: 5,
                name: 'تأمين اخر',
            },
        ],
        type: [
            {
                id: 1,
                name: 'استشارة مع إرفاق مستندات',
                urgent: [{id: 1, name: 'عادية', price: 525}, {id: 2, name: 'مستعجلة', price: 595}]
            },
            {
                id: 2,
                name: 'استشارة بدون مستندات',
                urgent: [{id: 1, name: 'عادية', price: 350}, {id: 2, name: 'مستعجلة', price: 420}]
            },
            {
                id: 3,
                name: 'مراجعة عقد التأمين',
                urgent: [{id: 1, name: 'عادية', price: 350}, {id: 2, name: 'مستعجلة', price: 420}]
            },
            {
                id: 4,
                name: 'التحدث مع محامي',
                urgent: [{id: 1, name: 'عادية', price: 280}, {id: 2, name: 'مستعجلة', price: 350}]
            }
        ]
    },
    {
        id: 7,
        Dest: [{id: 1, name: 'فرد'}, {id: 2, name: 'شركة'}],
        Mainservice: 'الترجمة القانونية',
        Service: [
            {
                id: 1,
                name: 'ترجمة معتمدة',
            },
            {
                id: 2,
                name: 'ترجمة غير معتمدة',
            },
        ],
        type: [
            {
                id: 1,
                name: 'من 1 - 10 صفحات',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 490}]
            },
            {
                id: 2,
                name: 'من 10 - 20 صفحة',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 490}]
            },
            {
                id: 3,
                name: 'أكثر من 20 صفحة',
                urgent: [{id: 1, name: 'عادية', price: 420}, {id: 2, name: 'مستعجلة', price: 490}]
            },
        ]
    },

]
  constructor(private _service: ServiceDataService, private _location: Location) {}

  ngOnInit() {
    this.summeryData = this._service.getData();
  }

  backClicked() {
    this._location.back();
  }

  onActivate() {
    if (this.workingdisc) {
      this._service.adddiscountId(this.discountID);
    } else {
      this._service.adddiscountId(null);
    }
    this.error = null;
    window.scroll(0, 0);
  }

  Getdisc() {
    this.isloading = true;
    this._service.GetDiscount(this.discountID).subscribe((data) => {
      this.isloading = false;
      this.workingdisc = true;
      this.discPers = data.percentage;
      this.error = null;
    }, errormessage => {
      this.error = errormessage;
      this.isloading = false;
      this.workingdisc = false;
    });
  }

  Canceldisc() {
    this.isloading = true;
    this.workingdisc = false;
    this.isloading = false;
  }
}
