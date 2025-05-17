import { Component } from '@angular/core';
import { iMenuItem } from '../model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  menuItems: iMenuItem[];
  selectedMenuItem: number;

  constructor(private dashboardService: DashboardService) {
    this.menuItems = [];
    this.selectedMenuItem = 1;
  }

  ngOnInit() {
    this.menuItems = this.dashboardService.getMenuItems();
  }
}
