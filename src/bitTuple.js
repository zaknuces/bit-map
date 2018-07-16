'use strict'

const MAX_BITS = 53;

class BitTuple {
  constructor () {
    this.status = 0;
    this.objectByBitMap = new Map();
    this.size = MAX_BITS;
  }

  setSize (size) {
    this.size = size;
  }

  set (obj) {
    let freeSlot = this._findFirstFreeSlot();
    if (freeSlot >= 0) {
      this.objectByBitMap.set(freeSlot, obj);
      this.status |= 1 << freeSlot;
    } else {
      return -1;
    }
  }

  get (index) {
    return this.objectByBitMap.get(index) || null;
  }

  remove (index) {
    if (this.objectByBitMap.has(index)) {
      this.objectByBitMap.delete(index);
      this.status &= ~(1 << index);
    } else {
      return false;
    }
  }

  _findFirstFreeSlot () {
    if (this.status === 0) {
      return 0;
    } else if (this.status === Number.MAX_SAFE_INTEGER) {
      return MAX_BITS;
    } else if (this.status > Number.MAX_SAFE_INTEGER) {
      return -1;
    } else {
      let statusOneComplement = ~this.status & ~(1 << MAX_BITS);
      let statusTwoComplement = (~statusOneComplement) + 1;
      let andComplements = statusTwoComplement & statusOneComplement;
      return Math.log(andComplements) / Math.log(2);
    }

  }
}

module.export = BitTuple;
module.export.MAX_BITS = MAX_BITS;
