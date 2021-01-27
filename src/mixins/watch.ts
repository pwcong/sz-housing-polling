export interface IBuildPropertyWatchOptions {
  properties?: { [key: string]: object };
  watchActionName?: string;
}

export function buildPropertyWatchMixin(options: IBuildPropertyWatchOptions) {
  const { properties = {}, watchActionName } = options;

  return {
    name: 'property-watch-mixin',
    props: properties,
    watch: {
      ...Object.keys(properties).reduce((p, c) => {
        p[c] = function () {
          watchActionName && this[watchActionName] && this[watchActionName]();
        };
        return p;
      }, {}),
    },
  };
}
