import Tree from "./Tree.mjs";

function print(node) {
  console.log(node.data);
}

function getArray() {
  const array = [];
  const SIZE = 100;
  for (let i = 0; i < SIZE; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

const array = getArray();

const bst = new Tree(array);
console.log(bst.isBalanced());

console.log("Level Order");
bst.levelOrder(print);
console.log("PreOrder");
bst.preOrder(print);
console.log("PostOrder");
bst.postOrder(print);
console.log("InOrder");
bst.inOrder(print);

bst.insert(153);
bst.insert(147);
bst.insert(253);

console.log(bst.isBalanced());
bst.rebalance();
console.log(bst.isBalanced());

console.log("Level Order");
bst.levelOrder(print);
console.log("PreOrder");
bst.preOrder(print);
console.log("PostOrder");
bst.postOrder(print);
console.log("InOrder");
bst.inOrder(print);
