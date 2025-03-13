import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;

  @tracked showAddModal = false;
  @tracked selectedItem;

  get items() {
    return this.model.filter((item) => !item.isDeleted);
  }

  @action
  submitNewItem() {
    if (!this.selectedItem.id) {
      this.selectedItem.id = crypto.randomUUID();
      this.store.createRecord('item', this.selectedItem);
    }
    this.showAddModal = false;
    this.selectedItem = null;
    return;
  }

  @action
  createNewItem() {
    this.selectedItem = {
      name: '',
      value: 0,
      category: '',
      itemDetail: null,
    };
    this.showAddModal = true;
  }

  @action
  createNewDetails(category) {
    set(this.selectedItem, 'category', category);
    if (category === 'jewelry') {
      set(
        this.selectedItem,
        'itemDetail',
        this.store.createRecord('item-detail-jewelry'),
      );
    } else if (category === 'electronic') {
      set(
        this.selectedItem,
        'itemDetail',
        this.store.createRecord('item-detail-electronic'),
      );
    } else {
      set(
        this.selectedItem,
        'itemDetail',
        this.store.createRecord('item-detail'),
      );
    }
  }

  @action
  deleteItem(item) {
    item.deleteRecord();
  }

  @action
  editItem(item) {
    this.selectedItem = item;
    this.showAddModal = true;
  }

  @action
  cancelItem() {
    this.showAddModal = false;
    this.selectedItem = null;
  }

  get total() {
    let totalValue=0;
    this.items.forEach((item) => {
      const value = parseFloat(item.value) || 0;
      totalValue += value;
    });
    return `$ ${totalValue}`;
  }
}
