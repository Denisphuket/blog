import { cardDate } from '../types/helper.types';

export interface ICreditCard {
  cardNumber: string,
  cvc: string,
  cvclenght: number,
  date: cardDate
}

export class CreditCard implements ICreditCard {
    cardNumber: string;

    cvc: string;

    cvclenght: number;

    date: cardDate;
}
