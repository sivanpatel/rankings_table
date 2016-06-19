describe('rankingsController', function() {

  beforeEach(module('RankingsTable'))

  var ctrl

  beforeEach(inject(function($controller) {
    ctrl = $controller('rankingsController')
  }))

  it('correctly calculates the point difference when the home team has a higher score', function() {
    expect(ctrl.pointDifference(10, 9)).toEqual(4.00)
  })

  it('correctly calculates the point difference when the away team has a higher score', function() {
    expect(ctrl.pointDifference(2, 6)).toEqual(-1.00)
  })

  it('correctly calculates the point difference when the points are not whole numbers', function() {
    expect(ctrl.pointDifference(4.5, 3)).toEqual(4.50)
  })

  it('correctly calculates the point difference when the points difference is greater than 10', function() {
    expect(ctrl.pointDifference(20, 3)).toEqual(10.00)
  })

  it('correctly calculates the point difference when the points difference is less than -10', function() {
    expect(ctrl.pointDifference(10, 30)).toEqual(-10.00)
  })

  it('checks scores and returns the first team as a winner', function() {
    expect(ctrl.checkWinner([10,0])).toEqual("A")
  })

  it('checks scores and returns the second team as a winner', function() {
    expect(ctrl.checkWinner([0,10])).toEqual("B")
  })

  it('checks scores and returns a draw if the teams have the same score', function() {
    expect(ctrl.checkWinner([10,10])).toEqual("D")
  })

  it('checks for a no result', function() {
    expect(ctrl.checkWinner([])).toEqual("N")
  })

})
