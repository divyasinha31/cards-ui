import { Component } from '@angular/core';
import { iCard, iNewCardAdd, iNewCardAddData } from './model';
import { DashboardService } from './dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddNewCardComponent } from './add-new-card/add-new-card.component';
import { CardsService } from './cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  contentItems: string[];
  selectedContentItem: number;
  balance: number;
  cards: iCard[];

  constructor(private dashboardService: DashboardService, private cardsService: CardsService, private dialog: MatDialog) {
    this.selectedContentItem = 0;
    this.contentItems = []
    this.balance = 0;
    this.cards = [];
  }

  ngOnInit() {
    this.contentItems = this.dashboardService.getContentItems();
    this.balance = this.dashboardService.getUserBalance();
    this.cards = this.cardsService.getCards();
  }

  /**
   * Opens AddNewCardComponent in a modal when clicked on New Card button.
   */
  addNewCard() {
    const modalData: iNewCardAddData = {
      userName: this.dashboardService.getUserName(),
      cardBrands: this.cardsService.getCardBrandsList()
    };

    const dialogRef: MatDialogRef<AddNewCardComponent, any> = this.dialog.open(AddNewCardComponent, {
      width: '500px',
      data: modalData
    });

    dialogRef.afterClosed().subscribe((result: iNewCardAdd) => {
      if (result) {
        this.cards = this.cardsService.addNewCard(result);
      }
    });
  }
}
