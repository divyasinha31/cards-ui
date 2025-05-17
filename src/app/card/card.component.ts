import { Component, Input } from '@angular/core';
import { iCard } from '../model';
import { CardBrand } from '../constants';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() isCurrentCardNumberHidden: boolean = true;
  @Input() card: iCard = {} as iCard;
  cardBrandNameIcon: string;

  constructor() {
    this.cardBrandNameIcon = '';
  }

  ngOnInit() {
    this.cardBrandNameIcon = `assets/${CardBrand[this.card.brand].toString()}.svg`;
  }
}
