class Node {
  value;
  left;
  right;
  constructor() {
    value = null;
    left = null;
    right = null;
  }
  set value(value) {
    this.value = value;
  }
  set left(node) {
    this.left = node;
  }
  set right(node) {
    this.right = node;
  }
  get value() {
    return this.value;
  }
  get left() {
    return this.left;
  }
  get right() {
    return this.right;
  }
}

export default Node;
