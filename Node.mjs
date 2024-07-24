class Node {
  data;
  left;
  right;
  constructor() {
    this.data = null;
    this.left = null;
    this.right = null;
  }
  set data(value) {
    this.value = value;
  }
  set left(node) {
    this.left = node;
  }
  set right(node) {
    this.right = node;
  }
  get data() {
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
