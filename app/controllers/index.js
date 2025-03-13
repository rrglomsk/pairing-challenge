import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service store;

  @tracked showAddModal = false;
  @tracked selectedItem;
  @tracked selectedIndex;
  get items() {
    return this.model.filter((item) => !item.isDeleted);
  }

  @action
  submitNewItem() {
    if (this.selectedIndex !== null) {
      this.items[this.selectedIndex].setProperties(this.selectedItem);
    } else {
      this.store.createRecord('item', this.selectedItem);
    }
    this.showAddModal = false;
    this.selectedItem = null;
    this.selectedIndex = null;
    return;
  }

  @action
  createNewItem() {
    this.selectedIndex = null;
    this.selectedItem = {
      id: crypto.randomUUID(),
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
    if (confirm('Are you sure you want to delete this item?')) {
      item.deleteRecord();
    }
  }

  @action
  editItem(item, index) {
    this.selectedItem = {
      id: item.id,
      name: item.name,
      value: item.value,
      category: item.category,
      itemDetail: item.itemDetail,
    };
    this.selectedIndex = index;
    this.showAddModal = true;
  }

  @action
  cancelItem() {
    this.showAddModal = false;
    this.selectedItem = null;
    this.selectedIndex = null;
  }

  get total() {
    let totalValue = 0;
    this.items.forEach((item) => {
      const value = parseFloat(item.value) || 0;
      totalValue += value;
    });
    return `$ ${totalValue}`;
  }
}
