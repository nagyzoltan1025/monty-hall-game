import { Component } from '@angular/core';
import {ViewTypes} from "./shared/enum/view-types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'monty-hall-game';
  viewTypes = ViewTypes;
  view: string = ViewTypes.MENU_VIEW;

  onViewSelected($event: string) {
    this.view = $event;
  }
}
