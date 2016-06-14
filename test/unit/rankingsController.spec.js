describe('rankingsController', function() {

  beforeEach(module('RankingsTable'))

  var ctrl

  beforeEach(inject(function($controller) {
    ctrl = $controller('rankingsController')
  }))

  it('correctly calculates the point difference when the home team has a higher score', function() {
    expect(ctrl.pointDifference(10, 9)).toEqual(4)
  })

  it('correctly calculates the point difference when the away team has a higher score', function() {
    expect(ctrl.pointDifference(2, 6)).toEqual(-1)
  })
})
