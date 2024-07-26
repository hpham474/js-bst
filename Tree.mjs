import Node from "./Node.mjs";

class Tree {
  root;
  constructor(array) {
    this.buildTree(array);
  }
  buildTree(array) {
    const sortedArray = [
      ...new Set(
        array.sort(function (a, b) {
          return a - b;
        })
      ),
    ];

    console.log(sortedArray);

    const bst = this.buildBST(sortedArray, 0, sortedArray.length - 1);

    this.root = bst;
  }
  buildBST(array, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const node = new Node();

    node.data = array[mid];
    node.left = this.buildBST(array, start, mid - 1);
    node.right = this.buildBST(array, mid + 1, end);

    return node;
  }
  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
  insert(value) {
    let node = this.root;
    const newNode = new Node();
    newNode.data = value;

    while (node !== null) {
      if (node.data === value) {
        return;
      }
      if (node.data < value) {
        if (node.right === null) {
          node.right = newNode;
          return;
        } else {
          node = node.right;
        }
      } else {
        if (node.left === null) {
          node.left = newNode;
          return;
        } else {
          node = node.left;
        }
      }
    }
  }
  deleteItem() {}
  find() {}
  levelOrder(callback) {}
  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  rebalance() {}
  root() {
    return this.root;
  }
}

export default Tree;
