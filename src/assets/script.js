var oneRun = 1;

function mobileme() {
  var element = document.getElementById('navbarSupportedContent');
  element.classList.toggle('collapse');
  element.classList.toggle('show');
}

function loadDoc() {
  if (
    (document.getElementById('attach1').value == '' ||
      document.getElementById('attach1').getAttribute('upload') == 'true') &&
    (document.getElementById('attach2').value == '' ||
      document.getElementById('attach2').getAttribute('upload') == 'true') &&
    (document.getElementById('attach3').value == '' ||
      document.getElementById('attach3').getAttribute('upload') == 'true') &&
    (document.getElementById('attach4').value == '' ||
      document.getElementById('attach4').getAttribute('upload') == 'true')
  ) {
    document.getElementById('navBtnBox').style.display = 'none';
    document.getElementById('loader').style.display = 'inline-block';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('newReqResBox').style.display = 'block';
        document.getElementById('newReqRes').innerHTML = this.responseText;
        openModal();
        ///sendms(mobile, "Your request was sent, we'll notify you when it's answered.");
      }
    };

    var from = document.getElementsByName('from')[0].value;
    var country = document.getElementsByName('country')[0].value;
    var service = document.getElementsByName('service')[0].value;
    var sub_service = document.getElementsByName('sub_service')[0].value;
    var service_type = document.getElementsByName('service_type')[0].value;
    var service_time = document.getElementsByName('service_time')[0].value;
    var describe = document.getElementsByName('describe')[0].value;
    var name = document.getElementsByName('name')[0].value;
    var email = document.getElementsByName('email')[0].value;
    var attach = document.getElementsByName('attach')[0].value;

    const num = document.getElementById('vmobile').value;
    if (num < 600000000) {
      var mobile = '966' + parseInt(num, 10);
    } else if (num.value < 999600000000) {
      var mobile = '' + parseInt(num, 10);
    } else {
      var mobile = num;
    }

    var status = document.getElementsByName('status')[0].value;
    var price = document.getElementById('pricePure').value;
    var duration = document.getElementsByName('duration')[0].value;

    var fullReq =
      'from=' +
      from +
      '&country=' +
      country +
      '&service=' +
      service +
      '&sub_service=' +
      sub_service +
      '&service_type=' +
      service_type +
      '&service_time=' +
      service_time +
      '&describe=' +
      describe +
      '&name=' +
      name +
      '&email=' +
      email +
      '&mobile=' +
      mobile +
      '&status=' +
      status +
      '&price=' +
      price +
      '&attach=' +
      attach +
      '&duration=' +
      duration;
    for (var i = 0; i < 200; i++) {
      var fullReq = fullReq.replace(' ', '%20');
    }

    var fullReqJSON = {
      from: from,
      country: country,
      service: service,
      sub_service: sub_service,
      service_type: service_type,
      service_time: service_time,
      describe: describe,
      name: name,
      email: email,
      mobile: mobile,
      status: status,
      price: price,
      duration: duration,
    };

    xhttp.open(
      'GET',
      'https://script.google.com/macros/s/AKfycbwrdHNgN2q4URI--uPAHckKGhwTlCwTtIJ_nJ1hgEpXOV5XLGto/exec?' +
        fullReq,
      true
    );
    xhttp.send();
  } else {
    alert('انتظر رفع جميع الملفات وارسل مرة اخرى');
  }
}

function fileup(fileup) {
  const ref = firebase.storage().ref();
  const file = document.getElementById(fileup).files[0];
  var fileCap = document.getElementById(fileup + 'Cap');
  fileCap.innerHTML =
    '<div id="btnLoader"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>';
  fileCap.style.color = '#14cab4';
  const name = +new Date() + '-' + file.name;
  const metadata = {
    contentType: file.type,
  };
  const task = ref.child(name).put(file, metadata);
  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then(url => {
      document.getElementById(fileup).setAttribute('upload', 'true');
      fileCap.innerHTML = ' تم تحميل ' + file.name;
      fileCap.style.color = '#14cab4';
      //document.getElementById(fileup).getAttribute("upload") = "true";
      document.getElementById(fileup).setAttribute('url', name);
    })
    .catch(console.error);
}

function uploadFiles() {
  //document.getElementById("upLoader").display = "block";

  if (
    document.getElementById('attach1').value != '' &&
    document.getElementById('attach1').getAttribute('upload') == 'false'
  ) {
    fileup('attach1');
  }
  if (
    document.getElementById('attach2').value != '' &&
    document.getElementById('attach2').getAttribute('upload') == 'false'
  ) {
    fileup('attach2');
  }
  if (
    document.getElementById('attach3').value != '' &&
    document.getElementById('attach3').getAttribute('upload') == 'false'
  ) {
    fileup('attach3');
  }
  if (
    document.getElementById('attach4').value != '' &&
    document.getElementById('attach4').getAttribute('upload') == 'false'
  ) {
    fileup('attach4');
  }
}

function ch() {
  var attUp1 = document.getElementById('attach1').getAttribute('upload');
  var attUp2 = document.getElementById('attach2').getAttribute('upload');
  var attUp3 = document.getElementById('attach3').getAttribute('upload');
  var attUp4 = document.getElementById('attach4').getAttribute('upload');

  var att1 = document.getElementById('attach1').getAttribute('url');
  var att2 = document.getElementById('attach2').getAttribute('url');
  var att3 = document.getElementById('attach3').getAttribute('url');
  var att4 = document.getElementById('attach4').getAttribute('url');

  document.getElementById('attInput').value =
    att1 + 'MSMashurahSplitMS' + att2 + 'MSMashurahSplitMS' + att3 + 'MSMashurahSplitMS' + att4;

  if (
    (document.getElementById('attach1').value == '' ||
      document.getElementById('attach1').getAttribute('upload') == 'true') &&
    (document.getElementById('attach2').value == '' ||
      document.getElementById('attach2').getAttribute('upload') == 'true') &&
    (document.getElementById('attach3').value == '' ||
      document.getElementById('attach3').getAttribute('upload') == 'true') &&
    (document.getElementById('attach4').value == '' ||
      document.getElementById('attach4').getAttribute('upload') == 'true')
  ) {
    document.getElementById('attInput').value =
      att1 + 'MSMashurahSplitMS' + att2 + 'MSMashurahSplitMS' + att3 + 'MSMashurahSplitMS' + att4;
    document.getElementById('submit_button').disabled = false;
  }
}

function one_page(e) {
  window.scrollTo(0, 0);
  var p = document.getElementById(e);
  var page = document.getElementsByClassName('page');

  for (var i = 0; i < page.length; i++) {
    page[i].style.display = 'none';
  }
  if (document.getElementById('navbarSupportedContent').classList.contains('show')) {
    mobileme();
  }
  p.style.display = 'block';
  window.scrollTo(0, 0);
}

function app(sel_p, sel_s) {
  var ops = document.getElementById('s_ops');
  var typs = document.getElementById('s_typs');
  var urgent = document.getElementById('urgent');
  var pre = document.getElementById('pre');
  pre.style.display = 'none';
  var service;

  var Atype = document.getElementsByName('service_type')[0];
  var type = Atype.options[Atype.selectedIndex].value;

  var Asub_ser_sel = document.getElementsByName('sub_service')[0];
  var sub_ser_sel = Asub_ser_sel.options[Asub_ser_sel.selectedIndex].value;

  switch (sel_s) {
    case 's1':
      service = 'الاستشارات القانونية';
      pre.style.display = 'block';
      ops.style.display = 'none';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      for (var w = 0; w < 10; w++) {
        pre.remove(pre[w]);
      }

      var opPre1 = document.createElement('option');
      opPre1.text = 'إدارية';
      pre.add(opPre1);
      var opPre2 = document.createElement('option');
      opPre2.text = 'جنائية';
      pre.add(opPre2);
      var opPre3 = document.createElement('option');
      opPre3.text = 'الأحوال الشخصية';
      pre.add(opPre3);
      var opPre4 = document.createElement('option');
      opPre4.text = 'عمالية';
      pre.add(opPre4);
      var opPre5 = document.createElement('option');
      opPre5.text = 'تجارية';
      pre.add(opPre5);
      var opPre6 = document.createElement('option');
      opPre6.text = 'مدنية';
      pre.add(opPre6);
      var opPre7 = document.createElement('option');
      opPre7.text = 'مالية';
      pre.add(opPre7);

      var tp1 = document.createElement('option');
      tp1.text = 'استشارة مع إرفاق مستندات';
      typs.add(tp1);
      var tp2 = document.createElement('option');
      tp2.text = 'استشارة بدون مستندات';
      typs.add(tp2);
      var tp3 = document.createElement('option');
      tp3.text = 'التحدث مع محامي';
      typs.add(tp3);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);

      // document.getElementById('rev_head').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_step1').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_step1').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_step1').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_step1').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_head').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      // document.getElementById('rev_head').innerHTML = 'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';

      break;
    case 's2':
      service = 'الشركات';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'شركة تضامن ';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'شركة توصية بسيطة ';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'شركة ذات شخص واحد ';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'شركة محاصة ';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'شركة مساهمة ';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'شركة مسئولية محدودة ';
      ops.add(op6);

      var tp1 = document.createElement('option');
      tp1.text = 'استشارة مع إرفاق مستندات';
      typs.add(tp1);
      var tp2 = document.createElement('option');
      tp2.text = 'استشارة بدون مستندات';
      typs.add(tp2);
      var tp3 = document.createElement('option');
      tp3.text = 'إعداد مستند يخص الشركة أو الشركاء';
      typs.add(tp3);
      var tp4 = document.createElement('option');
      tp4.text = 'مراجعة مستند يخص الشركة أو الشركاء';
      typs.add(tp4);
      var tp5 = document.createElement('option');
      tp5.text = 'التحدث مع محامي';
      typs.add(tp5);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
      break;
    case 's3':
      service = 'إعداد ومراجعة العقود';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'اتفاقية سرية معلومات ';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'عقد استشارة ';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'عقد امتياز تجاري ';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'عقد إيجار ';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'عقد بيع ';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'عقد تأجير معدات ';
      ops.add(op6);
      var op7 = document.createElement('option');
      op7.text = 'عقد تسويق ';
      ops.add(op7);
      var op8 = document.createElement('option');
      op8.text = 'عقد تشييد وبناء ';
      ops.add(op8);
      var op9 = document.createElement('option');
      op9.text = 'عقد تصنيع ';
      ops.add(op9);
      var op10 = document.createElement('option');
      op10.text = 'عقد تقديم خدمات ';
      ops.add(op10);
      var op11 = document.createElement('option');
      op11.text = 'عقد توريد ';
      ops.add(op11);
      var op12 = document.createElement('option');
      op12.text = 'عقد توزيع ';
      ops.add(op12);
      var op13 = document.createElement('option');
      op13.text = 'عقد شراء ';
      ops.add(op13);
      var op14 = document.createElement('option');
      op14.text = 'عقد شراكة ';
      ops.add(op14);
      var op15 = document.createElement('option');
      op15.text = 'عقد عدم منافسة ';
      ops.add(op15);
      var op16 = document.createElement('option');
      op16.text = 'عقد عمل ';
      ops.add(op16);
      var op17 = document.createElement('option');
      op17.text = 'عقد قرض عقد ترخيص ';
      ops.add(op17);
      var op18 = document.createElement('option');
      op18.text = 'عقد مقاولة ';
      ops.add(op18);
      var op19 = document.createElement('option');
      op19.text = 'عقد نقل حقوق ملكية فكرية ';
      ops.add(op19);
      var op20 = document.createElement('option');
      op20.text = 'عقد نقل ملكية ';
      ops.add(op20);
      var op21 = document.createElement('option');
      op21.text = 'مذكرة تفاهم ';
      ops.add(op21);
      var op22 = document.createElement('option');
      op22.text = 'شيء آخر ';
      ops.add(op22);

      var tp1 = document.createElement('option');
      tp1.text = 'صياغة عقد جديد';
      typs.add(tp1);
      var tp2 = document.createElement('option');
      tp2.text = 'المراجعة أو التعديل على عقد';
      typs.add(tp2);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
      break;
    case 's4':
      service = 'إعداد اللوائح والمذكرات';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'لائحة دعوى';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'مذكرة جوابية';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'مذكرة اعتراضية';
      ops.add(op3);

      if (sub_ser_sel == 'لائحة دعوى') {
        var tp1 = document.createElement('option');
        tp1.text = 'إعداد لائحة دعوى';
        typs.add(tp1);
        var tp2 = document.createElement('option');
        tp2.text = 'مراجعة لائحة دعوى';
        typs.add(tp2);
      } else if (sub_ser_sel == 'مذكرة جوابية') {
        var tp1 = document.createElement('option');
        tp1.text = 'إعداد مذكرة جوابية';
        typs.add(tp1);
        var tp2 = document.createElement('option');
        tp2.text = 'مراجعة مذكرة جوابية';
        typs.add(tp2);
      } else if (sub_ser_sel == 'مذكرة اعتراضية') {
        var tp1 = document.createElement('option');
        tp1.text = 'إعداد مذكرة اعتراضية';
        typs.add(tp1);
        var tp2 = document.createElement('option');
        tp2.text = 'مراجعة مذكرة اعتراضية';
        typs.add(tp2);
      } else {
        var tp1 = document.createElement('option');
        tp1.text = 'إعداد لائحة دعوى';
        typs.add(tp1);
        var tp2 = document.createElement('option');
        tp2.text = 'مراجعة لائحة دعوى';
        typs.add(tp2);
      }

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
      break;
    case 's5':
      service = 'الملكية الفكرية';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op11 = document.createElement('option');
      op11.text = 'بحث أولي بسيط (3 وثائق كحد أقصى) ';
      ops.add(op11);
      var op12 = document.createElement('option');
      op12.text = 'بحث أولي متقدم (3 وثائق على الأقل مع تقرير وتوصيات) ';
      ops.add(op12);
      var op18 = document.createElement('option');
      op18.text = 'صياغة الطلب وطني / خليجي ( بسيط) حد أقصى 5 صفحات ';
      ops.add(op18);
      var op19 = document.createElement('option');
      op19.text = 'صياغة طلب وطني أو خليجي (معقد) ';
      ops.add(op19);
      var op17 = document.createElement('option');
      op17.text = 'تقديم ومتابعة طلب دولي PCT حتى صدور تقرير- عربي ';
      ops.add(op17);
      var op16 = document.createElement('option');
      op16.text = 'تقديم ومتابعة طلب دولي PCT حتى صدور التقرير- انجليزي ';
      ops.add(op16);
      var op10 = document.createElement('option');
      op10.text = 'أي إجراء إضافي على الطلب الدولي PCT بعد التسجيل ';
      ops.add(op10);
      var op9 = document.createElement('option');
      op9.text = 'إيداع فقط طلب وطني بدون مراجعة الطلب ';
      ops.add(op9);
      var op8 = document.createElement('option');
      op8.text = 'إيداع فقط طلب خليجي بدون مراجعة الطلب ';
      ops.add(op8);
      var op5 = document.createElement('option');
      op5.text = 'إيداع الطلب الوطني مع المراجعة قبل الايداع ';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'إيداع الطلب خليجي مع المراجعة قبل الايداع ';
      ops.add(op6);
      var op7 = document.createElement('option');
      op7.text = 'إيداع طلب في دولة واحدة خارج المملكة ';
      ops.add(op7);
      var op21 = document.createElement('option');
      op21.text = 'عقود التراخيص / الفرنشايز /عقود تجارية بالعربي ';
      ops.add(op21);
      var op20 = document.createElement('option');
      op20.text = 'عقود التراخيص / الفرنشايز /عقود تجارية بالإنجليزي ';
      ops.add(op20);
      var op13 = document.createElement('option');
      op13.text = 'تسجيل علامة تجارية ';
      ops.add(op13);
      var op14 = document.createElement('option');
      op14.text = 'تسجيل مصنف أدبي او فني بمكتبة الملك فهد الوطنية ';
      ops.add(op14);
      var op15 = document.createElement('option');
      op15.text = 'تسجيل مصنف أدبي أو فني بوزارة الثقافة والاعلام ';
      ops.add(op15);
      var op1 = document.createElement('option');
      op1.text = 'الرد على تقرير الفحص الشكلي والتعديل ';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'الرد على تقرير الفحص الموضوعي فقط ';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'الرد على تقرير الفحص الموضوعي1أو2 مع إعادة الصياغة ';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'الوساطة لتوقيع أي عقد مع أي جهة حكومية أو شركات أو غيرها ';
      ops.add(op4);

      var tp2 = document.createElement('option');
      tp2.text = 'مشروع لمرة واحدة';
      typs.add(tp2);
      var tp1 = document.createElement('option');
      tp1.text = 'مجرد استشارة';
      typs.add(tp1);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);

      break;
    case 's6':
      service = 'التأمين';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'التأمين الطبي ';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'تأمين الحرائق ';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'تأميـن الحوادث ';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'تآمين الممتلكات ';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'تأمين اخر ';
      ops.add(op5);

      var tp1 = document.createElement('option');
      tp1.text = 'استشارة مع إرفاق مستندات';
      typs.add(tp1);
      var tp2 = document.createElement('option');
      tp2.text = 'استشارة بدون مستندات';
      typs.add(tp2);
      var tp3 = document.createElement('option');
      tp3.text = 'مراجعة عقد التأمين';
      typs.add(tp3);
      var tp4 = document.createElement('option');
      tp4.text = 'التحدث مع محامي';
      typs.add(tp4);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
      break;
    case 's7':
      service = 'التقاضي';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'الخدمة غير متوفرة';
      ops.add(op1);
      // var op2= document.createElement('option');  op2.text = 'جنائية';  ops.add(op2);
      // var op3= document.createElement('option');  op3.text = 'الأحوال الشخصية';  ops.add(op3);
      // var op4= document.createElement('option');  op4.text = 'عمالية';  ops.add(op4);
      // var op5= document.createElement('option');  op5.text = 'تجارية';  ops.add(op5);
      // var op6= document.createElement('option');  op6.text = 'مدنية';  ops.add(op6);
      // var op7= document.createElement('option');  op7.text = 'مالية';  ops.add(op7);

      //var tp1= document.createElement('option');  tp1.text = 'استشارة مع إرفاق مستندات';  typs.add(tp1);
      // var tp2= document.createElement('option');  tp2.text = 'استشارة بدون مستندات';  typs.add(tp2);
      // var tp3= document.createElement('option');  tp3.text = 'التحدث مع محامي';  typs.add(tp3);

      // var ur1= document.createElement('option');  ur1.text = 'عادية';  urgent.add(ur1);
      // var ur2= document.createElement('option');  ur2.text = 'مستعجلة';  urgent.add(ur2);
      break;
    case 's8':
      service = 'الترجمة القانونية';
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      for (var z = 0; z < 10; z++) {
        typs.remove(typs[z]);
      }
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var op1 = document.createElement('option');
      op1.text = 'ترجمة معتمدة';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'ترجمة غير معتمدة';
      ops.add(op2);

      var tp1 = document.createElement('option');
      tp1.text = 'من 1 - 10 صفحات';
      typs.add(tp1);
      var tp2 = document.createElement('option');
      tp2.text = 'من 10 - 20 صفحة';
      typs.add(tp2);
      var tp3 = document.createElement('option');
      tp3.text = 'أكثر من 20 صفحة';
      typs.add(tp3);

      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
      break;
    case 'ops':
      service = document.getElementById('service').value;

      if (service == 'إعداد اللوائح والمذكرات') {
        if (
          (sub_ser_sel == 'لائحة دعوى' && type == 'مراجعة لائحة دعوى') ||
          (sub_ser_sel == 'مذكرة جوابية' && type == 'مراجعة مذكرة جوابية') ||
          (sub_ser_sel == 'مذكرة اعتراضية' && type == 'مراجعة مذكرة اعتراضية')
        ) {
        } else if (
          sub_ser_sel == 'لائحة دعوى' &&
          (type == 'إعداد مذكرة جوابية' ||
            'مراجعة مذكرة جوابية' ||
            'إعداد مذكرة اعتراضية' ||
            'مراجعة مذكرة اعتراضية')
        ) {
          for (var z = 0; z < 10; z++) {
            typs.remove(typs[z]);
          }
          var tp1 = document.createElement('option');
          tp1.text = 'إعداد لائحة دعوى';
          typs.add(tp1);
          var tp2 = document.createElement('option');
          tp2.text = 'مراجعة لائحة دعوى';
          typs.add(tp2);
        } else if (
          sub_ser_sel == 'مذكرة جوابية' &&
          (type == 'مراجعة لائحة دعوى' ||
            'إعداد لائحة دعوى' ||
            'إعداد مذكرة اعتراضية' ||
            'مراجعة مذكرة اعتراضية')
        ) {
          for (var z = 0; z < 10; z++) {
            typs.remove(typs[z]);
          }
          var tp1 = document.createElement('option');
          tp1.text = 'إعداد مذكرة جوابية';
          typs.add(tp1);
          var tp2 = document.createElement('option');
          tp2.text = 'مراجعة مذكرة جوابية';
          typs.add(tp2);
        } else if (
          sub_ser_sel == 'مذكرة اعتراضية' &&
          (type == 'مراجعة لائحة دعوى' ||
            'إعداد لائحة دعوى' ||
            'إعداد مذكرة جوابية' ||
            'مراجعة مذكرة جوابية')
        ) {
          for (var z = 0; z < 10; z++) {
            typs.remove(typs[z]);
          }
          var tp1 = document.createElement('option');
          tp1.text = 'إعداد مذكرة اعتراضية';
          typs.add(tp1);
          var tp2 = document.createElement('option');
          tp2.text = 'مراجعة مذكرة اعتراضية';
          typs.add(tp2);
        } else {
        }
      }

      break;
  }

  for (var j = 0; j < ops.length; j++) {
    ops.children[j].value = ops.children[j].text;
  }

  for (var k = 0; k < typs.length; k++) {
    typs.children[k].value = typs.children[k].text;
  }

  document.getElementById('s').innerHTML = service;
  document.getElementById('service').value = service;

  var p = document.getElementById(sel_p);
  var appPage = document.getElementsByClassName('app');

  for (var i = 0; i < appPage.length; i++) {
    appPage[i].style.display = 'none';
  }
  //window.scrollTo(0, 100);
  p.style.display = 'block';
}

function s_one() {
  var ops = document.getElementById('s_ops');
  var pre = document.getElementById('pre');
  var preVal = pre.options[pre.selectedIndex].value;
  ops.style.display = 'block';

  switch (preVal) {
    case 'إدارية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'دعوى إلغاء قرار اداري';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'دعوى العقود الادارية';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'تعويض عن قرار إداري';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'دعوى تأديبية';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'أخرى';
      ops.add(op5);

      break;
    case 'جنائية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'قتل ';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'إعتداء';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'تحرش';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'قذف وسب وشتم';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'مخدرات ';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'سرقة';
      ops.add(op6);
      var op7 = document.createElement('option');
      op7.text = 'سحر';
      ops.add(op7);
      var op8 = document.createElement('option');
      op8.text = 'انتحال شخصية';
      ops.add(op8);
      var op9 = document.createElement('option');
      op9.text = 'جرائم معلوماتية';
      ops.add(op9);
      var op10 = document.createElement('option');
      op10.text = 'أخرى';
      ops.add(op10);

      break;
    case 'الأحوال الشخصية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'مواريث';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'نفقة';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'حضانة';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'ولاية';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'آخرى ';
      ops.add(op5);

      break;
    case 'عمالية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'خلافات عمالية';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'تعويض عن إصابات العمل';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = ' فصل تعسفي';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = ' مستحقات مالية';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'أخرى';
      ops.add(op5);

      break;
    case 'تجارية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'منازعات تجارية';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'الشركات والشركاء';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'الآوراق التجارية';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'علامات تجارية';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'وكالات تجارية';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'آخرى ';
      ops.add(op6);

      break;
    case 'مدنية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'مطالبة مالية';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'بيوع';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'كفالة';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'وكالة ';
      ops.add(op4);
      var op5 = document.createElement('option');
      op5.text = 'اجارة';
      ops.add(op5);
      var op6 = document.createElement('option');
      op6.text = 'مقاولة';
      ops.add(op6);
      var op7 = document.createElement('option');
      op7.text = 'أخرى';
      ops.add(op7);

      break;
    case 'مالية':
      for (var i = 0; i < 30; i++) {
        ops.remove(ops[i]);
      }
      var op1 = document.createElement('option');
      op1.text = 'منازعات مصرفية';
      ops.add(op1);
      var op2 = document.createElement('option');
      op2.text = 'تمويل مصرفي';
      ops.add(op2);
      var op3 = document.createElement('option');
      op3.text = 'تزوير وأختلاس';
      ops.add(op3);
      var op4 = document.createElement('option');
      op4.text = 'أخرى';
      ops.add(op4);

      break;
  }

  for (var m = 0; m < ops.length; m++) {
    ops.children[m].value = preVal + ' - ' + ops.children[m].text;
  }
}

function revPrice() {
  var s = document.getElementsByName('service')[0].value;

  var Aops = document.getElementById('s_ops');
  var ops = Aops.options[Aops.selectedIndex].text;

  var Apre = document.getElementById('pre');
  var pre = Apre.options[Apre.selectedIndex].value;

  var Atype = document.getElementsByName('service_type')[0];
  var type = Atype.options[Atype.selectedIndex].value;

  var Aurg = document.getElementsByName('service_time')[0];
  var urg = Aurg.options[Aurg.selectedIndex].value;

  var rev_s = document.getElementById('rev_s');
  var rev_type = document.getElementById('rev_type');
  var rev_urg = document.getElementById('rev_urg');
  var rev_price = document.getElementById('price');
  var pricePure = document.getElementById('pricePure');

  var rev_head = document.getElementById('rev_head');
  var rev_how = document.getElementById('rev_how');
  var rev_includes = document.getElementById('rev_includes');
  var rev_not_in = document.getElementById('rev_not_in');
  var rev_why_head = document.getElementById('rev_why_head');
  var rev_why = document.getElementById('rev_why');

  rev_s.innerHTML = s;
  rev_type.innerHTML = type;
  rev_urg.innerHTML = urg;
  var price = 0;

  if (urg == 'عادية') {
    switch (s) {
      case 'الاستشارات القانونية':
        switch (pre) {
          case 'إدارية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '525';
                break;
              case 'استشارة بدون مستندات':
                price = '175';
                break;
              case 'التحدث مع محامي':
                price = '140';
                break;
            }
            break;
          case 'جنائية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '595';
                break;
              case 'استشارة بدون مستندات':
                price = '280';
                break;
              case 'التحدث مع محامي':
                price = '245';
                break;
            }
            break;
          case 'الأحوال الشخصية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '525';
                break;
              case 'استشارة بدون مستندات':
                price = '280';
                break;
              case 'التحدث مع محامي':
                price = '175';
                break;
            }
            break;
          case 'عمالية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '420';
                break;
              case 'استشارة بدون مستندات':
                price = '175';
                break;
              case 'التحدث مع محامي':
                price = '175';
                break;
            }
            break;
          case 'تجارية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '525';
                break;
              case 'استشارة بدون مستندات':
                price = '245';
                break;
              case 'التحدث مع محامي':
                price = '175';
                break;
            }
            break;
          case 'مدنية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '420';
                break;
              case 'استشارة بدون مستندات':
                price = '245';
                break;
              case 'التحدث مع محامي':
                price = '245';
                break;
            }
            break;
          case 'مالية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '560';
                break;
              case 'استشارة بدون مستندات':
                price = '280';
                break;
              case 'التحدث مع محامي':
                price = '315';
                break;
            }
            break;
        }
        break;

      case 'الشركات':
        switch (type) {
          case 'استشارة مع إرفاق مستندات':
            price = '525';
            break;
          case 'استشارة بدون مستندات':
            price = '350';
            break;
          case 'إعداد مستند يخص الشركة أو الشركاء':
            price = '350';
            break;
          case 'مراجعة مستند يخص الشركة أو الشركاء':
            price = '280';
            break;
          case 'التحدث مع محامي':
            price = '280';
            break;
        }
        break;

      case 'إعداد ومراجعة العقود':
        switch (type) {
          case 'صياغة عقد جديد':
            price = '420';
            break;
          case 'المراجعة أو التعديل على عقد':
            price = '280';
            break;
        }
        break;
      case 'إعداد اللوائح والمذكرات':
        switch (type) {
          case 'إعداد لائحة دعوى':
            price = '420';
            break;
          case 'مراجعة لائحة دعوى':
            price = '420';
            break;
          case 'إعداد مذكرة جوابية':
            price = '420';
            break;
          case 'مراجعة مذكرة جوابية':
            price = '420';
            break;
          case 'إعداد مذكرة اعتراضية':
            price = '420';
            break;
          case 'مراجعة مذكرة اعتراضية':
            price = '420';
            break;
        }
        break;
      case 'الملكية الفكرية':
        switch (type) {
          case 'مجرد استشارة':
            price = '245';
            break;
          case 'مشروع لمرة واحدة':
            switch (ops) {
              case 'الرد على تقرير الفحص الشكلي والتعديل':
                price = '630';
                break;
              case 'الرد على تقرير الفحص الموضوعي فقط':
                price = '420';
                break;
              case 'الرد على تقرير الفحص الموضوعي1أو2 مع إعادة الصياغة':
                price = '630';
                break;
              case 'الوساطة لتوقيع أي عقد مع أي جهة حكومية أو شركات أو غيرها':
                price = 'NA';
                break;
              case 'إيداع الطلب الوطني مع المراجعة قبل الايداع':
                price = '175';
                break;
              case 'إيداع الطلب خليجي مع المراجعة قبل الايداع':
                price = '175';
                break;
              case 'إيداع طلب في دولة واحدة خارج المملكة':
                price = 'NA';
                break;
              case 'إيداع فقط طلب خليجي بدون مراجعة الطلب':
                price = '350';
                break;
              case 'إيداع فقط طلب وطني بدون مراجعة الطلب':
                price = '245';
                break;
              case 'أي إجراء إضافي على الطلب الدولي PCT بعد التسجيل':
                price = '245';
                break;
              case 'بحث أولي بسيط (3 وثائق كحد أقصى)':
                price = '455';
                break;
              case 'بحث أولي متقدم (3 وثائق على الأقل مع تقرير وتوصيات)':
                price = '455';
                break;
              case 'تسجيل علامة تجارية':
                price = '1050';
                break;
              case 'تسجيل مصنف أدبي او فني بمكتبة الملك فهد الوطنية':
                price = '455';
                break;
              case 'تسجيل مصنف أدبي أو فني بوزارة الثقافة والاعلام':
                price = '700';
                break;
              case 'تقديم ومتابعة طلب دولي PCT حتى صدور التقرير- انجليزي':
                price = '1225';
                break;
              case 'تقديم ومتابعة طلب دولي PCT حتى صدور تقرير- عربي':
                price = '1225';
                break;
              case 'صياغة الطلب وطني / خليجي ( بسيط) حد أقصى 5 صفحات':
                price = '1225';
                break;
              case 'صياغة طلب وطني أو خليجي (معقد)':
                price = '455';
                break;
              case 'عقود التراخيص / الفرنشايز /عقود تجارية بالإنجليزي':
                price = '525';
                break;
              case 'عقود التراخيص / الفرنشايز /عقود تجارية بالعربي':
                price = '455';
                break;
            }
            break;
        }
        break;
      case 'التأمين':
        switch (type) {
          case 'استشارة مع إرفاق مستندات':
            price = '420';
            break;
          case 'استشارة بدون مستندات':
            price = '280';
            break;
          case 'مراجعة عقد التأمين':
            price = '245';
            break;
          case 'التحدث مع محامي':
            price = '245';
            break;
        }
        break;
      case 'التقاضي':
        // switch(type){
        //case 'استشارة مع إرفاق مستندات':
        price = 'NA';
        //break;
        // }
        break;
      case 'الترجمة القانونية':
        if (ops == 'ترجمة معتمدة') {
          switch (type) {
            case 'من 1 - 10 صفحات':
              price = '80';
              break;
            case 'من 10 - 20 صفحة':
              price = '80';
              break;
            case 'أكثر من 20 صفحة':
              price = '80';
              break;
          }
        } else if (ops == 'ترجمة غير معتمدة') {
          switch (type) {
            case 'من 1 - 10 صفحات':
              price = '50';
              break;
            case 'من 10 - 20 صفحة':
              price = '50';
              break;
            case 'أكثر من 20 صفحة':
              price = '50';
              break;
          }
        }
        break;
    }
  } else if (urg == 'مستعجلة') {
    switch (s) {
      case 'الاستشارات القانونية':
        switch (pre) {
          case 'إدارية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '630';
                break;
              case 'استشارة بدون مستندات':
                price = '280';
                break;
              case 'التحدث مع محامي':
                price = '175';
                break;
            }
            break;
          case 'جنائية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '665';
                break;
              case 'استشارة بدون مستندات':
                price = '350';
                break;
              case 'التحدث مع محامي':
                price = '350';
                break;
            }
            break;
          case 'الأحوال الشخصية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '700';
                break;
              case 'استشارة بدون مستندات':
                price = '350';
                break;
              case 'التحدث مع محامي':
                price = '245';
                break;
            }
            break;
          case 'عمالية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '525';
                break;
              case 'استشارة بدون مستندات':
                price = '280';
                break;
              case 'التحدث مع محامي':
                price = '245';
                break;
            }
            break;
          case 'تجارية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '630';
                break;
              case 'استشارة بدون مستندات':
                price = '315';
                break;
              case 'التحدث مع محامي':
                price = '262.5';
                break;
            }
            break;
          case 'مدنية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '525';
                break;
              case 'استشارة بدون مستندات':
                price = '315';
                break;
              case 'التحدث مع محامي':
                price = '280';
                break;
            }
            break;
          case 'مالية':
            switch (type) {
              case 'استشارة مع إرفاق مستندات':
                price = '630';
                break;
              case 'استشارة بدون مستندات':
                price = '350';
                break;
              case 'التحدث مع محامي':
                price = '385';
                break;
            }
            break;
        }
        break;

      case 'الشركات':
        switch (type) {
          case 'استشارة مع إرفاق مستندات':
            price = '630';
            break;
          case 'استشارة بدون مستندات':
            price = '455';
            break;
          case 'إعداد مستند يخص الشركة أو الشركاء':
            price = '420';
            break;
          case 'مراجعة مستند يخص الشركة أو الشركاء':
            price = '350';
            break;
          case 'التحدث مع محامي':
            price = '350';
            break;
        }
        break;

      case 'إعداد ومراجعة العقود':
        switch (type) {
          case 'صياغة عقد جديد':
            price = '525';
            break;
          case 'المراجعة أو التعديل على عقد':
            price = '350';
            break;
        }
        break;
      case 'إعداد اللوائح والمذكرات':
        switch (type) {
          case 'إعداد لائحة دعوى':
            price = '525';
            break;
          case 'مراجعة لائحة دعوى':
            price = '490';
            break;
          case 'إعداد مذكرة جوابية':
            price = '525';
            break;
          case 'مراجعة مذكرة جوابية':
            price = '490';
            break;
          case 'إعداد مذكرة اعتراضية':
            price = '525';
            break;
          case 'مراجعة مذكرة اعتراضية':
            price = '490';
            break;
        }
        break;
      case 'الملكية الفكرية':
        switch (type) {
          case 'مجرد استشارة':
            price = '245';
            break;
          case 'مشروع لمرة واحدة':
            switch (ops) {
              case 'الرد على تقرير الفحص الشكلي والتعديل':
                price = '700';
                break;
              case 'الرد على تقرير الفحص الموضوعي فقط':
                price = '525';
                break;
              case 'الرد على تقرير الفحص الموضوعي1أو2 مع إعادة الصياغة':
                price = '700';
                break;
              case 'الوساطة لتوقيع أي عقد مع أي جهة حكومية أو شركات أو غيرها':
                price = 'NA';
                break;
              case 'إيداع الطلب الوطني مع المراجعة قبل الايداع':
                price = '350';
                break;
              case 'إيداع الطلب خليجي مع المراجعة قبل الايداع':
                price = '350';
                break;
              case 'إيداع طلب في دولة واحدة خارج المملكة':
                price = 'NA';
                break;
              case 'إيداع فقط طلب خليجي بدون مراجعة الطلب':
                price = '525';
                break;
              case 'إيداع فقط طلب وطني بدون مراجعة الطلب':
                price = '420';
                break;
              case 'أي إجراء إضافي على الطلب الدولي PCT بعد التسجيل':
                price = '420';
                break;
              case 'بحث أولي بسيط (3 وثائق كحد أقصى)':
                price = '525';
                break;
              case 'بحث أولي متقدم (3 وثائق على الأقل مع تقرير وتوصيات)':
                price = '525';
                break;
              case 'تسجيل علامة تجارية':
                price = '1750';
                break;
              case 'تسجيل مصنف أدبي او فني بمكتبة الملك فهد الوطنية':
                price = '525';
                break;
              case 'تسجيل مصنف أدبي أو فني بوزارة الثقافة والاعلام':
                price = '1050';
                break;
              case 'تقديم ومتابعة طلب دولي PCT حتى صدور التقرير- انجليزي':
                price = '1750';
                break;
              case 'تقديم ومتابعة طلب دولي PCT حتى صدور تقرير- عربي':
                price = '1750';
                break;
              case 'صياغة الطلب وطني / خليجي ( بسيط) حد أقصى 5 صفحات':
                price = '1750';
                break;
              case 'صياغة طلب وطني أو خليجي (معقد)':
                price = '525';
                break;
              case 'عقود التراخيص / الفرنشايز /عقود تجارية بالإنجليزي':
                price = '595';
                break;
              case 'عقود التراخيص / الفرنشايز /عقود تجارية بالعربي':
                price = '525';
                break;
            }
            break;
          case 'qqq':
            price = '350';
            break;
        }
        break;
      case 'التأمين':
        switch (type) {
          case 'استشارة مع إرفاق مستندات':
            price = '525';
            break;
          case 'استشارة بدون مستندات':
            price = '350';
            break;
          case 'مراجعة عقد التأمين':
            price = '280';
            break;
          case 'التحدث مع محامي':
            price = '350';
            break;
        }
        break;
      //   case 'التقاضي':
      //  // switch(type){
      //     //case 'استشارة مع إرفاق مستندات':
      //     price = "NA";
      //     //break;
      //  // }
      //     break;
      case 'الترجمة القانونية':
        if (ops == 'ترجمة معتمدة') {
          switch (type) {
            case 'من 1 - 10 صفحات':
              price = '110';
              break;
            case 'من 10 - 20 صفحة':
              price = '110';
              break;
            case 'أكثر من 20 صفحة':
              price = '110';
              break;
          }
        } else if (ops == 'ترجمة غير معتمدة') {
          switch (type) {
            case 'من 1 - 10 صفحات':
              price = '80';
              break;
            case 'من 10 - 20 صفحة':
              price = '80';
              break;
            case 'أكثر من 20 صفحة':
              price = '80';
              break;
          }
        }
        break;
    }
  } else if (urg == 'استشارة سريعة') {
    price = '245';
  } else if (urg == 'التحدث مع محامي') {
    price = '350';
  }

  switch (type) {
    case 'استشارة مع إرفاق مستندات':
      rev_head.innerHTML =
        'اكتب استشارتك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.';
      rev_how.innerHTML = '1- اكتب استشارتك<br>2- اكمل طلبك<br>3- سوف يجيب المحامي على سؤالك<br>';
      rev_includes.innerHTML =
        '1- كتابة سؤال<br>2- اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناء على خبرته<br>3- السرية والمهنية';
      rev_not_in.innerHTML =
        'كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'استشارة بدون مستندات':
      rev_head.innerHTML =
        'اكتب استشارتك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.';
      rev_how.innerHTML = '1- اكتب استشارتك<br>2- اكمل طلبك<br>3- سوف يجيب المحامي على سؤالك<br>';
      rev_includes.innerHTML =
        '1- كتابة سؤال<br>2- اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناء على خبرته<br>3- السرية والمهنية';
      rev_not_in.innerHTML =
        'كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'التحدث مع محامي':
      rev_head.innerHTML =
        'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
      rev_how.innerHTML =
        '1- أكمل طلبك.<br>2- سوف يتواصل معك المحامي في أقرب فرصة.<br>3- ناقش مشكلتك مع محامي لمدة 25 دقيقة.';
      rev_includes.innerHTML =
        '1- مكالمة هاتفية لمدة 25 دقيقة مع محامي<br>2- إجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناءً على خبرته.<br>3- سرية تامة وعلاقة وثيقة بينك وبين المحامي بمجرد بدء المكالمة الهاتفية.';
      rev_not_in.innerHTML =
        '1- مراجعة نماذج ومستندات<br>2- كل عمل إضافي يتعدى المكالمة الهاتفية، إذا كنت تبحث عن خدمات إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورتك أو الإتفاق مباشرةً مع المحامي.';
      rev_why_head.style.display = 'block';
      rev_why.innerHTML =
        'نظراً لطبيعة طلبك القانوني يبدو أنك بحاجة إلى استشارة سريعة تتعلق بمسألتك القانونية، سيساعدك المحامي الذي يجيبك على فهم وتوضيح احتياجاتك القانونية وخياراتك ويمكنه تقديم المشورة بشأن الإجراء الواجب اعتماده.';
      break;
    case 'إعداد مستند يخص الشركة أو الشركاء':
      rev_head.innerHTML =
        'يتم ذكر النقاط الأساسية أو شرح تفاصيل المستند المطلوب وسوف يتواصل ويعمل معك المحامي من أجل صياغة المستند بما يتناسب مع احتياجاتك ومتطلباتك.';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا أحتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المستند';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة مستند خاص بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المستند بشكله النهائي.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مراجعة مستند يخص الشركة أو الشركاء':
      rev_head.innerHTML =
        'يتم ارسال مسودة المستند للمحامي كي يقوم بمراجعتها ومعرفة مدى صحة بنود المستند ويتأكد أن حقوقك القانونية محفوظة.<br>بعد مراجعة المحامي للمستند وإضافة ملاحظاته سوف يتواصل معك هاتفيا لمدة 30 دقيقة لمناقشة التعديلات الواجب ادخالها بالمستند .';
      rev_how.innerHTML =
        '1- حمّل المستند<br>2- اكمل طلبك<br>3- سوف يراجع المحامي المسودة ويتصل بك خلال يومي عمل لإبداء ملاحظاته<br> 4- يرسل المستند على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مراجعة المحامي للمسودة<br>2- مكالمة مجانية مدتها 30 دقيقة مع محام<br>3- اجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناء على خبرته';
      rev_not_in.innerHTML =
        '1- كل عمل اضافي يتعدى المكالمة الهاتفية التي تستغرق 30 دقيقة، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'صياغة عقد جديد':
      rev_head.innerHTML =
        'يتم ذكر النقاط الأساسية أو شرح تفاصيل العقد المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة العقد بما يتناسب مع احتياجاتك ومتطلباتك.';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم العقد';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة عقد خاص بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم العقد النهائي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'المراجعة أو التعديل على عقد':
      rev_head.innerHTML =
        'يتم ارسال مسودة العقدللمحامي كي يقوم بمراجعتها ومعرفة مدى صحة بنود العقدويتأكد أن حقوقك القانونية محفوظة.<br>بعد مراجعة المحامي للمستند وإضافة ملاحظاته سوف يتواصل معك هاتفيا لمدة 30 دقيقة لمناقشة التعديلات الواجب ادخالها بالعقد.';
      rev_how.innerHTML =
        '1- حمّل المستند<br>2- اكمل طلبك<br>3- سوف يراجع المحامي المسودة ويتصل بك خلال يومي عمل لإبداء ملاحظاته<br> 4- يرسل العقدعلى بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مراجعة المحامي للمسودة<br>2- مكالمة مجانية مدتها 30 دقيقة مع محام<br>3- اجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناء على خبرته';
      rev_not_in.innerHTML =
        '1- كل عمل اضافي يتعدى المكالمة الهاتفية التي تستغرق 30 دقيقة، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'إعداد لائحة دعوى':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مراجعة لائحة دعوى':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'إعداد مذكرة جوابية':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مراجعة مذكرة جوابية':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'إعداد مذكرة اعتراضية':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مراجعة مذكرة اعتراضية':
      rev_head.innerHTML =
        'يتم ذكر النقاط الاساسية أو شرح تفاصيل المذكرة المطلوب، وسوف يتواصل ويعمل معك المحامي من أجل صياغة المذكرة بما يتناسب مع احتياجاتك ومتطلباتك';
      rev_how.innerHTML =
        '1- أكمل طلبك<br>2- سوف يتصل بك المحامي إذا احتاج الأمر<br>3- سوف يصيغ المحامي ويسلم المذكرة<br> 4- ترسل المذكرة على بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مساعدة شاملة من قبل المحامي من أجل صياغة المذكرة الخاصة بك<br>2- السرية والمهنية';
      rev_not_in.innerHTML = 'أي عمل إضافي من قبل المحامي بعد أن يسلم المذكرة النهائية.';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مجرد استشارة':
      if (urg == 'استشارة سريعة') {
        rev_head.innerHTML =
          'اطرح سؤالك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.';
        rev_how.innerHTML = '1- اكتب استشارتك<br>2- اكمل طلبك<br>3- سوف يجيب المحامي على سؤالك';
        rev_includes.innerHTML =
          '1- كتابة سؤال<br>2- اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناءً على خبرته<br>3- السرية والمهنية';
        rev_not_in.innerHTML =
          '1- مراجعة نماذج ومستندات<br>2- كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
        rev_why_head.style.display = 'none';
        rev_why.innerHTML = '';
      } else if (urg == 'التحدث مع محامي') {
        rev_head.innerHTML =
          'يمكنك التواصل مع محامي متخصص عبر الهاتف لمدة 25 دقيقة لمناقشة مشكلتك القانونية، وسوف يتواصل معك محاميك عبر الهاتف ويقدم لك الحلول القانونية المناسبة لمشكلتك.';
        rev_how.innerHTML =
          '1- أكمل طلبك.<br>2- سوف يتواصل معك المحامي في أقرب فرصة.<br>3- ناقش مشكلتك مع محامي لمدة 25 دقيقة.';
        rev_includes.innerHTML =
          '1- مكالمة هاتفية لمدة 25 دقيقة مع محامي<br>2- إجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناءً على خبرته.<br>3- سرية تامة وعلاقة وثيقة بينك وبين المحامي بمجرد بدء المكالمة الهاتفية.';
        rev_not_in.innerHTML =
          '1- مراجعة نماذج ومستندات<br>2- كل عمل إضافي يتعدى المكالمة الهاتفية، إذا كنت تبحث عن خدمات إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورتك أو الإتفاق مباشرةً مع المحامي.';
        rev_why_head.style.display = 'block';
        rev_why.innerHTML =
          'نظراً لطبيعة طلبك القانوني يبدو أنك بحاجة إلى استشارة سريعة تتعلق بمسألتك القانونية، سيساعدك المحامي الذي يجيبك على فهم وتوضيح احتياجاتك القانونية وخياراتك ويمكنه تقديم المشورة بشأن الإجراء الواجب اعتماده.';
      }
      break;
    case 'مشروع لمرة واحدة':
      rev_head.innerHTML =
        'اطرح سؤالك وسوف يجيب المحامي ويوجهك كي تتمكن من حل مشكلتك القانونية بثقة.';
      rev_how.innerHTML = '1- اكتب استشارتك<br>2- اكمل طلبك<br>3- سوف يجيب المحامي على سؤالك';
      rev_includes.innerHTML =
        '1- كتابة سؤال<br>2- اجابات ونصائح من المحامي الذي سيقترح الخيارات التي يراها مناسبة لك بناءً على خبرته<br>3- السرية والمهنية';
      rev_not_in.innerHTML =
        '1- مراجعة نماذج ومستندات<br>2- كل عمل اضافي يتعدى السؤال المطروح، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'مراجعة عقد التأمين':
      rev_head.innerHTML =
        'يتم ارسال مسودة العقدللمحامي كي يقوم بمراجعتها ومعرفة مدى صحة بنود العقدويتأكد أن حقوقك القانونية محفوظة.<br>بعد مراجعة المحامي للمستند وإضافة ملاحظاته سوف يتواصل معك هاتفيا لمدة 30 دقيقة لمناقشة التعديلات الواجب ادخالها بالعقد.';
      rev_how.innerHTML =
        '1- حمّل المستند<br>2- اكمل طلبك<br>3- سوف يراجع المحامي المسودة ويتصل بك خلال يومي عمل لإبداء ملاحظاته<br> 4- يرسل العقدعلى بريدك الالكتروني بعد إضافة الملاحظات';
      rev_includes.innerHTML =
        '1- مراجعة المحامي للمسودة<br>2- مكالمة مجانية مدتها 30 دقيقة مع محام<br>3- اجابات ونصائح من المحامي الذي سوف يقترح الخيارات التي يراها مناسبة لك بناء على خبرته';
      rev_not_in.innerHTML =
        '1- كل عمل اضافي يتعدى المكالمة الهاتفية التي تستغرق 30 دقيقة، اذا كنت تبحث عن خدمات قانونية إضافية تتجاوز العرض الذي اشتريته، فيمكنك شراء خدمة قانونية أخرى عبر مشورة او الاتفاق مباشرة مع المحامي';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'من 1 - 10 صفحات':
      rev_head.innerHTML =
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .';
      rev_how.innerHTML = '1- إرفاق الملف<br>2- أكمل طلبك<br>3- سوف يقوم المترجم بمباشرة الترجمة';
      rev_includes.innerHTML = '1- مكالمة هاتفية مدتها 20 دقيقة<br>2- السرية والمهنية';
      rev_not_in.innerHTML =
        '1- مراجعة النماذج والمستندات<br>2- أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'من 10 - 20 صفحة':
      rev_head.innerHTML =
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .';
      rev_how.innerHTML = '1- إرفاق الملف<br>2- أكمل طلبك<br>3- سوف يقوم المترجم بمباشرة الترجمة';
      rev_includes.innerHTML = '1- مكالمة هاتفية مدتها 20 دقيقة<br>2- السرية والمهنية';
      rev_not_in.innerHTML =
        '1- مراجعة النماذج والمستندات<br>2- أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
    case 'أكثر من 20 صفحة':
      rev_head.innerHTML =
        'يتم إرفاق المستند أو الملف مع ذكر المدة الزمنية المطلوبة لإنجاز الترجمة، كي يقوم المترجم بمراجعة الملف وترجمته خلال المدة المتفق عليها وسوف يتواصل معك إذا تطلب الأمر ذلك .';
      rev_how.innerHTML = '1- إرفاق الملف<br>2- أكمل طلبك<br>3- سوف يقوم المترجم بمباشرة الترجمة';
      rev_includes.innerHTML = '1- مكالمة هاتفية مدتها 20 دقيقة<br>2- السرية والمهنية';
      rev_not_in.innerHTML =
        '1- مراجعة النماذج والمستندات<br>2- أي عمل إضافي من قبل المترجم بعد تسليم ملف الترجمة المطلوب .';
      rev_why_head.style.display = 'none';
      rev_why.innerHTML = '';
      break;
  }

  document.getElementById('pricePure').value = price;

  if (urg == 'استشارة سريعة' || urg == 'التحدث مع محامي') {
    rev_price.innerHTML = price + ' ريال';
  } else {
    if (type == 'التحدث مع محامي') {
      rev_price.innerHTML = price + ' ريال';
    } else if (
      type == 'من 1 - 10 صفحات' ||
      type == 'من 10 - 20 صفحة' ||
      type == 'أكثر من 20 صفحة'
    ) {
      rev_price.innerHTML = price + ' ريال / 300 كلمة';
    } else {
      rev_price.innerHTML = price + ' ريال في الساعة';
    }
  }
}

function oneTimeCons() {
  var ops = document.getElementById('s_ops');
  var typs = document.getElementById('s_typs');
  var urgent = document.getElementById('urgent');
  var pre = document.getElementById('pre');
  pre.style.display = 'none';
  var service = document.getElementById('service').value;

  var Atype = document.getElementsByName('service_type')[0];
  var type = Atype.options[Atype.selectedIndex].value;

  if (service == 'الملكية الفكرية') {
    if (type == 'مجرد استشارة') {
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var ur1 = document.createElement('option');
      ur1.text = 'استشارة سريعة';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'التحدث مع محامي';
      urgent.add(ur2);
    } else if (type == 'مشروع لمرة واحدة') {
      for (var q = 0; q < 10; q++) {
        urgent.remove(urgent[q]);
      }
      var ur1 = document.createElement('option');
      ur1.text = 'عادية';
      urgent.add(ur1);
      var ur2 = document.createElement('option');
      ur2.text = 'مستعجلة';
      urgent.add(ur2);
    }
  }
  revPrice();
}

function cus_radio(type) {
  var user = document.getElementById('user');
  var lawyer = document.getElementById('lawyer');
  var input = document.getElementById('radio_up');

  if (type == 'user') {
    user.classList = 'cus_radio sel';
    lawyer.classList = 'cus_radio';
    input.value = type;
  } else if (type == 'lawyer') {
    user.classList = 'cus_radio';
    lawyer.classList = 'cus_radio sel';
    input.value = type;
  }
}

function validate() {
  var email = document.getElementById('vemail').value;
  var mobile = document.getElementById('vmobile').value;

  if (/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
    document.getElementById('vemail').style.border = '1px solid #14cab4';
  } else {
    document.getElementById('vemail').style.border = '1px solid #990000';
  }

  if (/^(966)(5)[0-9]{8}$/.test(mobile) || /^(05)[0-9]{8}$/.test(mobile)) {
    document.getElementById('vmobile').style.border = '1px solid #14cab4';
  } else {
    document.getElementById('vmobile').style.border = '1px solid #990000';
  }

  if (
    (/^(966)(5)[0-9]{8}$/.test(mobile) || /^(05)[0-9]{8}$/.test(mobile)) &&
    /(.+)@(.+){2,}\.(.+){2,}/.test(email)
  ) {
    document.getElementById('submit_button').disabled = false;
    document.getElementById('submit_button').style.backgroundColor = '#14cab4';
  } else {
    //  document.getElementById("submit_button").disabled = true;
    //  document.getElementById("submit_button").style.backgroundColor = "#990000";
  }
}

function openModal() {
  document.getElementById('mm1').style.display = 'block';
  mobileme();
}
function modalHandle(meth) {
  if (meth === 'signup') {
    document.getElementById('forgotModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'block';
  } else if (meth === 'login') {
    document.getElementById('forgotModal').style.display = 'none';
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('signupModal').style.display = 'none';
  } else if (meth === 'forgot') {
    document.getElementById('forgotModal').style.display = 'block';
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('signupModal').style.display = 'none';
  }
}

function pswDis() {
  var fullURL = window.location.href;
  var urlLen = fullURL.length;
  var cut = fullURL.search('/index.html');
  var errr = fullURL.slice(cut + 12, urlLen);
  if (errr == 'incPsw') {
    openModal();
    document.getElementById('incorrectPassword').innerHTML =
      'خطأ في كلمة المرور او البريد الالكتروني';
  } else {
    document.getElementById('incorrectPassword').innerHTML = '';
  }
}
pswDis();

function sendms(numP, msgP) {
  // var numbers = numP;
  // var msg = msgP;
  // var xhttp = new XMLHttpRequest();
  // xhttp.onreadystatechange = function() {
  //   if (this.readyState == 4 && this.status == 200) {
  //     alert(this.responseText);
  //   }
  // };
  // xhttp.open("POST", "https://www.msegat.com/gw/", true);
  // xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // xhttp.send("userName=mashurah2019&apiKey=0000000000000000000000000000000&numbers="+numbers+"&userSender=Mashurah&msg="+msg+"&By=Mashurah");
}
