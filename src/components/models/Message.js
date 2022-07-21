import dayjs from "dayjs";
import User from "./User";
import Media from "./Media";
import Payment from "./Payment";

var isToday = require('dayjs/plugin/isToday')
var isYesterday = require('dayjs/plugin/isYesterday')
dayjs.extend(isToday)
dayjs.extend(isYesterday)

export default class Message {

  static TYPE_MESSAGE = 0;
  static TYPE_TIP = 1;

  id = 0;
  message = "";
  created_at = dayjs();
  user = new User(null);
  isRead = false;
  media = [];
  hasAccess = false;
  price = 0;
  type = Message.TYPE_MESSAGE;
  items = {};

  constructor(data) {
    if (!data) {
      return;
    }
    this.id = data.id;
    this.message = data.message;
    this.user = new User(data.user);
    this.isRead = data.read;
    this.hasAccess = data.has_access;
    this.price = data.price ? data.price / 100 : null;
    this.created_at = dayjs(data.created_at);
    this.type = data.type;

    if (data.media) {
      for (let m of data.media) {
        this.media.push(new Media(m));
      }
    }

    if (data.items) {
      for (let t in data.items) {
        switch (t) {
          case 'payment':
            this.items.payment = new Payment(data.items[t]);
            break;
        }
      }
    }
  }

  get time() {
    return this.created_at.format('LT');
  }

  get timeRelated() {
    if (this.created_at.isYesterday()) {
      return "general.yesterday";
    }
    return null;
  }

  get timeNormal() {
    if (this.created_at.isToday()) {
      return this.time;
    }
    return this.created_at.format('L');
  }

  get dayRelated() {
    if (this.created_at.isToday()) {
      return "general.today";
    } else if (this.created_at.isYesterday()) {
      return "general.yesterday";
    }
    return this.created_at.format('L');
  }

  get messageParsed() {
    const regex = /@([0-9a-z|\-|_]+)/ig;
    return this.message.replace(/[\u00A0-\u9999<>&]/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
    }).replace(regex, "<a href='" + process.env.VUE_APP_APP_URL + "/$1'>$&</a>");
  }

  get messageTrimmed() {
    return this.message.length > 20 ? this.message.substring(0, 20) + '...' : this.message;
  }

  get priceFormatted() {
    return process.env.VUE_APP_CURRENCY_SIGN + this.price;
  }

  get isFree() {
    return !this.price && true;
  }

  get images() {
    let c = 0;
    for (let m of this.media) {
      if (m.type == Media.TYPE_IMAGE) {
        c++;
      }
    }
    return c;
  }

  get videos() {
    let c = 0;
    for (let m of this.media) {
      if (m.type == Media.TYPE_VIDEO) {
        c++;
      }
    }
    return c;
  }
}