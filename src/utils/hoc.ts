import _ from 'lodash';
import omit from 'omit.js';

export function buildPropsHOC(
  Component,
  componentName: string,
  properties: object
) {
  return {
    name: componentName,
    mixins: [Component],
    props: properties,
  };
}

export interface IBuildDataHocOptions<T> {
  name?: string;
  data: T;
  getData?: (_, properties: Array<any>) => Promise<T>;
  properties: object;
}

export function buildDataHOC<T>(
  Component,
  componentName: string,
  options?: IBuildDataHocOptions<T>
) {
  const {
    name = 'data',
    data,
    getData = (_, properties) => Promise.resolve(data),
    properties = {},
  } = options || {};

  return {
    name: componentName,
    mixins: [omit(Component, ['props'])],
    props: Object.assign({}, omit(Component.props, [name]), properties),
    data() {
      return {
        [name]: data,
      };
    },
    created() {
      this.handleInitData();
    },
    watch: {
      ...Object.keys(properties).reduce((p, c) => {
        p[c] = function () {
          this.handleInitData();
        };

        return p;
      }, {}),
    },
    methods: {
      handleInitData: _.debounce(function () {
        getData(this, this.$props).then((data) => (this[name] = data));
      }, 200),
    },
  };
}
