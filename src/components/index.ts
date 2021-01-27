import { App } from 'vue';

import ListLayout from './list-layout/index.vue';
import ItemBox from './item-box/index.vue';
import CardList from './card-list/index.vue';
import Tree from './tree/index.vue';
import { buildSelectionBase } from './selection-base';
import { buildFilterBase, FilterTrigger } from './filter-base';
import { buildItemDetail } from './item-detail';

export { buildSelectionBase, buildFilterBase, buildItemDetail };

export default {
  install(app: App) {
    app.component(ListLayout.name, ListLayout);
    app.component(ItemBox.name, ItemBox);
    app.component(CardList.name, CardList);
    app.component(Tree.name, Tree);
    app.component(FilterTrigger.name, FilterTrigger);
  },
};
