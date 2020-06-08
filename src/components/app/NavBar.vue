<template>
  <div class="stas_navbar">
    <nav>
      <div class="nav-wrapper">
        <div class="navbar-left">
          <a href="#" class="brand-logo" @click.prevent="$emit('open_close_click')">
            <i class="material-icons">dehaze</i>
          </a>
          <span class="time" style="padding-left: 3rem;">{{ my_date | date('datetime')}}</span>
        </div>
        <!-- right -->
        <ul id="nav-mobile" class="right">
          <li>
            <a
              ref="dropdown"
              id="dropdown_triger"
              class="dropdown-trigger dropdown_custom"
              data-target="dropdown1"
            >
              <span class="name_dropdown" style="text-transform: uppercase;">{{ info.name }}</span>
              <i ref="icon_user" class="large material-icons user_name_icon">expand_more</i>
            </a>

            <ul id="dropdown1" style="min-width:150px;" class="dropdown-content">
              <li class="drop_element">
                <router-link to="/profile">
                  <i class="material-icons">insert_emoticon</i>
                  <span>{{ 'profile' | localize }}</span>
                </router-link>
              </li>
              <li class="drop_element">
                <a href="#" @click.prevent="logaut_app">
                  <i class="material-icons">screen_share</i>

                  <span>{{ 'exit' | localize }}</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["info"])
  },
  data() {
    return {
      my_date: new Date(),
      interval: null,
      dropdown: null
    };
  },
  methods: {
    ...mapActions(["logaut"]),
    logaut_app() {
      this.logaut().then(() => this.$router.push("/login?message=logaut"));
    }
  },
  mounted() {
    this.interval = setInterval(res => {
      this.my_date = new Date();
    }, 1000);

    const elems = document.querySelectorAll(".dropdown-trigger");

    this.dropdown = M.Dropdown.init(elems, {
      onOpenEnd: () => {
        if (this.$refs.icon_user) {
          this.$refs.icon_user.classList.add("active");
        }
      },
      onCloseEnd: () => {
        if (this.$refs.icon_user) {
          this.$refs.icon_user.classList.remove("active");
        }
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy();
    }
  }
};
</script>

<style lang="scss">
@import "@/sass/index.scss";
.stas_navbar {
  position: relative;
  z-index: 100;
  .navbar-left {
    display: inline-block;
  }
  .nav-wrapper {
    background-color: $nav_color;
    padding: 0 2rem;
    a.brand-logo:hover {
      background-color: transparent;
    }
    .dropdown_custom {
      display: flex;
      .user_name_icon {
        margin-left: 5px;
        transform: rotate(0deg);
        transition: transform 0.2s;
        &.active {
          transform: rotate(180deg);
          transition: transform 0.2s;
        }
      }
    }
    .dropdown-content {
      top: -55px;
      .drop_element {
        span,
        i {
          color: black;
        }
        i {
          transform: translateY(1px);
        }
        span {
          font-weight: 500;
        }
      }
    }
  }
  @media screen and (max-width: 992px) {
    .brand-logo {
      left: 3rem;
    }
  }
  @media all and (max-width: 576px) {
    .time {
      display: none;
    }
    .brand-logo{
      transform: translateY(-30px);
      left: 2rem;
    }
  }
}
</style>