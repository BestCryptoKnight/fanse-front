import LayoutUser from '../layout/user/Layout.vue';
import LayoutNoneUser from '../layout/user/LayoutNone.vue';
import LayoutAdmin from '../layout/admin/Layout.vue';
import PagePost from '../pages/PagePost.vue';
import PageLogin from '../pages/PageLogin.vue';
import PageHome from '../pages/PageHome.vue';
import PageWelcome from '../pages/PageWelcome.vue';
import PageSearch from '../pages/PageSearch.vue';
import PageNewPost from '../pages/PageNewPost.vue';
import PageSettings from '../pages/PageSettings.vue';
import PagePassword from '../pages/PagePassword.vue';
import PageEmail from '../pages/PageEmail.vue';
import PageSignup from '../pages/PageSignup.vue';
import PagePasswordReset from '../pages/PagePasswordReset.vue';
import PageForgot from '../pages/PageForgot.vue';
import PageUser from '../pages/PageUser.vue';
import PageBookmarks from '../pages/PageBookmarks.vue';
import PageLists from '../pages/PageLists.vue';
import PageList from '../pages/PageList.vue';
import PageMessages from '../pages/PageMessages.vue';
import PagePrice from '../pages/PagePrice.vue';
import PagePaymentSuccess from '../pages/PagePaymentSuccess.vue';
import PagePaymentFailure from '../pages/PagePaymentFailure.vue';
import PageSubscriptions from '../pages/PageSubscriptions.vue';
import PageNotifications from '../pages/PageNotifications.vue';
import PagePayouts from '../pages/PagePayouts.vue';
import PagePayments from '../pages/PagePayments.vue';
import AppSide from '../layout/AppSide.vue';
// import AppSideProfile from '../layout/AppSideProfile.vue';
import PageLoginAdmin from '../pages/admin/PageLogin';
import PageDashboardAdmin from '../pages/admin/PageDashboard';
import PageUsersAdmin from '../pages/admin/PageUsers';
import PageUsersEditAdmin from '../pages/admin/PageUsersEdit';
import PageSubscriptionsAdmin from '../pages/admin/PageSubscriptions';
import PagePaymentsAdmin from '../pages/admin/PagePayments';
import PagePayoutsAdmin from '../pages/admin/PagePayouts';
import PagePostsAdmin from '../pages/admin/PagePosts';
import PageArchive from '../pages/PageArchive.vue'
import Store from './Store';

export default [
  {
    path: '/admin',
    component: LayoutAdmin,
    children: [
      {
        path: '/admin',
        components: {
          default: PageDashboardAdmin,
          login: PageLoginAdmin,
        },
      },
      {
        path: '/admin/users/:type?',
        component: PageUsersAdmin,
      },
      {
        path: '/admin/users/edit/:id',
        component: PageUsersEditAdmin,
      },
      {
        path: '/admin/subscriptions/:type?',
        component: PageSubscriptionsAdmin,
      },
      {
        path: '/admin/payments/:type?',
        component: PagePaymentsAdmin,
      },
      {
        path: '/admin/payouts/:type?',
        component: PagePayoutsAdmin,
      },
      {
        path: '/admin/posts',
        component: PagePostsAdmin,
      },
    ],
  },
  {
    path: '/',
    component: LayoutUser,
    children: [
      {
        path: '/payments/:attach?',
        component: PagePayments,
      },
      {
        path: '/payouts',
        component: PagePayouts,
      },
      {
        path: '/notifications',
        component: PageNotifications,
        name: 'notifications',
      },
      {
        path: '/subscriptions',
        component: PageSubscriptions,
        name: 'subscriptions',
      },
      {
        path: '/payment/failure',
        component: PagePaymentFailure,
      },
      {
        path: '/payment/success/:gateway',
        component: PagePaymentSuccess,
      },
      {
        path: '/messages/:id',
        component: PageMessages,
        name: 'messages',
      },
      {
        path: '/messages',
        component: PageMessages,
        name: 'messages',
      },
      {
        path: '/lists',
        component: PageLists,
      },
      {
        path: '/lists/:id',
        component: PageList,
        name: 'list',
      },
      {
        path: '/bookmarks',
        component: PageBookmarks,
      },
      {
        path: '/archive',
        component: PageArchive,
      },
      {
        path: '/forgot',
        components: {
          default: PageForgot,
          login: PageForgot,
        },
      },
      {
        path: '/password-reset',
        components: {
          default: PagePasswordReset,
          login: PagePasswordReset,
        },
      },
      {
        path: '/signup',
        components: {
          default: PageSignup,
          login: PageSignup,
        },
      },
      {
        path: '/settings/price',
        component: PagePrice,
      },
      {
        path: '/settings/email',
        component: PageEmail,
      },
      {
        path: '/settings/password',
        component: PagePassword,
      },
      {
        path: '/settings',
        component: PageSettings,
      },
      {
        path: '/posts/create',
        component: PageNewPost,
      },
      {
        path: '/posts/edit/:id',
        component: PageNewPost,
      },
      {
        path: '/search',
        components: {
          default: PageSearch,
          side: AppSide,
        },
        name: 'search',
      },
      {
        path: '/:id/:username',
        component: PagePost,
      },
      {
        path: '/',
        components: {
          default: PageHome,
          login: PageLogin,
          side: AppSide,
        },
      },
      {
        path: '/welcome',
        components: {
          default: PageHome,
          login: PageWelcome,
          side: AppSide,
        },
      },
      {
        path: '/auth/:provider/callback',
        component: {
          template: '<div class="auth-component"></div>',
        },
      },
    ],
  },
  {
    path: '/:username',
    get component() {
      if (Store.state.token == null) {
        return LayoutNoneUser
      } else {
        return LayoutUser
      }
    },
    children: [
      {
        path: '/:username',
        component: PageUser,
      },
    ],
  },
]