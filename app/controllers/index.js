import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {

  @tracked showAddModal = false;

  @action
  submitNewItem() {
    console.log('yo');
    return;
  }
}
