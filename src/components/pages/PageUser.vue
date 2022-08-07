<template>
  <b-row class="profile" v-if="user != null">
    <b-col>
      <b-row
        :class="
          'page-header sticky-top' +
          (isScrolled ? ' scrolled bg-white border-bottom ' : '')
        "
      >
        <div class="d-flex align-items-center w-100 px-3">
          <b-link to="/">
            <i class="bi-arrow-left" />
          </b-link>
          <h6 class="p-0 my-3 mx-2 flex-grow-1 overflow-hidden">
            <ui-username :user="user" :asLink="false" :bold="false" />
            <div  no-caret ><span style="font-size: 0.8rem !important;"> 7 Posts | 1.3k Likes </span></div>
          </h6>
          <b-dropdown no-caret right variant="link" v-if="this.$store.state.currentUser">
            <template slot="button-content"
              ><i class="bi-three-dots-vertical text-white"
            /></template>
            <b-dropdown-item @click.prevent="copyLink">{{
              $t("general.copy-link-to-profile")
            }}</b-dropdown-item>
            <b-dropdown-item @click.prevent="addToList(user)">{{
              $t("general.add-to-list")
            }}</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-row>
      <b-row>
        <div class="bg-light cover w-100 position-relative" style="margin-top: -70px;">
          <b-img :src="user.cover + '?rnd=' + rnd" v-if="user.cover != null" />
        </div>
        <div class="subprofile w-100 d-flex">
          <div class="avatar position-relative ml-3 rounded-circle">
            <b-avatar
              :src="user.avatar + '?rnd=' + rnd"
              :text="user.initials"
              :to="user.url"
              size="100px"
            />
            <div style="position:absolute; bottom: 5px; right: 5px">
              <i style="color: #65D164" class="ml-1 bi bi-circle-fill" v-if="user.online_status"></i>
            </div>
          </div>
          <div class="d-flex mx-2 mt-2 ml-auto" style="font-size: 150%">
            <b-link :to="this.$store.state.token ? '/messages/' + user.id : '/signup'" class="mx-2" v-if="!isOwner">
              <i class="bi-chat" />
            </b-link>
            <b-link class="mx-2" @click.prevent="addToList(user)" v-if="!isOwner">
              <i class="bi-star" />
            </b-link>
            <b-link class="mx-2" @click.prevent="copyLink">
              <i class="bi-box-arrow-up-right" />
            </b-link>
            <b-link :to="'/settings'" class="mx-2" v-if="isOwner">
              <i class="bi-gear" />
            </b-link>
            <b-link @click.prevent="tip" class="mx-2" v-if="!isOwner">
              <i class="bi-coin" />
            </b-link>
          </div>
        </div>
      </b-row>
      <b-row class="px-3 mt-3 d-block border-bottom pb-3 overflow-hidden">
          <div class="d-flex flex-float">
            <ui-username :user="user" :asLink="false" />
          </div>
        <div class="text-muted small small-username">
          {{ "@" + user.username }}
          <span v-if="!user.online_status">&nbsp;&middot;&nbsp;&nbsp;Last seen {{user.time_difference}} {{user.hms}} ago</span>
          <span v-else>&nbsp;&middot;&nbsp;&nbsp;Available now</span>
        </div>
        <UiVueShowMoreText
            :text="user.bio"
            :lines="2"
            additional-content-css="font-size:16px;"
            additional-content-expanded-css="font-size:16px;"
            additional-anchor-css="font-size: 12px;"
            @click="change"
          />
        <div v-if="user.location" class="text-muted small"><i class="bi bi-geo-alt-fill"></i> 
          {{ user.location }} &nbsp;&middot;&nbsp;&nbsp; <b-link target="_blank" :href="user.website">{{
            user.website
          }}</b-link>
        </div>
        <b-link v-if="user.instagram" :to="user.instagram">
            <svg width="90" height="50" viewBox="0 0 179 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="0.5" y="0.5" width="178" height="59" rx="14.5" fill="#F5F6FA"></rect>
<g clip-path="url(#clip0_3_900)">
<path d="M55.3798 21.7542C55.2824 19.6252 54.9443 18.1714 54.4499 16.8994C53.9479 15.5649 53.1605 14.3561 52.1431 13.3569C51.1442 12.3395 49.9351 11.5518 48.6006 11.0495C47.3283 10.5554 45.8748 10.2176 43.7458 10.1208C41.613 10.0232 40.9315 10 35.5 10C30.0685 10 29.387 10.0232 27.2542 10.1202C25.1252 10.2176 23.6717 10.5557 22.3994 11.0501C21.0649 11.5521 19.8561 12.3395 18.8569 13.3569C17.8395 14.3558 17.0518 15.5646 16.5495 16.8991C16.0554 18.1714 15.7176 19.6252 15.6208 21.7538C15.5232 23.887 15.5 24.5682 15.5 29.9997C15.5 35.4315 15.5232 36.113 15.6208 38.2458C15.7179 40.3745 16.056 41.8283 16.5504 43.1006C17.0524 44.4348 17.8398 45.6439 18.8572 46.6428C19.8561 47.6602 21.0652 48.4476 22.3997 48.9496C23.6717 49.4443 25.1255 49.7821 27.2545 49.8795C29.3876 49.9768 30.0688 49.9997 35.5003 49.9997C40.9318 49.9997 41.6133 49.9768 43.7462 49.8795C45.8751 49.7821 47.3286 49.4443 48.6009 48.9496C51.2874 47.9108 53.4111 45.787 54.4499 43.1006C54.9446 41.8283 55.2824 40.3745 55.3798 38.2458C55.4768 36.1127 55.5 35.4315 55.5 30C55.5 24.5682 55.4768 23.887 55.3798 21.7542V21.7542ZM51.7796 38.082C51.6908 40.032 51.3649 41.091 51.0911 41.7957C50.4182 43.54 49.0397 44.9185 47.2953 45.5914C46.5907 45.8652 45.5317 46.1911 43.5817 46.2799C41.4732 46.3763 40.8406 46.3965 35.5 46.3965C30.1591 46.3965 29.5268 46.3763 27.418 46.2799C25.4683 46.1911 24.4093 45.8652 23.7043 45.5914C22.8358 45.2707 22.05 44.7595 21.4048 44.0952C20.7405 43.45 20.2293 42.6645 19.9086 41.7957C19.6348 41.091 19.3089 40.032 19.2201 38.082C19.124 35.9732 19.1035 35.3406 19.1035 30.0003C19.1035 24.6597 19.124 24.0274 19.2201 21.9183C19.3092 19.9683 19.6348 18.9093 19.9086 18.2047C20.2293 17.3358 20.7408 16.55 21.4048 15.9048C22.05 15.2405 22.8358 14.7293 23.7047 14.4089C24.4093 14.1348 25.4683 13.8092 27.4183 13.7201C29.5271 13.624 30.1597 13.6035 35.5 13.6035H35.4997C40.84 13.6035 41.4726 13.624 43.5817 13.7204C45.5317 13.8092 46.5904 14.1351 47.2953 14.4089C48.1639 14.7296 48.9497 15.2408 49.5948 15.9048C50.2592 16.55 50.7704 17.3358 51.0908 18.2047C51.3649 18.9093 51.6908 19.9683 51.7796 21.9183C51.8757 24.0271 51.8962 24.6597 51.8962 30C51.8962 35.3406 51.876 35.9729 51.7796 38.082Z" fill="url(#paint0_linear_3_900)"></path>
<path d="M35.4997 19.7296C29.8277 19.7296 25.2296 24.328 25.2296 30C25.2296 35.672 29.8277 40.2701 35.4997 40.2701C41.172 40.2701 45.7701 35.672 45.7701 30C45.7701 24.328 41.172 19.7296 35.4997 19.7296V19.7296ZM35.4997 36.6666C31.8181 36.6663 28.8331 33.6816 28.8334 29.9997C28.8334 26.3181 31.8181 23.3331 35.5 23.3331C39.1819 23.3334 42.1666 26.3181 42.1666 29.9997C42.1666 33.6816 39.1816 36.6666 35.4997 36.6666V36.6666Z" fill="url(#paint1_linear_3_900)"></path>
<path d="M48.5759 19.324C48.5759 20.6494 47.5013 21.7239 46.176 21.7239C44.8503 21.7239 43.7758 20.6494 43.7758 19.324C43.7758 17.9984 44.8503 16.9238 46.176 16.9238C47.5013 16.9238 48.5759 17.9984 48.5759 19.324V19.324Z" fill="url(#paint2_linear_3_900)"></path>
</g>
<path d="M71.2926 22.4545V37H69.098V22.4545H71.2926ZM76.4418 30.5227V37H74.3182V26.0909H76.3565V27.8665H76.4915C76.7424 27.2888 77.1354 26.8248 77.6705 26.4744C78.2102 26.1241 78.8897 25.9489 79.7088 25.9489C80.4522 25.9489 81.1032 26.1051 81.6619 26.4176C82.2206 26.7254 82.6539 27.1847 82.9616 27.7955C83.2694 28.4062 83.4233 29.1615 83.4233 30.0611V37H81.2997V30.3168C81.2997 29.526 81.0938 28.9081 80.6818 28.4631C80.2699 28.0133 79.7041 27.7884 78.9844 27.7884C78.492 27.7884 78.054 27.8949 77.6705 28.108C77.2917 28.321 76.991 28.6335 76.7685 29.0455C76.5507 29.4527 76.4418 29.9451 76.4418 30.5227ZM94.446 28.7543L92.5213 29.0952C92.4408 28.849 92.313 28.6146 92.1378 28.392C91.9673 28.1695 91.7353 27.9872 91.4418 27.8452C91.1482 27.7031 90.7813 27.6321 90.3409 27.6321C89.7396 27.6321 89.2377 27.767 88.8352 28.0369C88.4328 28.3021 88.2315 28.6454 88.2315 29.0668C88.2315 29.4313 88.3665 29.7249 88.6364 29.9474C88.9063 30.17 89.3419 30.3523 89.9432 30.4943L91.6761 30.892C92.6799 31.1241 93.428 31.4815 93.9205 31.9645C94.4129 32.4474 94.6591 33.0748 94.6591 33.8466C94.6591 34.5 94.4697 35.0824 94.0909 35.5938C93.7169 36.1004 93.1937 36.4981 92.5213 36.7869C91.8537 37.0758 91.0795 37.2202 90.1989 37.2202C88.9773 37.2202 87.9806 36.9598 87.2088 36.4389C86.437 35.9134 85.9635 35.1676 85.7884 34.2017L87.8409 33.8892C87.9688 34.4242 88.2315 34.8291 88.6293 35.1037C89.027 35.3736 89.5455 35.5085 90.1847 35.5085C90.8807 35.5085 91.437 35.3641 91.8537 35.0753C92.2704 34.7817 92.4787 34.4242 92.4787 34.0028C92.4787 33.6619 92.3509 33.3755 92.0952 33.1435C91.8442 32.9115 91.4583 32.7363 90.9375 32.6179L89.0909 32.2131C88.0729 31.9811 87.3201 31.6117 86.8324 31.1051C86.3494 30.5985 86.108 29.9569 86.108 29.1804C86.108 28.5365 86.2879 27.973 86.6477 27.4901C87.0076 27.0071 87.5047 26.6307 88.1392 26.3608C88.7737 26.0862 89.5005 25.9489 90.3196 25.9489C91.4986 25.9489 92.4266 26.2045 93.1037 26.7159C93.7808 27.2225 94.2282 27.902 94.446 28.7543ZM102.086 26.0909V27.7955H96.1275V26.0909H102.086ZM97.7255 23.4773H99.8491V33.7969C99.8491 34.2088 99.9106 34.5189 100.034 34.7273C100.157 34.9309 100.315 35.0705 100.51 35.1463C100.708 35.2173 100.924 35.2528 101.156 35.2528C101.326 35.2528 101.475 35.241 101.603 35.2173C101.731 35.1937 101.831 35.1747 101.902 35.1605L102.285 36.9148C102.162 36.9621 101.987 37.0095 101.76 37.0568C101.532 37.1089 101.248 37.1373 100.907 37.142C100.349 37.1515 99.8278 37.0521 99.3448 36.8438C98.8619 36.6354 98.4712 36.3134 98.1729 35.8778C97.8746 35.4422 97.7255 34.8954 97.7255 34.2372V23.4773ZM107.61 37.2415C106.919 37.2415 106.294 37.1136 105.735 36.858C105.176 36.5975 104.734 36.2211 104.407 35.7287C104.085 35.2363 103.924 34.6326 103.924 33.9176C103.924 33.3021 104.042 32.7955 104.279 32.3977C104.516 32 104.835 31.6851 105.238 31.4531C105.64 31.2211 106.09 31.0459 106.587 30.9276C107.085 30.8092 107.591 30.7192 108.107 30.6577C108.761 30.5819 109.291 30.5204 109.698 30.473C110.105 30.4209 110.401 30.3381 110.586 30.2244C110.771 30.1108 110.863 29.9261 110.863 29.6705V29.6207C110.863 29.0005 110.688 28.5199 110.337 28.179C109.992 27.8381 109.476 27.6676 108.789 27.6676C108.074 27.6676 107.511 27.8262 107.099 28.1435C106.692 28.456 106.41 28.804 106.254 29.1875L104.258 28.733C104.495 28.0701 104.84 27.535 105.295 27.1278C105.754 26.7159 106.282 26.4176 106.879 26.233C107.475 26.0436 108.103 25.9489 108.761 25.9489C109.196 25.9489 109.658 26.0009 110.146 26.1051C110.638 26.2045 111.097 26.3892 111.523 26.6591C111.954 26.929 112.307 27.3149 112.582 27.8168C112.856 28.3139 112.994 28.9602 112.994 29.7557V37H110.92V35.5085H110.835C110.697 35.7831 110.491 36.053 110.217 36.3182C109.942 36.5833 109.589 36.8035 109.158 36.9787C108.728 37.1539 108.211 37.2415 107.61 37.2415ZM108.072 35.5369C108.659 35.5369 109.161 35.4209 109.577 35.1889C109.999 34.9569 110.318 34.6539 110.536 34.2798C110.759 33.901 110.87 33.4962 110.87 33.0653V31.6591C110.794 31.7348 110.647 31.8059 110.43 31.8722C110.217 31.9337 109.973 31.9882 109.698 32.0355C109.424 32.0781 109.156 32.1184 108.896 32.1562C108.635 32.1894 108.417 32.2178 108.242 32.2415C107.83 32.2936 107.454 32.3812 107.113 32.5043C106.777 32.6274 106.507 32.8049 106.303 33.0369C106.104 33.2642 106.005 33.5672 106.005 33.946C106.005 34.4716 106.199 34.8693 106.587 35.1392C106.976 35.4044 107.47 35.5369 108.072 35.5369ZM120.396 41.3182C119.529 41.3182 118.784 41.2045 118.159 40.9773C117.538 40.75 117.032 40.4493 116.639 40.0753C116.246 39.7012 115.952 39.2917 115.758 38.8466L117.583 38.0938C117.711 38.3021 117.882 38.5223 118.095 38.7543C118.313 38.991 118.606 39.1922 118.975 39.358C119.35 39.5237 119.83 39.6065 120.417 39.6065C121.222 39.6065 121.887 39.41 122.413 39.017C122.939 38.6288 123.201 38.0085 123.201 37.1562V35.0114H123.066C122.939 35.2434 122.754 35.5014 122.512 35.7855C122.276 36.0696 121.949 36.3158 121.532 36.5241C121.116 36.7325 120.574 36.8366 119.906 36.8366C119.044 36.8366 118.268 36.6354 117.576 36.233C116.89 35.8258 116.345 35.2268 115.943 34.4361C115.545 33.6406 115.346 32.6629 115.346 31.5028C115.346 30.3428 115.543 29.3485 115.936 28.5199C116.333 27.6913 116.878 27.0568 117.569 26.6165C118.261 26.1714 119.044 25.9489 119.92 25.9489C120.597 25.9489 121.144 26.0625 121.561 26.2898C121.977 26.5123 122.302 26.7727 122.534 27.071C122.77 27.3693 122.953 27.6321 123.081 27.8594H123.237V26.0909H125.318V37.2415C125.318 38.179 125.1 38.9484 124.664 39.5497C124.229 40.151 123.639 40.5961 122.896 40.8849C122.157 41.1738 121.324 41.3182 120.396 41.3182ZM120.375 35.0753C120.985 35.0753 121.502 34.9332 121.923 34.6491C122.349 34.3603 122.671 33.9484 122.889 33.4134C123.111 32.8736 123.223 32.2273 123.223 31.4744C123.223 30.7405 123.114 30.0942 122.896 29.5355C122.678 28.9768 122.359 28.5412 121.937 28.2287C121.516 27.9115 120.995 27.7528 120.375 27.7528C119.735 27.7528 119.203 27.9186 118.777 28.25C118.35 28.5767 118.029 29.0218 117.811 29.5852C117.598 30.1487 117.491 30.7784 117.491 31.4744C117.491 32.1894 117.6 32.8168 117.818 33.3565C118.036 33.8963 118.358 34.3177 118.784 34.6207C119.215 34.9238 119.745 35.0753 120.375 35.0753ZM128.166 37V26.0909H130.218V27.8239H130.332C130.531 27.2367 130.881 26.7751 131.383 26.4389C131.89 26.098 132.463 25.9276 133.102 25.9276C133.234 25.9276 133.391 25.9323 133.571 25.9418C133.755 25.9512 133.9 25.9631 134.004 25.9773V28.0085C133.919 27.9848 133.767 27.9588 133.549 27.9304C133.332 27.8973 133.114 27.8807 132.896 27.8807C132.394 27.8807 131.947 27.9872 131.554 28.2003C131.165 28.4086 130.858 28.6998 130.63 29.0739C130.403 29.4432 130.289 29.8646 130.289 30.3381V37H128.166ZM138.919 37.2415C138.227 37.2415 137.602 37.1136 137.044 36.858C136.485 36.5975 136.042 36.2211 135.716 35.7287C135.394 35.2363 135.233 34.6326 135.233 33.9176C135.233 33.3021 135.351 32.7955 135.588 32.3977C135.824 32 136.144 31.6851 136.547 31.4531C136.949 31.2211 137.399 31.0459 137.896 30.9276C138.393 30.8092 138.9 30.7192 139.416 30.6577C140.069 30.5819 140.6 30.5204 141.007 30.473C141.414 30.4209 141.71 30.3381 141.895 30.2244C142.079 30.1108 142.172 29.9261 142.172 29.6705V29.6207C142.172 29.0005 141.996 28.5199 141.646 28.179C141.3 27.8381 140.784 27.6676 140.098 27.6676C139.383 27.6676 138.819 27.8262 138.407 28.1435C138 28.456 137.718 28.804 137.562 29.1875L135.566 28.733C135.803 28.0701 136.149 27.535 136.603 27.1278C137.063 26.7159 137.591 26.4176 138.187 26.233C138.784 26.0436 139.411 25.9489 140.069 25.9489C140.505 25.9489 140.967 26.0009 141.454 26.1051C141.947 26.2045 142.406 26.3892 142.832 26.6591C143.263 26.929 143.616 27.3149 143.89 27.8168C144.165 28.3139 144.302 28.9602 144.302 29.7557V37H142.228V35.5085H142.143C142.006 35.7831 141.8 36.053 141.525 36.3182C141.251 36.5833 140.898 36.8035 140.467 36.9787C140.036 37.1539 139.52 37.2415 138.919 37.2415ZM139.38 35.5369C139.967 35.5369 140.469 35.4209 140.886 35.1889C141.307 34.9569 141.627 34.6539 141.845 34.2798C142.067 33.901 142.179 33.4962 142.179 33.0653V31.6591C142.103 31.7348 141.956 31.8059 141.738 31.8722C141.525 31.9337 141.281 31.9882 141.007 32.0355C140.732 32.0781 140.465 32.1184 140.204 32.1562C139.944 32.1894 139.726 32.2178 139.551 32.2415C139.139 32.2936 138.762 32.3812 138.422 32.5043C138.085 32.6274 137.815 32.8049 137.612 33.0369C137.413 33.2642 137.314 33.5672 137.314 33.946C137.314 34.4716 137.508 34.8693 137.896 35.1392C138.284 35.4044 138.779 35.5369 139.38 35.5369ZM147.131 37V26.0909H149.169V27.8665H149.304C149.531 27.2652 149.903 26.7964 150.419 26.4602C150.935 26.1193 151.553 25.9489 152.273 25.9489C153.002 25.9489 153.613 26.1193 154.105 26.4602C154.602 26.8011 154.969 27.2699 155.206 27.8665H155.32C155.58 27.2841 155.994 26.8201 156.562 26.4744C157.131 26.1241 157.808 25.9489 158.594 25.9489C159.583 25.9489 160.391 26.259 161.016 26.8793C161.645 27.4995 161.96 28.4347 161.96 29.6847V37H159.837V29.8835C159.837 29.1449 159.635 28.6098 159.233 28.2784C158.83 27.947 158.35 27.7812 157.791 27.7812C157.1 27.7812 156.562 27.9943 156.179 28.4205C155.795 28.8419 155.604 29.384 155.604 30.0469V37H153.487V29.7486C153.487 29.1567 153.303 28.6809 152.933 28.321C152.564 27.9612 152.083 27.7812 151.491 27.7812C151.089 27.7812 150.717 27.8878 150.376 28.1009C150.04 28.3092 149.768 28.6004 149.56 28.9744C149.356 29.3485 149.254 29.7817 149.254 30.2741V37H147.131Z" fill="black"></path>
<rect x="0.5" y="0.5" width="178" height="59" rx="14.5" stroke="#DEDEDE"></rect>
<defs>
<linearGradient id="paint0_linear_3_900" x1="18.8567" y1="46.6429" x2="52.1433" y2="13.3564" gradientUnits="userSpaceOnUse">
<stop stop-color="#FFD600"></stop>
<stop offset="0.5" stop-color="#FF0100"></stop>
<stop offset="1" stop-color="#D800B9"></stop>
</linearGradient>
<linearGradient id="paint1_linear_3_900" x1="28.2377" y1="37.262" x2="42.762" y2="22.7377" gradientUnits="userSpaceOnUse">
<stop stop-color="#FF6400"></stop>
<stop offset="0.5" stop-color="#FF0100"></stop>
<stop offset="1" stop-color="#FD0056"></stop>
</linearGradient>
<linearGradient id="paint2_linear_3_900" x1="44.4788" y1="21.0209" x2="47.8729" y2="17.6269" gradientUnits="userSpaceOnUse">
<stop stop-color="#F30072"></stop>
<stop offset="1" stop-color="#E50097"></stop>
</linearGradient>
<clipPath id="clip0_3_900">
<rect width="40" height="40" fill="white" transform="translate(15.5 10)"></rect>
</clipPath>
</defs>
            </svg>
      </b-row>
      <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="!user.isSubscribed && !isOwner"
      >
        <h5 class="mb-3">{{ $t("general.subscription") }}</h5>
        <b-button variant="primary" block @click.prevent="subscribe">
          {{
            $t("general.subscribe-for-x", [
              user.isFree ? $t("general.free") : user.priceFormatted,
            ])
          }}
        </b-button>
      </b-row>
      <b-row
        class="px-3 mt-3 d-block border-bottom pb-3"
        v-if="
          !isOwner &&
          !user.isSubscribed &&
          !user.isFree &&
          user.bundles.length > 0
        "
      >
        <h5 class="mb-3">{{ $t("general.subscription-bundles") }}</h5>
        <b-button
          variant="primary"
          block
          @click.prevent="subscribe(item)"
          v-for="(item, index) in user.bundles"
          :key="index"
        >
          {{ $t("general.get-x-months-for-y-z-off", item.title(user)) }}
        </b-button>
      </b-row>
      <b-row class="d-block" v-if="isOwner">
        <b-nav tabs justified>
          <b-nav-item
            :active="postsType == types.active"
            @click.prevent="updatePosts(types.active)"
            >{{ $t("general.posts") }}</b-nav-item
          >
          <b-nav-item
            :active="postsType == types.scheduled"
            @click.prevent="updatePosts(types.scheduled)"
            >{{ $t("general.scheduled") }}</b-nav-item
          >
          <b-nav-item
            :active="postsType == types.expired"
            @click.prevent="updatePosts(types.expired)"
            >{{ $t("general.expired") }}</b-nav-item
          >
        </b-nav>
      </b-row>
      <ui-posts v-model="posts" />
    </b-col>
  </b-row>
</template>
<style lang="scss" scoped>
.profile {
  .page-header {
    top: -56px;
    transition: top 0.2s;
    color: white;
    .btn,
    a:not(.dropdown-item) {
      padding: 0;
      color: white;
    }
    &.scrolled {
      top: 0;
      margin-bottom: 0;
      color: black;
      .btn,
      a {
        color: black;
      }
    }
  }
  .cover {
    height: 180px;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: #000;
      opacity: 0.2;
      pointer-events: none;
      content: "";
      z-index: 3;
    }
    img {
      -o-object-fit: cover;
      object-fit: cover;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
  .avatar {
    margin-top: -50px;
    z-index: 3;
  }
}
</style>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.nav-tabs .nav-link {
  border: none;
  border-bottom: 2px solid transparent;
  border-radius: 0;
  color: $secondary;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: $primary;
  border-color: $primary;
}
</style>
<script>
import Post from "../models/Post";
import User from "../models/User";
import UiPosts from "../ui/UiPosts.vue";
import Payment from "../models/Payment";
import UiUsername from "../ui/UiUsername.vue";
import UiVueShowMoreText from "../ui/UiVueShowMoreText.vue";

export default {
  components: { UiPosts, UiUsername,UiVueShowMoreText },
  data: function () {
    return {
      user: null,
      posts: [],
      scrollPosition: null,
      page: 1,
      hasMore: false,
      isLoading: false,
      rnd: Math.random(),
      postsType: Post.TYPE_ACTIVE,
    };
  },
  computed: {
    isScrolled: function () {
      return this.scrollPosition >= 180;
    },
    isOwner: function () {
      if (this.$store.state.currentUser) return this.user.id == this.$store.state.currentUser.id;
      else return false;
    },
    username: function () {
      return this.$route.params.username;
    },
    types: function () {
      return {
        active: Post.TYPE_ACTIVE,
        scheduled: Post.TYPE_SCHEDULED,
        expired: Post.TYPE_EXPIRED,
      };
    },
  },
  watch: {
    
    username: function (oldV, newV) {
      if (oldV && newV && oldV != newV) {
        this.reset();
        this.loadUser();
      }
    },
  },
  mounted() {
    this.loadUser();
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    change(showAll) {
      console.log(showAll)
    },
    updatePosts(type) {
      this.postsType = type;
      this.reset();
      this.loadPosts();
    },
    reset() {
      this.isLoading = false;
      this.hasMore = false;
      this.page = 1;
      this.posts = [];
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
      const scrollPosition = window.innerHeight + window.scrollY;
      if (
        document.body.offsetHeight &&
        scrollPosition &&
        document.body.offsetHeight - scrollPosition <= 1000 &&
        !this.isLoading &&
        this.hasMore
      ) {
        this.loadMore();
      }
    },
    loadUser() {
      if (this.$store.state.token){
        this.$get(
          "/users/" + this.username,
          (data) => {
            this.user = new User(data);
            this.loadPosts();
          },
          (errors) => {
            console.log(errors);
          }
        );
      } else {
        this.$get(
          "/users/guest/" + this.username,
          (data) => {
            this.user = new User(data);
            this.loadPosts();
          },
          (errors) => {
            console.log(errors);
          }
        );
      }
      
    },
    loadPosts() {
      this.isLoading = true;
      if (this.$store.state.token){
        this.$get(
          "/posts/user/" +
            this.user.id +
            "?page=" +
            this.page +
            "&type=" +
            this.postsType,
          (data) => {
            let posts = [...this.posts];
            for (let obj of data.data) {
              posts.push(new Post(obj));
            }
            this.posts = posts;
            this.hasMore = data.next_page_url != null;
            this.isLoading = true;
          },
          (errors) => {
            console.log(errors);
          }
        );
      } else{
        this.$get(
          "/posts/guest/" +
            this.user.id +
            "?page=" +
            this.page +
            "&type=" +
            this.postsType,
          (data) => {
            let posts = [...this.posts];
            for (let obj of data.data) {
              posts.push(new Post(obj));
            }
            this.posts = posts;
            this.hasMore = data.next_page_url != null;
            this.isLoading = true;
          },
          (errors) => {
            console.log(errors);
          }
        );
      }
      
    },
    loadMore() {
      if (this.hasMore) {
        this.page = this.page + 1;
        this.loadPosts();
      }
    },
    copyLink() {
      const link = `${process.env.VUE_APP_APP_URL}${this.user.url}`;
      this.$copyText(link);
      this.$bvToast.toast(this.$t("general.link-copied"), {
        autoHideDelay: 2000,
        title: this.$t("general.link"),
        solid: true,
        toaster: "b-toaster-bottom-left",
      });
    },
    addToList(user) {
      if (this.$store.state.token) this.$store.state.addToListUser = user;
      else window.location.href="/signup"
    },
    subscribe(bundle) {
      if (!this.$store.state.currentUser) {
        window.location.href = "/signup"
      } else if (this.user.isFree) {
        this.$post(
          "/subscribe/" + this.user.id,
          {},
          () => {
            this.reset();
            this.loadUser();
          },
          (errors) => {
            console.log(errors);
          }
        );
      } else {
        this.$buyItem({
          type: Payment.TYPE_SUBSCRIPTION_NEW,
          user: this.user,
          bundle: bundle,
        });
      }
    },
    tip() {
      if (this.$store.state.token) {
        this.$buyItem({
        type: Payment.TYPE_TIP,
        user: this.user,
      });
      } else {
        window.location.href="/?next='/adminuser'"
      }
      
    },
  },
};
</script>
