import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { filterBy } from '@ember/object/computed';

export default class IndexController extends Controller {
  @service store;

  @tracked showAddModal = false;
  @tracked selectedItem;

  @action
  submitNewItem() {
    this.showAddModal = false;
    this.selectedItem = null;
    return;
  }

  @action
  createNewItem() {
    this.selectedItem = this.store.createRecord('item');
    this.showAddModal = true;
  }

  @action
  createNewDetails(category) {
    this.selectedItem.category = category;

    if (category === 'jewelry') {
      this.selectedItem.itemDetail = this.store.createRecord('item-detail-jewelry');
    } else if (category === 'electronics') {
      this.selectedItem.itemDetail = this.store.createRecord('item-detail-electronics');
    } else {
      this.selectedItem.itemDetail = this.store.createRecord('item-detail');
    }
  }

  @action
  cancelItem() {
    this.showAddModal = false;
    this.selectedItem = null;
  }

}
