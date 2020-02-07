function sliceRandomSubset(howManyElements, set) {
  // this needs input error handling. e.g. if subset length is
  // greater than set length.
  let _set = [...set];
  const subset = [];
  for (let i = 0; i < howManyElements; i++) {
    const randomIndex = Math.floor(Math.random() * _set.length);
    const pick = _set[randomIndex];
    subset.push(pick);
    _set = _set.filter(elt => elt !== pick);
  }
  return { set: _set, subset };
}

export default sliceRandomSubset;
