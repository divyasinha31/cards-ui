import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iCard } from '../model';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-cards-list',
  templateUrl: './cards-list.component.html',
  styleUrls: ['./cards-list.component.scss'],
  animations: [
    trigger('animation', []),
  ]
})
export class CardsListComponent {
  @Output() selectedCardIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() freezeUnfreezeCard: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() cardIndex: number = 0;
  @Input() cards: iCard[] = [];

  isCurrentCardNumberHidden: boolean;
  animationDirection: string;

  constructor() {
    this.isCurrentCardNumberHidden = true;
    this.animationDirection = '';
  }

  updateSelectedCardIndex(index: number) {
    if (index > this.cardIndex) {
      this.showNext();
    } else {
      this.showPrevious();
    }

    this.isCurrentCardNumberHidden = true;
    this.cardIndex = index;
    this.selectedCardIndex.emit(this.cardIndex);
  }

  private showNext() {
    this.animationDirection = 'slide-left';
  }

  private showPrevious() {
    this.animationDirection = 'slide-right';
  }

  /**
   * Function implementation for showing and hiding the card number and CVV.
   */
  changeShowCardNumber() {
    this.isCurrentCardNumberHidden = !this.isCurrentCardNumberHidden
  }

  /**
   * Function implementation when child component CardControlComponent emits the status.
   *
   * @param status Indicates whether user wants to freeze or unfreeze the card.
   */
  updateCardFreezeUnfreezeStatus(status: boolean) {
    this.freezeUnfreezeCard.emit(status);
  }

  /**
   * Function implementation for ending the animation when toggling between the cards.
   */
  resetAnimation() {
    this.animationDirection = '';
  }
}
