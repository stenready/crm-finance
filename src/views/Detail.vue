<template>
  <div class="detail">
    <Loader v-if="loading" />

    <div v-else>
      <ModalRemove :modal_details="modal_details" @delete_elem="remove_record" />
      <div class="nav-wrapper">
        <div>
          <router-link tag="a" to="/history" class="breadcrumb">{{ 'history' | localize }}</router-link>
          <a
            href="#!"
            class="breadcrumb"
            :class="[my_record.button_class]"
          >{{ my_record.type_text | localize }}</a>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[my_record.card_class]">
            <div class="card-content white-text">
              <p>
                <span class="title_detail">{{ 'Description' | localize }}</span>
                <span class="body_detail">{{ my_record.description }}</span>
              </p>
              <p>
                <span class="title_detail">{{ 'amount' | localize }}</span>
                <span class="body_detail">{{ my_record.amount }} UAH</span>
              </p>
              <p>
                <span class="title_detail">{{ 'category' | localize }}</span>
                <span class="body_detail">{{ my_record.category }}</span>
              </p>
              <small style="font-weight: 500">{{ my_record.date | date('date') }}</small>
              <div style="margin-top: 1.5rem;">
                <!-- <button
                  style="margin-right: 1rem"
                  type="button"
                  class="waves-effect waves-light btn-small"
                  :class="[my_record.button_class]"
                >{{ 'update' | localize }}</button> -->
                <button
                  type="button"
                  :data-target="modal_details.id"
                  class="waves-effect waves-light btn-small modal-trigger"
                  :class="[my_record.button_class]"
                >{{ 'deletex' | localize }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalRemove from "../components/DetailRemoveModal";
export default {
  name: "one_detail",
  metaInfo() {
    return {
      title: this.$title("one_page")
    };
  },
  data() {
    return {
      my_record: null,
      loading: true,
      modal_details: {
        id: new Date().toString(),
        title: "Удаление",
        text: "Вы уверенны что хотите удалить данный елемент?"
      }
    };
  },
  methods: {
    async remove_record() {
      try {
        await this.$store.dispatch("delete_record_by_id", this.my_record);
        this.$router.push("/history");
      } catch (e) {}
    }
  },
  async mounted() {
    try {
      const id = this.$route.params.id;
      const record = await this.$store.dispatch("fetch_record_by_id", id);
      const category = await this.$store.dispatch(
        "fetch_category_by_id",
        record.categoryId
      );
      this.loading = false;
      this.my_record = {
        ...record,
        category: category.title,
        card_class: record.type === "income" ? "green" : "red",
        button_class: record.type === "income" ? "income" : "outcome",
        type_text: record.type === "income" ? "Доход" : "Расход"
      };
    } catch (e) {}
  },
  components: {
    ModalRemove
  }
};
</script>

<style lang="scss">
.detail {
  p {
    margin: 0.5rem 0 !important;
  }
  .title_detail {
    font-size: 1.3rem;
    font-weight: 500;
    margin-right: 1rem;
  }
  .outcome {
    background: coral !important;
  }
  .income {
    background: forestgreen !important;
  }
  .breadcrumb {
    color: black !important;
    &:before,
    &:after {
      color: black !important;
      transform: translateY(-4px);
    }
  }
}
</style>