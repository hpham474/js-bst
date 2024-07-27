import Node from "./Node.mjs";

class Tree {
  root;
  constructor(array) {
    this.buildTree(array);
  }
  get root() {
    return this.root;
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

    if (node === null) {
      this.root = newNode;
      return;
    }
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
  deleteItem(value) {
    let node = this.root;
    let prev = null;

    // get node to delete
    while (node !== null && node.data !== value) {
      prev = node;
      if (value < node.data) {
        node = node.left;
      } else {
        node = node.right;
      }
    }

    // no child case
    if (node.left === null && node.right === null) {
      // root case
      if (node === this.root) {
        this.root = null;
        return;
      }
      // delete node by making children of previous node null
      if (node === prev.left) {
        prev.left = null;
      } else {
        prev.right = null;
      }
    }
    // one child case
    else if (node.left === null || node.right === null) {
      // get remaining child
      let child = null;
      if (node.left === null) {
        child = node.right;
      } else {
        child = node.left;
      }

      // root case
      if (node === this.root) {
        this.root = child;
        return;
      }

      // assign child to previous node
      if (node === prev.left) {
        prev.left = child;
      } else {
        prev.right = child;
      }
    }
    // two children
    else {
      // get next biggest node
      let nextBiggestParent = node;
      let nextBiggest = node.right;
      while (nextBiggest.left !== null) {
        nextBiggestParent = nextBiggest;
        nextBiggest = nextBiggest.left;
      }

      // assign node value to the nextBiggest value
      node.data = nextBiggest.data;

      // delete the nextBiggest node
      if (nextBiggestParent !== node) {
        nextBiggestParent.left = nextBiggest.right;
      } else {
        nextBiggestParent.right = nextBiggest.right;
      }
    }
  }
  find(value) {}
  levelOrder(callback) {}
  inOrder(callback) {}
  preOrder(callback) {}
  postOrder(callback) {}
  height(node) {}
  depth(node) {}
  isBalanced() {}
  rebalance() {}
}

export default Tree;
