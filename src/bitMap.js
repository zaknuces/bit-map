'use strict'

const BitTuple = require('./BitTuple');
const MAX_BITS = require('./BitTuple').MAX_BITS;

class BitMap {
  constructor (capacity = MAX_BITS - 1) {
    this.tuples = [];
    let length = Math.floor(capacity / MAX_BITS) + 1;
    for (let i = 0; i < length; i++) {
      this.tuples.push(new BitTuple());
    }
    this.tuples[this.tuples.length - 1].setSize(capacity % MAX_BITS);
    console.log(this.tuples);
  }
  
  set (obj) {
    let tupleIndex = 0;
    let putIndex = 0;
    while (tupleIndex < this.tuples.length &&
           (putIndex = this.tuples[tupleIndex].set(obj) == -1)) {
      tupleIndex++;
    }
    return putIndex > 0 ?
      putIndex + tupleIndex * MAX_BITS :
      -1;
  }

  get (index) {
    return this.tuples[Math.floor(index / MAX_BITS)].get(index % MAX_BITS);
  }

  remove (index) {
    return this.tuples[Math.floor(index / MAX_BITS)].remove(index % MAX_BITS);
  }

  length () {
    // TODO:
  }
}

module.export = BitMap;
