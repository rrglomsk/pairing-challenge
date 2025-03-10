import Model, { attr } from '@ember-data/model';
import ItemDetail from './item-detail';

export default class Jewelry extends ItemDetail {
  @attr('string') material;

  get isJewelry() {
    return true;
  }

  get icon() {
    return 'gem';
  }

  get detail() {
    return `Material - ${this.material}`;
  }
}
