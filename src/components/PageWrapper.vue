<template>
  <div class="outer-wrapper">
    <b-navbar class="hello-nav d-none d-md-flex" align="left">
      <b-nav-item href="#/category/1" class="px-1" :style="isActiveHeader(1)">News</b-nav-item>
      <b-nav-item href="#/category/2" class="px-1" :style="isActiveHeader(2)">Features</b-nav-item>
      <b-nav-item href="#/category/5" class="px-1" :style="isActiveHeader(5)">Sports</b-nav-item>
      <b-nav-item href="#/category/6" class="px-1" :style="isActiveHeader(6)">Entertainment</b-nav-item>
      <b-nav-item href="#/category/4" class="px-1" :style="isActiveHeader(4)">Rabbithole</b-nav-item>
      <b-nav-item href="#/category/8" class="px-1">News in Images</b-nav-item>
      <b-nav-item href="#/archives/0" class="px-1" :style="isActiveHeader('archives')">Archives</b-nav-item>
      <!-- right side of navbar -->
      <b-nav class="orient-right">
        <b-nav-item href="https://twitter.com/theumdhare" v-if="showIcons">
          <icon :icon="['fab', 'twitter']" class="mr-1" id="icon" />
        </b-nav-item>
        <b-nav-item href="https://www.instagram.com/theumdhare/" v-if="showIcons">
          <icon :icon="['fab', 'instagram']" class="mr-1" id="icon" />
        </b-nav-item>
        <b-nav-item href="https://www.facebook.com/TheUMDHare/" v-if="showIcons">
          <icon
            :icon="['fab', 'facebook']"
            class="mr-2"
            id="icon"
            :style="handleNavbarResize('icon')"
          />
        </b-nav-item>
        <form
          class="form-inline my-2 my-lg-0"
          id="searchbar"
          @submit.prevent="submitForm"
          v-if="showSearch"
        >
          <input class="form-control mr-sm-2" type="text" placeholder="Search" v-model="search" />
          <button class="btn btn-secondary my-2 my-sm-0" id="searchbutton" type="submit">Search</button>
        </form>
      </b-nav>
    </b-navbar>

    <router-link to="/">
      <img
        src="/static/banner_square.png"
        alt="square banner"
        width="50%"
        height="50%"
        :style="handleMobileStyle('logo')"
      />
    </router-link>
    <b-navbar
      class="secondary-nav d-none d-md-flex"
      align="left"
      :style="handleMobileStyle('secondary-nav')"
    >
      <b-nav-text id="more">More:</b-nav-text>
      <b-nav-item
        href="https://drive.google.com/file/d/1ouubjkUdwNUXw2EuJrQNblxd0C19TNLu/view?usp=sharing"
        class="px-1"
      >Advertising</b-nav-item>
      <b-nav-item href="mailto:theumdhare@gmail.com" class="px-1">Contact</b-nav-item>
      <b-nav-item
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=B7KG7N8HC9ZPW&source=url"
        class="px-1"
      >Donate</b-nav-item>
      <b-nav-item
        href="https://calendar.google.com/calendar/u/5?cid=NTExdWZoYzVnZ2VycjFiN3ExOGxhcjBobzhAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
        class="px-1"
      >Comedy on Campus</b-nav-item>
      <b-nav-item
        href="https://docs.google.com/spreadsheets/d/e/2PACX-1vRv-wpY_P3w5tB7LnTGdcrMptOkd-AOoxzGYpYn39tv96DJEAugZQJPJj81AONui2wdf9qQGjXp8cBd/pubhtml"
        class="px-1"
      >Our Publishing Schedule</b-nav-item>
      <b-nav-item href="https://theumdhare.buzzsprout.com/" class="px-1">Podcast</b-nav-item>
      <b-nav-item href="http://ter.ps/satire" class="px-1">Jobs</b-nav-item>
      <b-nav-item
        href="https://www.redbubble.com/people/TheUMDHare/shop?asc=u"
        class="px-1"
      >Merchandise</b-nav-item>
      <b-nav-item href="http://ter.ps/submit2hare" class="px-1">Submissions</b-nav-item>
    </b-navbar>

    <hr class="mx-2 mt-2 d-none d-md-block" />
    <div class="pad">
      <loader :loaded="loaded">
        <div class="container-float">
          <div class="row" style="margin-top: 30px" :style="handleMobileStyle('row-main-content')">
            <div class="col-3 just-in" :style="handleMobileStyle('just-in')">
              <just-in-list />
            </div>
            <div class="slot-wrapper">
              <slot></slot>
            </div>
          </div>
        </div>
      </loader>
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import JustInList from "@/components/JustInList";

export default {
  name: "PageWrapper",
  components: {
    Loader,
    JustInList,
  },
  props: {
    loaded: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      search: "",
      showSearch: true,
      showIcons: true,
    };
  },
  methods: {
    isActiveHeader: function (categoryID) {
      if (
        this.$route.name !== "Search" &&
        ((this.$route.params.category &&
          parseInt(this.$route.params.category) === categoryID) ||
          (categoryID === "archives" && this.$route.params.page))
      ) {
        return {
          "text-decoration": "underline",
        };
      }
    },
    submitForm: function () {
      if (this.search.length > 0) {
        this.$router.push("/search/0?searchTerm=" + this.search);
      }
    },
    handleNavbarResize: function () {
      if (window.innerWidth < 1270) {
        this.showIcons = false;
      } else {
        this.showIcons = true;
      }
      if (window.innerWidth < 1120) {
        this.showSearch = false;
      } else {
        this.showSearch = true;
      }
    },
    handleMobileStyle: function (element) {
      let style = {};
      this.$ifOnMobile(
        () => {
          if (element === "just-in" || element === "secondary-nav") {
            style = { display: "none !important" };
          } else if (element === "logo") {
            style = { "margin-top": "2.5rem" };
          } else if (element == "row-main-content") {
            style = {
              display: "flex",
              "justify-content": "center",
            };
          }
        },
        () => {
          if (element === "logo") {
            style = { display: "none" };
          }
        }
      );
      return style;
    },
  },
  created() {
    window.addEventListener("resize", this.handleNavbarResize);
  },
  destroyed() {
    window.removeEventListener("resizee", this.handleNavbarResize);
  },
};
</script>

<style scoped>
#more {
  color: #888888;
  font-weight: bold;
  font-size: 12px;
  margin-top: 2px;
}
.outer-wrapper {
  width: 100%;
  height: 100%;
}
.hello-nav {
  background: #c12a2a;
  list-style: none;
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
}
.secondary-nav {
  background: white;
  width: 100%;
  list-style: none;
  position: fixed;
  top: 50px;
  z-index: 10;
  min-height: 30px;
  display: flex !important;
  flex-wrap: wrap;
}
@media not screen and (max-width: 768px) {
  .pad {
    padding: 5rem 5% 3rem 5%;
  }
}
.nav-link {
  font-family: Arial;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
  color: white;
}

@media screen and (max-width: 768px) {
  .slot-wrapper {
    width: 100%;
    max-width: 90%;
    padding-right: 30px;
    padding-left: 30px;
  }
}
@media not screen and (max-width: 768px) {
  .slot-wrapper {
    width: 100%;
    max-width: 66.666667%;
    padding-right: 15px;
    padding-left: 15px;
  }
}

.secondary-nav .nav-link {
  font-family: "Verdana";
  font-size: 12px;
  font-weight: bold;
  max-height: 34px;
  white-space: nowrap;
  color: #888888;
}
.secondary-nav .navbar-text {
  font-family: "Verdana";
  color: black;
  font-size: 15px;
  padding-left: 1.3rem;
}
.orient-right {
  position: fixed;
  top: 5px;
  right: 0;
  /* margin: 0;
  border: 0;
  padding: 0; */
}

.just-in {
  float: left;
  border-right: 2px solid #dddddd;
}
#searchbar {
  margin-right: 15px;
}

#searchbutton {
  border-color: white;
  background-color: Transparent;
  background-repeat: no-repeat;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}
</style>
