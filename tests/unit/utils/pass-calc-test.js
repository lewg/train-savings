import periodic from '../../../utils/periodic';
import { module, test } from 'qunit';

module('passCalc');

// Replace this with your real tests.
test('it works annually', function(assert) {
  var result = periodic("Annually", 100, 7);
  assert.ok(result);
});
