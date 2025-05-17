import { Injectable } from '@angular/core';
import { iCard, iCardBrand, iCardValidity, iControlItem, iNewCardAdd, iTransaction } from './model';
import { CardBrand, MerchantType, TransactionType } from './constants';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  cards: iCard[];

  constructor() {
    this.cards = [
      {
        cardNo: 1234567812342020,
        cvv: 123,
        cardName: 'John Doe',
        validity: { month: 10, year: 2025 },
        brand: CardBrand.Visa,
        freeze: false,
        transactions: [
          {
            paidTo: 'Amazon',
            transactionType: TransactionType.Debit,
            amount: 699,
            transactionDate: new Date('2024-11-14'),
            recipientType: MerchantType.Store
          },
          {
            paidTo: 'Flipkart',
            transactionType: TransactionType.Debit,
            amount: 999,
            transactionDate: new Date('2024-10-31'),
            recipientType: MerchantType.Store
          },
          {
            paidTo: 'Cleartrip',
            transactionType: TransactionType.Credit,
            amount: 7999,
            transactionDate: new Date('2024-08-11'),
            recipientType: MerchantType.Travel
          }
        ]
      },
      {
        cardNo: 1234567812342009,
        cvv: 321,
        cardName: 'Jane Doe',
        validity: { month: 8, year: 2026},
        brand: CardBrand.Visa,
        freeze: false,
        transactions: [
          {
            paidTo: 'Amazon',
            transactionType: TransactionType.Debit,
            amount: 299,
            transactionDate: new Date('2024-11-14'),
            recipientType: MerchantType.Store
          },
          {
            paidTo: 'Flipkart',
            transactionType: TransactionType.Debit,
            amount: 999,
            transactionDate: new Date('2024-10-31'),
            recipientType: MerchantType.Store
          },
          {
            paidTo: 'Cleartrip',
            transactionType: TransactionType.Credit,
            amount: 7999,
            transactionDate: new Date('2024-08-11'),
            recipientType: MerchantType.Travel
          },
          {
            paidTo: 'Amazon',
            transactionType: TransactionType.Credit,
            amount: 399,
            transactionDate: new Date('2024-02-01'),
            recipientType: MerchantType.Store
          },
          {
            paidTo: 'Book My Show',
            transactionType: TransactionType.Credit,
            amount: 4999,
            transactionDate: new Date('2024-01-31'),
            recipientType: MerchantType.Entertainment
          },
          {
            paidTo: 'Yatra',
            transactionType: TransactionType.Debit,
            amount: 10999,
            transactionDate: new Date('2024-01-01'),
            recipientType: MerchantType.Travel
          }
        ]
      }
    ]
  }

  /**
   * Fetches a list of cards for the user.
   * 
   * @returns List of cards for the user.
   */
  getCards(): iCard[] {
    return this.cards;
  }

  /**
   * Updates the card status for a particular card and returns the updated list of cards.
   * 
   * @param index The index of the card for which the status needs to be updated.
   * @param status Status to be updated for the card present at the index.
   * @returns Updated list of cards.
   */
  updateCardStatus(index: number, status: boolean): iCard[] {
    this.cards[index].freeze = status;
    return this.cards;
  }

  /**
   * Fetches a list of transactions made on a particular card.
   * 
   * @param index The index of the card for which the transactions needs to be retrieved.
   * @param viewAll Indicates whether to retrieve all transactions or the first 4 if number of transactions on the card is more than 4.
   * @returns List of transactions on the card.
   */
  getTransactionDetails(index: number, viewAll: boolean = false): iTransaction[] {
    if (viewAll) {
      return this.cards[index].transactions;
    } else {
      const transactionList: iTransaction[] = [];
      const card: iCard = this.cards[index];

      for (let i = 0; (i < 4) && (i < card.transactions.length); i++) {
        transactionList.push(card.transactions[i]);
      }
      return transactionList;
    }
  }

  /**
   * Adds new card to the list of cards.
   * 
   * @param card Includes the card brand and name to be displayed on the card.
   * @returns Updated list of cards.
   */
  addNewCard(card: iNewCardAdd): iCard[] {
    const cvv: number = this.generateCVV();
    const cardNo: string = this.generatecardNo();
    const cardValidity: iCardValidity = this.generateCardValidity();
    this.cards.push({
      cardNo: Number(cardNo),
      cvv: cvv,
      cardName: card.userName,
      validity: cardValidity,
      brand: CardBrand.Visa,
      freeze: false,
      transactions: []
    });

    return this.cards;
  }

  /**
   * Fetches a list of card controls which includes the icon path, texts to be shown in the first line and second line.
   * 
   * @param card The card for which the card controls are fetched.
   * @returns List of card controls.
   */
  getCardControls(card: iCard): iControlItem[] {
    const controls = [
      {
        icon: 'assets/Freeze_Card.svg',
        textLine1: card.freeze ? 'Unfreeze' : 'Freeze',
        textLine2: 'card'
      },
      {
        icon: 'assets/Set_Spend_Limit.svg',
        textLine1: 'Set spend',
        textLine2: 'limit'
      },
      {
        icon: 'assets/GPay.svg',
        textLine1: 'Add to',
        textLine2: 'GPay'
      },
      {
        icon: 'assets/Replace_Card.svg',
        textLine1: 'Replace',
        textLine2: 'card'
      },
      {
        icon: 'assets/Deactivate_Card.svg',
        textLine1: 'Cancel',
        textLine2: 'card'
      },
    ];

    return controls;
  }

  /**
   * Fetches a list of card brands for the dropdown when adding a new card.
   * 
   * @returns List of card brands.
   */
  getCardBrandsList(): iCardBrand[] {
    const cardBrandsList: iCardBrand[] = [
      {
        value: CardBrand.Amex,
        brandName: CardBrand[CardBrand.Amex]
      },
      {
        value: CardBrand.Mastercard,
        brandName: CardBrand[CardBrand.Mastercard]
      },
      {
        value: CardBrand.Rupay,
        brandName: CardBrand[CardBrand.Rupay]
      },
      {
        value: CardBrand.Visa,
        brandName: CardBrand[CardBrand.Visa]
      }
    ];
    return cardBrandsList;
  }

  /**
   * Generates the card number when user tries to add a new card.
   * 
   * @returns A random 16-digit card number.
   */
  private generatecardNo(): string {
    let cardNo: string = '';
    for (let i: number = 0; i < 4; i++) {
      cardNo = cardNo.concat((Math.floor(Math.random() * 9000) + 1000).toString())
    }

    return cardNo;
  }

  /**
   * Generates the card CVV.
   * 
   * @returns A random 3-digit card CVV.
   */
  private generateCVV(): number {
    return Math.floor(Math.random() * 900) + 100;
  }

  /**
   * Generates the card validity.
   * 
   * @returns The month and year till which the card is valid.
   */
  private generateCardValidity(): iCardValidity {
    const month: number = Math.floor(Math.random() * 12) + 1;
    const currentYear: number = new Date().getFullYear();
    const minValidYear: number = currentYear + 2;
    const maxValidYear: number = currentYear + 5;
    const year: number = Math.floor(Math.random() * (maxValidYear - minValidYear + 1)) + minValidYear;
    const validity: iCardValidity = { month: month, year: year };

    return validity;
  }
}
