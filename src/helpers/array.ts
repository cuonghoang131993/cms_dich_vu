module.exports = {
  removeDuplicates(myArr, key) {
    return [...new Map(myArr.map(item => [item[key], item])).values()]
  },
};
