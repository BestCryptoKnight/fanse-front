import User from "../components/models/User";


export default {

  install(Vue) {

    Vue.prototype.$saveToken = function (data) {
      if (data == null) {
        localStorage.removeItem('token');
        this.$store.state.token = null;
      } else {
        localStorage.token = data;
        this.$store.state.token = data;
      }
    }

    Vue.prototype.$saveUser = function (data) {
      if (data == null) {
        localStorage.removeItem('currentUser');
        this.$store.state.currentUser = null;
      } else {
        data.avatar = data.avatar ? data.avatar + '?rnd=' + Math.random() : null;
        localStorage.currentUser = JSON.stringify(data);
        this.$store.state.currentUser = new User(data);
      }
    }

    Vue.prototype.$showSpinner = function () {
      this.$store.state.spinner = true;
    }

    Vue.prototype.$hideSpinner = function () {
      this.$store.state.spinner = false;
    }

    Vue.prototype.$showPhotoSwipe = function (media, id) {
      let items = [];
      let index = 0;

      for (let item of media) {
        if (item.type == 1) {
          items.push({
            html: `
              <div class="video">
                <video data-video-instance class="video-js vjs-big-play-centered" 
                  controls 
                  preload='metadata' 
                  playsinline 
                  controlsList='nodownload' 
                  poster="${item.screenshot}">
                    <source src="${item.url}" type="video/webm" />
                  </video>
              </div>`,
          });
        } else {
          items.push({
            src: item.url,
            w: 0,
            h: 0,
          });
        }
        if (item.id === id) {
          this.$store.state.swiperOptions = {
            index: index,
          };
        }
        index++;
      }
      this.$store.state.swiperItems = items;
    }

    Vue.prototype.$buyItem = function (data) {
      this.$store.state.buyItem = data;
    }

    Vue.prototype.$formatAmount = function (amount) {
      return process.env.VUE_APP_CURRENCY_SIGN + (amount / 100).toLocaleString();
    }

    Vue.prototype.$escape = function (s) {
      return s.replace(/[\u00A0-\u9999<>&]/g, function (i) {
        return '&#' + i.charCodeAt(0) + ';';
      });
    }

    Vue.prototype.$get = function (url, success, failure) {
      this.$api('get', process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_VERSION + url, null, success, failure);
    }

    Vue.prototype.$post = function (url, data, success, failure) {
      this.$api('post', process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_VERSION + url, data, success, failure);
    }

    Vue.prototype.$aGet = function (url, success, failure) {
      this.$api('get', process.env.VUE_APP_API_URL + '/admin' + url, null, success, failure);
    }

    Vue.prototype.$aPost = function (url, data, success, failure) {
      this.$api('post', process.env.VUE_APP_API_URL + '/admin' + url, data, success, failure);
    }

    Vue.prototype.$api = function (method, url, data, success, failure) {
      const headers = {};
      if (this.$store.state.token) {
        headers["Authorization"] = "Bearer " + this.$store.state.token;
      }

      let body = data;

      if (!(data instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        body = data ? JSON.stringify(data) : undefined;
      }
      fetch(url,
        {
          headers,
          method: method,
          body,
        }
      ).then(resp => {
        if (resp.ok) {
          return resp.json().then((response) => {
            if (response.updates) {
              this.$store.state.updates = {
                notifications: response.updates.notifications,
                messages: response.updates.messages,
              };
            }
            this.$hideSpinner();
            success(response);
          })
        } else {
          this.$hideSpinner();
          if (resp && resp.status == 401) {
            this.$saveToken(null);
            this.$saveUser(null);
            // location = process.env.VUE_APP_APP_URL;
          }

          var errs = {};
          resp.json().then(data => {
            if (data.errors) {
              for (let field in data.errors) {
                errs[field] = [];
                for (let e in data.errors[field]) {
                  errs[field].push(data.errors[field][e]);
                }
              }
            }
            failure(errs);
          }).catch(() => {
            failure(errs);
          })

        }
      }
      )
        .catch((err) => {
          console.log(err);
        });
    }
  },
}