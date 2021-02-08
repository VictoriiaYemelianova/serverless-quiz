import { Component, Input, OnInit } from '@angular/core';
import { IMenuModel } from '../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuItems: Array<IMenuModel>;

  constructor() { }

  ngOnInit(): void {
  }
}
