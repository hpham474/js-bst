import Tree from "./Tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(array);

bst.prettyPrint();

console.log(bst.depth(bst.find(7)));

bst.prettyPrint();
