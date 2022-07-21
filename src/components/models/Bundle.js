export default class Bundle {
  id = 0;
  discount = 0;
  months = 0;
  user = null;

  constructor(data) {
    if (!data) {
      return;
    }
    this.id = data.id;
    this.discount = data.discount;
    this.months = data.months;
  }

  title(user) {
    const price = Math.round(user.price * this.months * (1 - (this.discount / 100)) * 100) / 100;
    const total = process.env.VUE_APP_CURRENCY_SIGN + price;
    return [this.months, total, this.discount];
  }
}