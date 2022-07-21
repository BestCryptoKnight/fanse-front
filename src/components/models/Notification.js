import User from "./User";
import Post from "./Post";
import Comment from "./Comment";

import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

export default class Notification {

  static TYPE_COMMENT = 0;
  static TYPE_LIKE = 10;
  static TYPE_COMMENT_LIKE = 11;
  static TYPE_SUBSCRIBE = 20;
  static TYPE_TIP = 30;
  static TYPE_PROMO = 40;

  id = 0;
  type = Notification.TYPE_COMMENT;
  user = null;
  created_at = dayjs();
  isViewed = false;
  items = {};

  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.user = new User(data.user);
    this.isViewed = data.viewed;
    this.created_at = dayjs(data.created_at);

    if (data.items) {
      for (let t in data.items) {
        switch (t) {
          case 'post':
            this.items.post = new Post(data.items[t]);
            break;
          case 'comment':
            this.items.comment = new Comment(data.items[t]);
            break;
          case 'user':
            this.items.user = new User(data.items[t]);
            break;
        }
      }
    }
  }

  get ago() {
    const diff = dayjs().diff(this.created_at, 'day');
    if (diff >= 2) {
      return this.created_at.format('MMM D');
    }
    return this.created_at.fromNow()
  }

  get description() {
    switch (this.type) {
      case Notification.TYPE_COMMENT:
        return [
          "general.noti-comment",
          [this.cut(this.items.comment.message, 500)]
        ];
      case Notification.TYPE_COMMENT_LIKE:
        return [
          "general.noti-comment-like",
          [this.items.comment.message]
        ];
      case Notification.TYPE_LIKE:
        return [
          "general.noti-like",
          [this.items.post.message]
        ];
      case Notification.TYPE_SUBSCRIBE:
        return [
          "general.noti-subscribe",
          []
        ];
    }
    return [null, []];
  }

  get url() {
    switch (this.type) {
      case Notification.TYPE_COMMENT:
        return this.items.post.url;
      case Notification.TYPE_COMMENT_LIKE:
        return this.items.post.url;
      case Notification.TYPE_LIKE:
        return this.items.post.url;
      case Notification.TYPE_SUBSCRIBE:
        return this.items.user.url;
    }
    return null;
  }

  cut(str, n) {
    return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
  }
}