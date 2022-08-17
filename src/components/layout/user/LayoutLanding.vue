<template>
  <div class="d-flex flex-column content landing" >
    <div class="flex-grow-1 d-flex flex-row" v-if="$router.currentRoute.path != '/welcome'" >
      <div class="w-50 promo position-relative d-none d-md-block">
        <div class="middle">
          <h2 style="margin: 0;color: inherit;font-weight: 700;">{{ $t("general.signup-slogan") }}</h2>
        </div>
      </div>
      <div class="w-50 position-relative">
        <div class="middle main main-login" style="padding-top: 30px;padding-bottom: 30px;">
          <!-- <div class="px-5 pb-5">
            <ui-logo class="logo d-md-none text-primary" />
          </div> -->
          <router-view name="login"></router-view>
        </div>
      </div>
    </div>
    <div v-if="$router.currentRoute.path == '/welcome'" style="background-color: rgb(3 15 28);    overflow-x: hidden;">
     <div class="home-slide">
      <div class="home-slide-1">
        <div class="home-slide-2">
          <img src="https://www.ybhltd.com/fanse/fansecreators.png" alt="Creators Avatars" class="creators-home">
          <div class="home-text">
            <h2 class="home-h2">Creators <span class="home-dot">.</span>
            </h2>
            <h2 class="home-h2">Earn <span class="home-dot">.</span>
            </h2>
            <h2 class="home-h2">Freedom <span class="home-dot">!</span>
            </h2>
            <div class="home-describe">
              <h3 class="home-h3">A social subscription platform for all creators to connect with their fans.</h3>
            </div>
          </div>
      <div class="home-login">
        <router-view name="login"></router-view>
          </div>
        </div>
         <div class="box-become" >
        <div class="inner-box"><p class="p-inner">
          <span class="span-box" style="">Welcome to Fanse 👋</span><br>Start Converting your Fans into <br> Paid followers</p>
          <div style="flex: 1 1 0%;">
            <a class="a-box" tabindex="0" href="/payouts">Become a creator</a></div>
        </div>
      </div>
      
<div class="our-faq-wrapper">
  <div class="container">
    <div class="row">
      <div class="col-md-12">

                        <div class="faq-title text-center pb-3">
                            <h2>FAQ</h2>
                        </div>
                    </div>
      <div class="col-lg-6">
        <div class="accordion" id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingThree">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="accordion" id="accordion2">
          <div class="card">
            <div class="card-header" id="heading4">
              <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapse4" class="collapse" aria-labelledby="heading4" data-parent="#accordion2">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="heading5">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse5" aria-expanded="false" aria-controls="collapse5"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapse5" class="collapse" aria-labelledby="heading5" data-parent="#accordion2">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="heading6">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse6" aria-expanded="false" aria-controls="collapse6"> Frequently Asked Questions ? </button>
              </h5>
            </div>
            <div id="collapse6" class="collapse show" aria-labelledby="heading6" data-parent="#accordion2">
              <div class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, numquam quis perferendis beatae? Alias reprehenderit ut voluptatem mollitia sit aut eum ratione laudantium soluta ipsam adipisci, molestias delectus iure. Recusandae? </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
    </div>
    <app-footer />
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
.our-faq-wrapper {
  float: left;
  width: 100%;
  padding: 89px 0 60px;
  background:#f5f5f5;
}

.our-faq-wrapper {
    padding: 90px 0 60px;
  background:#fff;  
}
.accordion .card {
  border: none;
  margin-bottom: 30px;
}
.our-faq-wrapper .btn-link {
  display: block;
  width: 100%;
  text-align: left;
  position: relative;
  background: #242c42;
  color: #fff;
  border-radius: 0;
  padding: 7px 15px 12px;
  font-size: 16px;
  overflow: hidden;
  border: none;
  font-weight:600;  
}
.our-faq-wrapper .btn-link:hover, .our-faq-wrapper .btn-link:focus {
  text-decoration: none;
}
.our-faq-wrapper .btn-link:after {
  position: absolute;
  content: '\f068';
  right: 15px;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  font-family: fontawesome;
}
.our-faq-wrapper .btn-link.collapsed:after {
  content: '\f067';
}
.our-faq-wrapper .btn-link:before {
  position: absolute;
  content: '';
  background: #86bc42;
  -webkit-transform: skew(-35deg);
  transform: skew(-35deg);
  height: 100%;
  width: 50%;
  left: 90%;
  top: 0;
}
.card-header {
  padding: 0;
  background: transparent;
  border-bottom: none;
}
.card-body {
  position: relative;
}
.card-body:after {
  position: absolute;
  content: '';
  height: 2px;
  width: 100%;
  left: 0;
  bottom: 0;
  background: #242c42;
}
.card-body:before {
  position: absolute;
  content: '';
  height: 2px;
  width: 50%;
  left: 0;
  bottom: 0;
  background: #86bc42;
  z-index: 1;
}
.promo {
  background: $primary;
  color: $white;
  .middle {
    width: 100%;
    max-width: 444px;
    .logo {
      height: 4rem;
    }
    h2 {
      font-weight: normal;
    }
  }
}
.home-login{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    font-family: "system-ui";
    position: relative;
    z-index: 2;
}
.home-h3{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    font-family: "system-ui";
    font-size: 1.825rem;
    letter-spacing: 0.00735em;
    text-align: left;
    color: 000;
    line-height: 1;
    font-weight: bold;
}
.home-describe{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    font-family: "system-ui";
    box-sizing: inherit;
    margin-top: 16px;
    padding-right: 24px;
    display: block;
}
.home-dot{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #2081e2cc !important;
    font-family: "system-ui";
    font-weight: bold;
    font-size: 5rem;
    line-height: 1.167;
    text-align: left;
    box-sizing: inherit;
    margin: 0;
}
.home-h2{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    box-sizing: inherit;
    margin: 0;
    color: white;
    font-family: "system-ui";
    font-weight: bold;
    font-size: 5rem;
    letter-spacing: -0.01562em;
    text-align: left;
}
.home-text{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    -webkit-box-flex: 1;
    flex-grow: 1;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-bottom: 32px;
    font-family: "system-ui";
    position: relative;
    z-index: 2;
}
.creators-home{
  -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: #fff;
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: .00938em;
    font-size: 1rem;
    box-sizing: inherit;
    font-family: "system-ui";
    max-height: 100%;
    vertical-align: middle;
    position: absolute;
    top: 0;
    z-index: 1;
    left: -120px;
    max-width: 170%;
    width: auto;
}
.home-slide{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    margin-top: 60px;
    margin-bottom: 160px;
}
.home-slide-1{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    width: 100%;
    margin-left: auto;
    box-sizing: border-box;
    margin-right: auto;
    display: block;
    padding-left: 10px;
    padding-right: 10px;
    max-width: 1150px;
}
.home-slide-2{
      -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    color: white;
    font-family: "system-ui";
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    font-size: 1rem;
    box-sizing: inherit;
    padding-top: 104px;
    position: relative;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: start;
    justify-content: flex-start;
}
.box-become{
    background: linear-gradient(95.92deg, rgba(28, 115, 203, 0.9 ) 0%, rgba(29, 111, 194, 0.9) 20.05%, rgba(61, 133, 205, 0.9) 100%);
    border-radius: 8px;
    margin-bottom: 8px;
    padding: 20px;
    margin-top: 50px;
}
.inner-box{
  width: 100%;
    -webkit-box-align: center;
    align-items: center;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    text-align: -webkit-center !important;

        
}
.p-inner{
  flex: 1 1 0%;
    margin: 10px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: rgb(255, 255, 255);
    text-align: initial;
}
.span-box{
  margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    color: inherit;
    font-weight: bold;
}
.a-box{
    border: none;
    margin: 8px 0px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: 0px;
    border: 0px;
    margin: 0px;
    cursor: pointer;
    user-select: none;
    vertical-align: middle;
    appearance: none;
    text-decoration: none;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.75;
    min-width: 64px;
    width: 90%;
    box-shadow: none;
    border-radius: 25px;
    text-transform: initial;
    white-space: nowrap;
    letter-spacing: 0.025em;
    font-weight: 700;
    transition: color 0.01s ease 0s;
    height: 48px;
    font-size: 1rem;
    padding: 6px 24px;
    background: #fff;
    color: #2196f3;
}
@media (max-width:720px){
.p-inner{
text-align: -webkit-center !important;
}
.inner-box{
display: inherit;
}
  
}

@media only screen and (max-width: 800px) {
 .home-slide-2
{
  display: block !important;
}
.home-slide{
  margin-top: 15px;
}
.home-h3{
font-size: 1.125rem  !important;
text-align: center;
}
.home-h2{
  font-size: 4rem !important;
  line-height: 0.927 !important;
  text-align: center;
}
.home-dot{
  font-size: 3rem  !important;
}
.home-describe{
  text-align: center;
}

}
@media only screen and (min-width: 800px) {
 .main-login
{
  width: 55% !important;
}
}

.main {
  width: 344px;
  .logo {
    width: 80%;
    max-height: 4rem;
    margin: 0 auto;
  }
}
@include media-breakpoint-down(sm) {
  .w-50 {
    width: 100% !important;
  }
  .main {
    width: 90%;
  }
}
</style>
<script>
import AppFooter from "../AppFooter.vue";
export default {
  components: { AppFooter },
  computed: {
    appname() {
      return process.env.VUE_APP_APP_NAME;
    },
    logo() {
      return require("@/assets/logo.svg");
    },
  },
};
</script>