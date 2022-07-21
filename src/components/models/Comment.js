import dayjs from "dayjs";
import User from "./User";

export default class Comment {
    id = 0;
    message = "";
    created_at = dayjs();
    user = new User(null);
    likesCount = 0;
    isLiked = false;

    constructor(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.message = data.message;
        this.user = new User(data.user);
        this.likesCount = data.likes_count;
        this.isLiked = data.is_liked;
        this.created_at = dayjs(data.created_at);
    }

    get ago() {
        const diff = dayjs().diff(this.created_at, 'day');
        if (diff >= 2) {
            return this.created_at.format('MMM D');
        }
        return this.created_at.fromNow()
    }

    get messageParsed() {
        const regex = /@([0-9a-z|\-|_]+)/ig;
        return this.message.replace(/[\u00A0-\u9999<>&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        }).replace(regex, "<a href='" + process.env.VUE_APP_APP_URL + "/$1'>$&</a>");
    }
}