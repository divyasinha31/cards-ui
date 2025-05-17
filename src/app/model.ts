import { CardBrand, CardType, MerchantType, TransactionType } from "./constants";

interface iMenuItem {
    icon: string;
    text: string;
}

interface iCard {
    cardNo: number;
    cvv: number;
    cardName: string;
    validity: iCardValidity;
    brand: CardBrand;
    freeze: boolean;
    spendLimit?: number;
    transactions: iTransaction[];
}

interface iTransaction {
    paidTo: string;
    transactionType: TransactionType;
    amount: number;
    transactionDate: Date;
    recipientType: MerchantType;
}

interface iControlItem {
    icon: string;
    textLine1: string;
    textLine2: string;
}

interface iNewCardAdd {
    userName: string;
    brand: CardBrand;
}

interface iUser {
    userName: string;
    balance: number;
}

interface iCardValidity {
    month: number;
    year: number;
}

interface iCardBrand {
    value: CardBrand;
    brandName: string;
}

interface iNewCardAddData {
    userName: string;
    cardBrands: iCardBrand[];
}

export {
    iMenuItem,
    iCard,
    iTransaction,
    iControlItem,
    iNewCardAdd,
    iUser,
    iCardValidity,
    iCardBrand,
    iNewCardAddData
}