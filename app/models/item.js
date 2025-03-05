import Model, { attr, belongsTo } from '@ember-data/model';

export default class Item extends Model {
  @attr('string', { defaultValue: 'Other' }) category;
  @attr('string', { defaultName: 'New Item' }) name;
  @attr('number', { defaultValue: 0 }) value;
  @attr('date', { defaultValue: new Date() }) lastModified;

  @belongsTo('item-detail', { polymorphic: true, async: false, inverse: 'item' }) itemDetail;

  get currencyDisplay() {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.value);
  }
}
