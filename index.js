const game = require('./game.js');

if (process.env.NODE_ENV === 'test') {
  return game;
} else {
  return window.beasts = (game)();
}
