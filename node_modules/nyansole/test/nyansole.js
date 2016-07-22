describe('nyansole', function() {
  var Nyancat = require('../lib/magic');

  it('puts a nyancat in ur console', function(done) {
    var nyancat = (new Nyancat()).start();
    this.timeout(10000);
    setTimeout(function() {
      nyancat.end();
      done();
    }, 9000);
  });
});
