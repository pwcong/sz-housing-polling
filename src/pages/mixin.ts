import { TYPES_TEXT } from './data';

export default {
  name: 'index-mixin',
  methods: {
    formatType(v) {
      return TYPES_TEXT[v];
    },
  },
};
