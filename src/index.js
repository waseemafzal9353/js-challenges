// Capitalizing first letter of each string in array

let names = ['waseem', 'afzal']
// Easy Method
const capitalizeEasyString = (names) => {
  return names.map((name) => name.charAt(0).toUpperCase() + name.slice(1))
}
// rounded way

const capitalizeHardString = (names) => {
  const nameCap = names.map((name) => {
    const nameArray = [...name]
    for (let index = 0; index < nameArray.length; index++) {
      if (index === 0) nameArray[index] = nameArray[index].toUpperCase()
      return nameArray.join('')
    }
  })
  return nameCap
}
// console.log(capitalizeEasyString(names))
// console.log(capitalizeHardString(names))

// ========================================== 2 ===================================================
// Leetcode problem
/**
 * Given an mxn 2d grid map of 1’s (land) and 0’s(water) return the number of islands.
An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. 
You may assume all four edges of the grid are all surrounded by water.
 */

function numberOfIslands(grid) {
  if (!grid || grid.length === 0) return 0

  let numberOfislands = 0

  function dfs(i, j) {
    if (
      i < 0 ||
      j < 0 ||
      i >= grid.length ||
      j >= grid[0].length ||
      grid[i][j] === '0'
    )
      return
    grid[i][j] = '0'
    dfs(i + 1, j)
    dfs(i - 1, j)
    dfs(i, j + 1)
    dfs(i, j - 1)
  }

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        numberOfislands++
        dfs(i, j)
      }
    }
  }
  return numberOfislands
}

const grid = [
  ['1', '1', '0', '0', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '1', '0', '0'],
  ['0', '0', '0', '1', '1'],
]

console.log(numberOfIslands(grid))
