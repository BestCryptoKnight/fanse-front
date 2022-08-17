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
      <section class="faq">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-xl-8 col-lg-8 text-center">
                    <div class="section-title">
                        <h4>FAQ's</h4>
                        <h2>Frequently Asking <span>Question’s</span></h2>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col-xl-12 col-lg-12">
                    <div class="accordion" id="accordionExample">
                        <div class="row">
                            <div class="col-xl-6 col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                What is Lorem Ipsum?
                                            </button>
                                        </h5>
                                    </div>
    
                                    <div id="collapseOne" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                                        </div>
                                    </div>
                                </div>
    
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                Where does it come from?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseTwo" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
                                        </div>
                                    </div>
                                </div>
    
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                               Why do we use it?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapseThree" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. 
                                        </div>
                                    </div>
                                </div>
    
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapse4" aria-expanded="false" aria-controls="collapseThree">
                                                Where can I get some?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse4" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                            <div class="col-xl-6 col-lg-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapse5" aria-expanded="false" aria-controls="collapseOne">
                                                What is Lorem Ipsum?
                                            </button>
                                        </h5>
                                    </div>
    
                                    <div id="collapse5" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer.
                                        </div>
                                    </div>
                                </div>
    
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapse6" aria-expanded="false" aria-controls="collapseTwo">
                                                Where does it come from?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse6" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. 
                                        </div>
                                    </div>
                                </div>
    
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapse7" aria-expanded="false" aria-controls="collapseThree">
                                                Why do we use it?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse7" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        <h5 class="mb-0">
                                            <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                                                data-target="#collapse8" aria-expanded="false" aria-controls="collapseThree">
                                                Where can I get some?
                                            </button>
                                        </h5>
                                    </div>
                                    <div id="collapse8" class="collapse" data-parent="#accordionExample">
                                        <div class="card-body">
                                            
                                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                                        </div>
                                    </div>
                                </div>
    
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
            </div>
        </div>
    </section>
      </div>
    </div>
    </div>
    <app-footer />
  </div>
</template>
<style scoped lang="scss">
@import "~@/assets/scss/_variables.scss";
h1 {
	color: #ff008b;
}
h2 {
	color: #ff008b;
}
h3 {
	color: #ff008b;
}
h4 {
	color: #ff008b;
}
h5 {
	color: #ff008b;
}
h6 {
	color: #ff008b;
}
section {
	padding: 60px;
}
a {
	text-decoration: none;
	outline: none;
	&:hover {
		text-decoration: none;
		outline: none;
	}
	&:focus {
		text-decoration: none;
		outline: none;
	}
	&:active {
		text-decoration: none;
		outline: none;
	}
}
ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
.faq {
	padding: 120px 0 90px;
	background: #f7fbff;
	min-height: 100vh;
	.section-title {
		margin-bottom: 54px;
		h2 {
			margin-bottom: 22px;
		}
	}
	.accordion {
		.card {
			border: none;
			margin-bottom: 30px;
			&:not(:first-of-type) {
				.card-header {
					&:first-child {
						border-radius: 10px;
					}
				}
			}
			.card-header {
				border: none;
				border-radius: 10px;
				padding: 0;
				h5 {
					padding: 0;
					button {
						color: #1e3056;
						font-size: 18px;
						font-weight: 500;
						text-decoration: none;
						padding: 0 30px 0 70px;
						height: 80px;
						display: block;
						width: 100%;
						color: rgba(30, 48, 86, 0.8);
						text-align: left;
						background: #fff;
						-webkit-box-shadow: 0px -50px 140px 0px rgba(69, 81, 100, 0.1);
						box-shadow: 0px -50px 140px 0px rgba(69, 81, 100, 0.1);
						border-radius: 10px 10px 0 0;
						position: relative;
						&:after {
							position: absolute;
							left: 30px;
							top: 50%;
							margin-top: -10px;
							width: 20px;
							height: 20px;
							background-color: transparent;
							color: #ff5f74;
							text-align: center;
							border: 1px solid #ff5f74;
							border-radius: 50%;
							line-height: 100%;
							content: '\f067';
							font-size: 10px;
							line-height: 18px;
							font-family: "Font Awesome 5 Free";
							font-weight: 900;
						}
					}
					button.collapsed {
						background: #fff;
						border-radius: 10px;
						-webkit-box-shadow: none;
						box-shadow: none;
						border: 1px solid rgba(97, 125, 255, 0.2);
					}
					button[aria-expanded="true"] {
						&:after {
							content: '\f068';
							color: #fff;
							background-image: -webkit-linear-gradient(-180deg, #5e7eff 0%, #ff5f74 30%, #a85fff 100%);
						}
					}
				}
			}
			.card-body {
				-webkit-box-shadow: 0px 15px 140px 0px rgba(69, 81, 100, 0.1);
				box-shadow: 0px 15px 140px 0px rgba(69, 81, 100, 0.1);
				border-radius: 0 0 10px 10px;
				padding-top: 0;
				margin-top: -6px;
				padding-left: 72px;
				padding-right: 70px;
				padding-bottom: 23px;
				color: rgba(30, 48, 86, 0.8);
				line-height: 30px;
			}
		}
	}
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