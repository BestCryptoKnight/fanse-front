import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default class Payout {

    static STATUS_PENDING = 0;
    static STATUS_COMPLETE = 1;

    id = 0;
    amount = 0;
    status = Payout.STATUS_PENDING;
    info = {};
    created_at = dayjs();
    processed_at = null;

    constructor(data) {
        this.id = data.id;
        this.status = data.status;
        this.created_at = dayjs(data.created_at);
        this.processed_at = data.processed_at ? dayjs(data.processed_at) : null;
        this.info = data.info;
        this.amount = data.amount;
    }

}