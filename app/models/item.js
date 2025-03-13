import Model, { attr, belongsTo } from '@ember-data/model';

export default class Item extends Model {
  @attr('string') category;
  @attr('string', { defaultName: 'New Item' }) name;
  @attr('number', { defaultValue: 0 }) value;
  @attr('date', {
    defaultValue() {
      return new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },
  })
  lastModified;

  @belongsTo('item-detail', { polymorphic: true, async: false, inverse: 'item' }) itemDetail;

  get currencyDisplay() {
    return Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(this.value);
  }
}
