export interface IBuildSelectionArrayValue {
  type: ArrayConstructor;
  default: Array<any>;
}
export interface IBuildSelectionObjectValue {
  type: ObjectConstructor;
  default: object;
}
export interface IBuildSelectionOptions {
  value: IBuildSelectionArrayValue | IBuildSelectionObjectValue;
}

export function buildSelectionMixin(options: IBuildSelectionOptions) {
  const { value } = options;

  const { type: valueType, default: defaultValue } = value || {};

  return {
    name: 'selection-mixin',
    emits: ['update:modelValue', 'update:visible'],
    props: {
      modelValue: {
        type: valueType,
        default: () => defaultValue,
      },
      visible: {
        type: Boolean,
      },
    },
    data() {
      return {
        tempValue: this.getTempValue(),
        selectionContainer: document.body,
      };
    },
    methods: {
      getTempValue() {
        const { modelValue } = this.$props;
        if (valueType === Array) {
          return [].concat(defaultValue).concat(modelValue);
        }
        return Object.assign({}, defaultValue, modelValue);
      },
      onOk() {
        this.$emit('update:modelValue', this.tempValue);
        this.$emit('update:visible', false);
      },
      onCancel() {
        this.$emit('update:visible', false);
      },
    },
    watch: {
      visible(v, ov) {
        if (!ov && v) {
          this.tempValue = this.getTempValue();
        }
      },
    },
  };
}
