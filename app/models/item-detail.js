import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemDetail extends Model {
  @attr('string') detail;
  @belongsTo('item', { inverse: 'itemDetail', async: false, as: 'item-detail' }) item;

  get detail() {
    return `Detail - ${this.detail}`;
  }
}
