module.exports = {
  removeDuplicates(myArr, key) {
    console.log(myArr, key)
    return [...new Map(myArr.map(item => [item[key], item])).values()]
  },
};
