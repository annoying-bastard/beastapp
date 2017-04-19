const game = require('../../game.js')();
const expect = require('expect.js');

// stubs
const plan = [ ['_'] ];
const vector = { x:0, y:0 };

describe('getVectorContent', () => {
  it('should return the content of a 2 dimensional array, if passed a vector object', () => {
    expect(game.getVectorContent(plan, vector)).to.equal('_');
  });
});

describe('checkIfTraversable', () => {
  it('should return true if vector hits "_" in plan', () => {
    expect(game.checkIfTraversable(plan, vector)).to.equal(true);
  });
  it('should return false if it does not resolve "_" in array', () => {
    expect(game.checkIfTraversable([ ['B'] ], vector)).to.equal(false);
  });
  it('should return false if passed only one argument', () => {
    expect(game.checkIfTraversable(plan)).to.equal(false);
  });
})

describe('updatePlan', () => {
  it('should replace the vector hit in an array with a new tile', () => {
    expect(game.updatePlan(plan, vector, 'B')[0][0]).to.equal([['B']][0][0]);
  });
});
