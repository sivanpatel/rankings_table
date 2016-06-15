function createCombinations(array) {
  var fn = function(n, src, got, all) {
  if (n == 0) {
      if (got.length > 0) {
          all[all.length] = got
      }
      return
  }
  for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all)
  }
  return
  }
  var all = []

  for (var i = 0; i < 5; i++) {
      fn(i, array, [], all)
  }

  all.push(array)

  var combinations = []
  for(var i=0; i<all.length; i++) {
    if(all[i].length == 2) {
      combinations.push(all[i])
    }
  }
  for(var i=0; i<10; i++) {
    combinations.push(combinations[i].reverse())
  }

  return combinations
}
