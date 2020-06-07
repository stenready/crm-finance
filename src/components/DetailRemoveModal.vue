<template>
  <div>
    <div  class="modal" :id="modal_details.id">
      <div class="modal-content">
        <h4> {{ 'deletex' | localize }} </h4>
        <p> {{ 'message_delete' | localize }} </p>
      </div>
      <div class="modal-footer">
        <a href="#!" class="modal-close waves-effect waves-green btn" style="margin-right: 1rem;"> {{ 'cansel' | localize }} </a>
        <a href="#!" class="modal-close waves-effect waves-green btn" @click.prevent="$emit('delete_elem')"> {{ 'deletex' | localize }} </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modalRemove",
  props: {
    modal_details: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      modal: null
    };
  },
  mounted() {
    var elems = document.querySelectorAll(".modal");
    this.modal = M.Modal.init(elems);
  },
  destroyed() {
    if (this.modal && this.modal.destroy) {
      this.modal.destroy();
    }
  }
};
</script>

<style lang="scss">
</style>