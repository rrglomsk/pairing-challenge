import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn } from '@ember/test-helpers';
import { setupApplicationTest } from 'pairing-challenge/tests/helpers';

module('Acceptance | pairing challenge', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h2').hasText('Inventory Tracker');
  });

  test('can add a new item', async function (assert) {
    await visit('/');
    assert.dom('.inventory-table tbody tr:last-child').containsText('4k TV');

    await click('.add-item-button');
    assert.dom('.add-item-modal').containsText('New Item');

    await fillIn('.name-input input', 'Autographed Photo');
    await click('.submit-button');

    assert.dom('.inventory-table tbody tr:last-child').containsText('Autographed Photo');
  });

  test('removes the new item if you click cancel on the add modal', async function (assert) {
    await visit('/');
    assert.dom('.inventory-table tbody tr:last-child').containsText('4k TV');

    await click('.add-item-button');
    await fillIn('.name-input input', 'Autographed Photo');
    await click('.cancel-button');

    assert.dom('.inventory-table tbody tr:last-child').containsText('4k TV');
  });
});
