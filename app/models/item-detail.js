import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemDetail extends Model {
  @belongsTo('item', { inverse: 'itemDetail', async: false, as: 'item-detail' }) item;
}
