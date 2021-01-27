export default {
  name: 'page-mixin',

  methods: {
    onClickLeft() {
      this.$root.goBack();
    },
  },
};
