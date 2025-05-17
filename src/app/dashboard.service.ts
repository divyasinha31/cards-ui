import { Injectable } from '@angular/core';
import { iMenuItem, iUser } from './model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  user: iUser;

  constructor() {
    this.user = {
      userName: 'Divya Sinha',
      balance: 3111
    };
  }

  /**
   * Fetches the list of items for the left side menu.
   * 
   * @returns Items for the left side menu.
   */
  getMenuItems(): iMenuItem[] {
    const menuItems: iMenuItem[] = [
      {
        icon: 'assets/Home.svg',
        text: 'Home'
      },
      {
        icon: 'assets/Card.svg',
        text: 'Cards'
      },
      {
        icon: 'assets/Payments.svg',
        text: 'Payments'
      },
      {
        icon: 'assets/Credit.svg',
        text: 'Credit'
      },
      {
        icon: 'assets/Account.svg',
        text: 'Settings'
      }
    ];
    return menuItems;
  }

  /**
   * Fetches the list of items for the right side content.
   * 
   * @returns Items for the right side content.
   */
  getContentItems(): string[] {
    const contentItems = ['My debit cards', 'All company cards'];
    return contentItems;
  }

  /**
   * Fetches the user name.
   * 
   * @returns User name.
   */
  getUserName(): string {
    return this.user.userName;
  }

  /**
   * Fetches the user balance.
   * 
   * @returns User balance.
   */
  getUserBalance(): number {
    return this.user.balance;
  }
}
