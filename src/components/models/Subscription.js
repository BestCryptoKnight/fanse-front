import dayjs from "dayjs";
import User from "./User";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default class Subscription {
    id = 0;
    sub = null;
    user = null;
    amount = 0;
    expires = dayjs();
    active = false;
    created_at = dayjs();
    deleted_at = null;

    constructor(data) {
        this.id = data.id;
        this.user = data.user ? new User(data.user) : null;
        this.sub = data.sub ? new User(data.sub) : null;
        this.amount = data.amount / 100;
        this.expires = data.expires ? dayjs(data.expires) : null;
        this.created_at = dayjs(data.created_at);
        this.deleted_at = data.deleted_at ? dayjs(data.deleted_at) : null;
        this.active = data.active;
    }

    get priceFormatted() {
        return process.env.VUE_APP_CURRENCY_SIGN + this.amount;
    }

    get expiresFormatted() {
        return this.expires.format('L');
    }

    get isActive() {
        return this.active == true && !this.isExpired;
    }

    get isExpired() {
        return this.deleted_at != null;
    }

    get isCancelled() {
        return !this.isExpired && !this.active;
    }

    get status() {
        if (this.isExpired) {
            return "expired";
        } else if (this.isCancelled) {
            return "cancelled";
        } else if (this.isActive) {
            return "active";
        }
        return "unknown";
    }
}