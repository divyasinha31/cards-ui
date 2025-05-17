import { Component, Input } from '@angular/core';
import { iCard } from '../model';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-debit-cards',
  templateUrl: './debit-cards.component.html',
  styleUrls: ['./debit-cards.component.scss']
})
export class DebitCardsComponent {
  @Input() cards: iCard[] = [];

  selectedCardIndex: number;

  constructor(private cardsService: CardsService) {
    this.selectedCardIndex = 0;
  }

  ngOnInit() {
    this.cards = this.cardsService.getCards();
  }

  /**
   * Updates the selected card index when user toggles between the list of cards.
   *
   * @param index Indicates which card the user wants to see.
   */
  updateSelectedCardIndex(index: number) {
    this.selectedCardIndex = index;
  }

  /**
   * Function implementation when child component CardsListComponent emits the status.
   *
   * @param status Indicates whether user wants to freeze or unfreeze the card.
   */
  updateCardFreezeUnfreezeStatus(status: boolean) {
    this.cards = this.cardsService.updateCardStatus(this.selectedCardIndex, status);
  }
}
