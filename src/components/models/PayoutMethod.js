export default class PayoutMethod {

    id = 0;
    gateway = "";
    info = {};

    constructor(data) {
        this.id = data.id;
        this.gateway = data.gateway;
        this.info = data.info;
    }

}