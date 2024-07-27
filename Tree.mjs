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
  find(value) {
    let node = this.root;

    while (node !== null) {
      if (node.data === value) {
        return node;
      }
      if (node.data < value) {
        node = node.right;
      } else {
        node = node.left;
      }
    }

    return null;
  }
  levelOrder(callback) {
    if (callback === undefined) {
      console.error("Callback arguement needed");
    }
    if (this.root === null) {
      return;
    }
    const queue = [];
    queue.push(this.root);

    while (queue.length !== 0) {
      const node = queue.shift();

      callback(node);

      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }
  inOrder(callback, node = this.root) {
    if (callback === undefined) {
      console.error("Callback arguement needed");
    }

    if (node === null) {
      return;
    }

    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
  }
  preOrder(callback, node = this.root) {
    if (callback === undefined) {
      console.error("Callback arguement needed");
    }

    if (node === null) {
      return;
    }

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }
  postOrder(callback, node = this.root) {
    if (callback === undefined) {
      console.error("Callback arguement needed");
    }

    if (node === null) {
      return;
    }

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }
  height(node) {
    if (node === null) {
      return -1;
    }

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }
  depth(node) {
    if (node === null) {
      return -1;
    }
    let count = 0;
    let current = this.root;
    let found = false;

    while (current !== null) {
      if (current.data === node.data) {
        found = true;
        break;
      }
      if (current.data < node.data) {
        current = current.right;
      } else {
        current = current.left;
      }
      count++;
    }

    if (found) {
      return count;
    } else {
      return -1;
    }
  }
  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) === true &&
      this.isBalanced(node.right) === true
    ) {
      return true;
    }

    return false;
  }
  rebalance() {
    const array = [];
    function traverse(node) {
      array.push(node.data);
    }

    this.levelOrder(traverse);

    this.buildTree(array);
  }
}

export default Tree;
