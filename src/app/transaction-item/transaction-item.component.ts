import { Component, Input } from '@angular/core';
import { iTransaction } from '../model';
import { MerchantType, TransactionType } from '../constants';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent {
  @Input() transactionItem: iTransaction = {} as iTransaction;
  @Input() isLastItem: boolean = false;
  iconSrc: string;
  transactionMessage: string;
  readonly transactionType = TransactionType;
  readonly recipientType = MerchantType;

  constructor() {
    this.iconSrc = '';
    this.transactionMessage = '';
  }

  ngOnInit() {
    this.iconSrc = `assets/${MerchantType[this.transactionItem.recipientType]}.svg`;
    this.transactionMessage = `${this.transactionItem.transactionType === TransactionType.Debit ? 'Charged to': 'Refund on'} debit card`;
  }
}
