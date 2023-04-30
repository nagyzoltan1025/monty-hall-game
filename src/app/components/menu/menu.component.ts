import {Component, EventEmitter, Output} from '@angular/core';
import {ViewTypes} from "../../shared/enum/view-types";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {

  ViewTypes = ViewTypes;
  @Output() viewSelected = new EventEmitter<string>();

  selectView(viewType: string) {
    this.viewSelected.emit(viewType);
  }
}
