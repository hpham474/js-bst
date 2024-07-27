import Tree from "./Tree.mjs";

function print(node) {
  console.log(node.data);
}

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(array);

bst.prettyPrint();

bst.deleteItem(1);
bst.deleteItem(3);
console.log(bst.isBalanced());

bst.prettyPrint();
