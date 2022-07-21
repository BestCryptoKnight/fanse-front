import User from "./User";
import Bundle from "./Bundle";
import Post from "./Post";
import Comment from "./Comment";

import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default class Payment {

  static TYPE_SUBSCRIPTION_NEW = 0;
  static TYPE_SUBSCRIPTION_RENEW = 1;
  static TYPE_POST = 10;
  static TYPE_MESSAGE = 11;
  static TYPE_TIP = 20;

  static STATUS_PENDING = 0;
  static STATUS_COMPLETE = 1;
  static STATUS_REFUNDED = 10;

  id = 0;
  type = Payment.TYPE_SUBSCRIPTION_NEW;
  status = Payment.STATUS_PENDING;
  amount = 0;
  fee = 0;
  user = null;
  to = null;
  created_at = dayjs();
  items = {};

  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.status = data.status;
    this.amount = data.amount;
    this.fee = data.fee;
    this.created_at = dayjs(data.created_at);

    this.user = new User(data.user);
    this.to = new User(data.to);

    if (data.items) {
      for (let t in data.items) {
        switch (t) {
          case 'post':
            this.items.post = new Post(data.items[t]);
            break;
          case 'comment':
            this.items.comment = new Comment(data.items[t]);
            break;
          case 'sub':
            this.items.sub = new User(data.items[t]);
            break;
          case 'bundle':
            this.items.bundle = new Bundle(data.items[t]);
            break;
        }
      }
    }
  }

  get feeAmount() {
    return this.amount * (this.fee / 100);
  }

  get net() {
    return this.amount - this.feeAmount;
  }
}