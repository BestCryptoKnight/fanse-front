export default class List {

    static DEFAULT_BOOKMARKS = 0;
    static DEFAULT_FANS = 1;
    static DEFAULT_FOLLOWING = 2;
    static DEFAULT_RECENT = 3;

    id = 0;
    _title = "";
    listeesCount = 0;
    vue = null;

    constructor(data, vue) {
        this.vue = vue;
        this.id = data.id;
        this._title = data.title ? data.title : null;
        this.listeesCount = data.listees_count;
    }

    get title() {
        if (this._title != null) {
            return this._title;
        } else {
            switch (this.id) {
                case List.DEFAULT_BOOKMARKS:
                    return this.vue.$t('general.bookmarks');
                case List.DEFAULT_FANS:
                    return this.vue.$t('general.fans');
                case List.DEFAULT_FOLLOWING:
                    return this.vue.$t('general.following');
                case List.DEFAULT_RECENT:
                    return this.vue.$t('general.recent');
            }
        }
        return "";
    }

    get listeesCountFormatted() {
        return this.listeesCount;
    }

}