import { Component, Input } from '@angular/core';
import { iCard, iTransaction } from '../model';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-card-transaction',
  templateUrl: './card-transaction.component.html',
  styleUrls: ['./card-transaction.component.scss']
})
export class CardTransactionComponent {
  @Input() cardIndex: number = 0;
  @Input() cards: iCard[] = [];

  isExpanded: boolean;
  transactionList: iTransaction[];

  constructor(private cardsService: CardsService) {
    this.isExpanded = true;
    this.transactionList = [];
  }

  ngOnChanges() {
    this.cards = [...this.cards];
    this.transactionList = [];
    this.createTransactionList();
  }

  ngOnInit() {
    this.createTransactionList();
  }

  /**
   * Retrieves the transactions for the currently displayed card
   */
  private createTransactionList() {
    this.transactionList = this.cardsService.getTransactionDetails(this.cardIndex);
  }

  /**
   * Function implementation for up and down key to toggle the content where the recent card transactions shown.
   */
  toggleContent() {
    this.isExpanded = !this.isExpanded;
  }
}
