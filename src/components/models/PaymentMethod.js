export default class PaymentMethod {

    static TYPE_CARD = 0;

    id = 0;
    type = PaymentMethod.TYPE_CARD;
    title = "";
    main = false;

    constructor(data) {
        this.id = data.id;
        this.type = data.type;
        this.title = data.title;
        this.main = data.main;
    }

    get title() {
        return this.info.title;
    }

}