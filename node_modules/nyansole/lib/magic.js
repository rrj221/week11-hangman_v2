var EventEmitter = require('events').EventEmitter
  , util = require('util');

module.exports = Nyancat;

var cat = [
  '_,------,',
  '_|   /\\_/\\ ',
  '~|__( ^ .^)',
  '  ""  ""   ',
  '_,------,',
  '_|   /\\_/\\ ',
  '^|__( ^ .^)',
  ' ""  ""    ',
];

function Nyancat() {
  EventEmitter.call(this);

  // tty manipulation
  this.charm = require('charm')();
  this.charm.pipe(process.stdout);

  // animation state
  this.animating = true;
  this.flying = false;
  this.frame = [];
  this.tick = 0;

  // cat position
  this.pos = 0;

  // rainbow length
  this.length = 0;

  // draw initial frame
  this.draw();
};

util.inherits(Nyancat, EventEmitter);

Nyancat.prototype.draw = function() {
  this.emit('before draw');

  this.tick++;

  // Reset position to 0 if end
  if (this.pos >= process.stdout.columns) {
    this.pos = 0;
  }

  // Erase previous frame from TTY
  for (var l=this.frame.length, i=0; i<l; i++) {
    this.charm.erase('line').up(1);
  }
  this.charm.erase('line');

  this.frame = [];

  // Create frame
  for (var l=0; l<4; l++) {
    // create cat
    var animate = this.tick % 3 ? 0 : 4;
    var nyan = cat.slice(0 + animate, 4 + animate)[l];

    // create rainbow tail
    var skittles = Array(this.length).join(l % 2 ? '-_' : '_-');
    skittles = skittles.substr(0, this.length);
    // tail cannot exceed screen length
    if (skittles.length > process.stdout.columns) {
      skittles = skittles.substr(0, process.stdout.columns);
    }

    var first = skittles.substr(0, this.pos)
    var last = skittles.substr(first.length + 11);
    var line = first + nyan + last;

    // line cannot exceed screen length
    if (line.length >= process.stdout.columns) {
      line = line.substr(0, process.stdout.columns);
    }

    this.frame.push(
      this.rainbowify(line.substr(0, first.length))
      + line.substr(first.length, 11)
      + this.rainbowify(line.substr(first.length + 11))
    );
  }

  // Draw frame
  this.charm.write(this.frame.join("\n") + "\n");

  this.emit('after draw');

  // Draw next frame
  setTimeout(function() {
    if (this.animating) {
      if (this.flying) {
        this.length++;
        this.pos++;
      }
      this.draw();
    }
  }.bind(this), 50);

  return this;
};

Nyancat.prototype.start = function() {
  this.flying = true;
  this.draw();

  return this;
};

Nyancat.prototype.stop = function() {
  this.flying = false;
  return this;
};

Nyancat.prototype.reset = function() {
  this.stop();
  this.pos = 0;
  this.length = 0;
  this.tick = 0;
  this.animating = true;
  return this;
};

Nyancat.prototype.end = function() {
  this.flying = false;
  this.animating = false;
  return this;
};

Nyancat.prototype.progress = function(pct) {
  this.pos = this.length = Math.floor(((process.stdout.columns - 12) * (pct / 100)) / 2);
  this.stop();
  this.draw();
  return this;
};

Nyancat.prototype.rainbowify = function(str) {
  var rainbow = [];
  var colors = [];

  for (var i=0; i < (6 * 7); i++) {
    var pi3 = Math.floor(Math.PI / 3);
    var n = (i * (1.0 / 6));
    var r = Math.floor(3 * Math.sin(n) + 3);
    var g = Math.floor(3 * Math.sin(n + 2 * pi3) + 3);
    var b = Math.floor(3 * Math.sin(n + 4 * pi3) + 3);
    colors.push(36 * r + 6 * g + b + 16);
  }

  var shift = this.tick % colors.length;
  //colors = colors.slice(0, colors.length-shift).concat(colors.slice(0, shift))
  colors = colors.slice(shift).concat(colors.slice(0, shift));

  for (var i=0; i<str.length; i++) {
    var color = colors[i % colors.length];
    rainbow.push(('\u001b[38;5;' + color + 'm' + str[i] + '\u001b[0m'));
  }

  return rainbow.join('');
};
