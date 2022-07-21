import User from "../models/User";

export default {
    state: {
        swiperItems: [],
        swiperOptions: {},
        currentUser: localStorage.currentUser != null ? new User(JSON.parse(localStorage.currentUser)) : null,
        token: localStorage.token != null ? localStorage.token : null,
        addToListUser: null,
        buyItem: null,
        updates: {
            notifications: 0,
            messages: 0
        },
        spinner: false,
        pusher: null
    }
};