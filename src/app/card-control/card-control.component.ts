import { Component, EventEmitter, Input, Output } from '@angular/core';
import { iCard, iControlItem } from '../model';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-card-control',
  templateUrl: './card-control.component.html',
  styleUrls: ['./card-control.component.scss']
})
export class CardControlComponent {
  @Output() freezeUnfreezeCard: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() card: iCard = {} as iCard;
  @Input() isCardFrozen: boolean = false;

  cardControls: iControlItem[];

  constructor(private cardsService: CardsService) {
    this.cardControls = [];
  }

  ngOnChanges() {
    this.cardControls = this.cardsService.getCardControls(this.card);
  }

  ngOnInit() {
    this.cardControls = this.cardsService.getCardControls(this.card);
  }

  /**
   * Calls the service to update the card freeze status.
   */
  private updateCardFreezeStatus() {
    const updatedStatus: boolean = !this.card.freeze;
    this.freezeUnfreezeCard.emit(updatedStatus);
  }

  /**
   * Function implementation for the controls for the card.
   *
   * @param controlIndex From the list of card controls, it indicates the control which is clicked by user.
   */
  clickHandler(controlIndex: number) {
    switch(controlIndex) {
      case 0: this.updateCardFreezeStatus();
        break;
    }
  }
}
