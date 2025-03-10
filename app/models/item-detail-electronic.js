import Model, { attr } from '@ember-data/model';
import ItemDetail from './item-detail';

export default class Electronic extends ItemDetail {
  @attr('string') serialNumber;

  get isElectronic() {
    return true;
  }

  get icon() {
    return 'bolt';
  }

  get detail() {
    return `Serial Number - ${this.serialNumber}`;
  }
}

