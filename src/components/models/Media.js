import dayjs from "dayjs";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

export default class Media {

    static TYPE_IMAGE = 0;
    static TYPE_VIDEO = 1;
    static TYPE_AUDIO = 2;

    id = 0;
    type = Media.TYPE_IMAGE;
    created_at = dayjs();
    url = "";
    screenshot = "";

    constructor(data) {
        if (!data) {
            return;
        }
        this.id = data.id;
        this.type = data.type;
        this.created_at = dayjs(data.created_at);
        this.url = data.url;
        this.screenshot = data.screenshot;
    }

}