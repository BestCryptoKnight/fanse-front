import dayjs from "dayjs";
import Payout from "./Payout";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default class PayoutBatch {

    id = 0;
    amount = 0;
    status = Payout.STATUS_PENDING;
    hash = "";
    created_at = dayjs();
    processed_at = null;
    payoutsCount = 0;

    constructor(data) {
        this.id = data.id;
        this.amount = data.amount;
        this.status = data.status;
        this.hash = data.hash;
        this.created_at = dayjs(data.created_at);
        this.processed_at = data.processed_at ? dayjs(data.processed_at) : null;
        this.payoutsCount = data.payouts_count;
    }

}