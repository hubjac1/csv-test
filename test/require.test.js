var tape = require('tape');
var fs = require('fs');


tape('require csv-test module', function(t) {
  var config = fs.readFileSync('test/fixtures/test.yml', 'utf8'),
      file = 'test/fixtures/test.csv',
      stream = fs.createReadStream(file, 'utf8');

    require('..')(config, stream, undefined, function(error){
        t.plan(1);
        t.deepEqual(error, [], 'should runs without error');
    });
});

tape('allow fields without rules', function(t) {
    var config = fs.readFileSync('test/fixtures/undefinedFields.yml', 'utf8'),
        file = 'test/fixtures/test.csv',
        stream = fs.createReadStream(file, 'utf8');

    require('..')(config, stream, undefined, function(error){
        t.plan(1);
        t.deepEqual(error, [], 'should runs without error');
    });
});

tape('support custom rules', function(t) {
    var config = fs.readFileSync('test/fixtures/customValidators.yml', 'utf8'),
        file = 'test/fixtures/customValidators.csv',
        validator = require('./fixtures/customValidators.js'),
        stream = fs.createReadStream(file, 'utf8');

    require('..')(config, stream, validator, function(error){
        t.plan(1);
        t.deepEqual(error, [], 'should runs without error');
    });
});
