export default class Verification {

    static STATUS_PENDING = 0;
    static STATUS_APPROVED = 1;
    static STATUS_DECLINED = 2;

    id = 0;
    status = Verification.TYPE_PENDING;
    photo = null;
    info = {};
    country = null;

    constructor(data) {
        this.id = data.id;
        this.status = data.status;
        this.photo = data.photo;
        this.info = data.info;
        this.country = data.country;
    }

    get isPending() {
        return this.status == Verification.STATUS_PENDING;
    }

    get isDeclined() {
        return this.status == Verification.STATUS_DECLINED;
    }
}