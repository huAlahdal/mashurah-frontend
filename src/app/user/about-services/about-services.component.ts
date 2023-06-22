import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-services',
  templateUrl: './about-services.component.html',
  styleUrls: ['./about-services.component.scss']
})
export class AboutServicesComponent implements OnInit {
  about_servic: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.about_servic = this.route.snapshot.params['id'];
  }

}
