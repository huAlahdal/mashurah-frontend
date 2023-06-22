import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-ui',
  templateUrl: './chat-ui.component.html',
  styleUrls: ['./chat-ui.component.scss']
})
export class ChatUIComponent implements OnInit {
  showChat = false;

  constructor() { }

  ngOnInit() {
  }

  buttonClicked() {
    this.showChat = !this.showChat;
  }

}
