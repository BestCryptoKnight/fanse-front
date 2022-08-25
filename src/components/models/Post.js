import User from "./User";
import Media from "./Media";

import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default class Post {

  static TYPE_ACTIVE = 0;
  static TYPE_SCHEDULED = 1;
  static TYPE_EXPIRED = 2;

  id = 0;
  message = "";
  expires = null;
  price = null;
  created_at = dayjs()
  media = [];
  poll = [];
  user = new User(null);
  likesCount = 0;
  commentsCount = 0;
  isLiked = false;
  isBookmarked = false;
  hasVoted = false;
  hasAccess = false;

  constructor(data) {
    if (!data) {
      return;
    }

    this.id = data.id;
    this.message = data.message;
    this.expires = data.expires;
    this.price = data.price ? data.price / 100 : null;
    this.created_at = dayjs(data.published_at);
    this.likesCount = data.likes_count;
    this.commentsCount = data.comments_count;
    this.isLiked = data.is_liked;
    this.isBookmarked = data.is_bookmarked;
    this.hasVoted = data.has_voted;
    this.hasAccess = data.has_access;

    for (let m of data.media) {
      this.media.push(new Media(m));
    }

    this.poll = data.poll;
    this.user = new User(data.user);
  }

  get ago() {
    const diff = dayjs().diff(this.created_at, 'day');
    if (diff >= 2) {
      return this.created_at.format('MMM D');
    }
    return this.created_at.fromNow()
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

  get priceFormatted() {
    return process.env.VUE_APP_CURRENCY_SIGN + this.price;
  }

  get url() {
    return this.id ? `/${this.id}/${this.user.username}` : "";
  }

  get isFree() {
    return !this.price && true;
  }

  get postParsed() {
    const regex = /@([0-9a-z|\-|_]+)/ig;
    return this.message.replace(/[\u00A0-\u9999<>&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
    }).replace(regex, "<a href='" + process.env.VUE_APP_APP_URL + "/$1'>$&</a>");
}
}