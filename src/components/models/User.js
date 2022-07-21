import Bundle from "./Bundle";

export default class User {

  static ROLE_USER = 0;
  static ROLE_CREATOR = 1;
  static ROLE_ADMIN = 10;

  static CHANNEL_EMAIL = 0;
  static CHANNEL_GOOGLE = 1;

  id = 0;
  name = "";
  username = "";
  avatar = null;
  cover = null;
  role = User.ROLE_USER;
  bio = null;
  location = null;
  website = null;
  price = 0;
  bundles = [];
  isSubscribed = false;

  constructor(data) {
    if (!data) {
      return;
    }
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.avatar = data.avatar;
    this.cover = data.cover;
    this.role = data.role;
    this.bio = data.bio ? data.bio : null;
    this.location = data.location ? data.location : null;
    this.website = data.website ? data.website : null;
    this.price = data.price ? data.price / 100 : null;
    this.isSubscribed = data.is_subscribed;
    if (data.bundles) {
      for (let b of data.bundles) {
        this.bundles.push(new Bundle(b));
      }
    }
  }

  get initials() {
    const a = this.username.charAt(0).toUpperCase();
    const b = this.username.charAt(1);
    return a + b;
  }

  get url() {
    return `/${this.username}`;
  }

  get isFree() {
    return !this.price && true;
  }

  get priceFormatted() {
    return process.env.VUE_APP_CURRENCY_SIGN + this.price;
  }

  get isAdmin() {
    return this.role == User.ROLE_ADMIN;
  }

  get isCreator() {
    return this.role == User.ROLE_CREATOR || this.isAdmin;
  }
}