
### Table of Contents

[What is binar search tree ](#bst)
[Create Binary Search Tree](#create)
[Inorder Traversal](#inorder)
[PreOrder Traveral][3]
[Find Max In BST][4]
[Find Min in BST][5]
[Lvel Order Traversal][6]
<div id="bst"></div>

###  What is binary search tree 

>A binary search tree is a data structure composed of nodes. Each node has a key, which determines the node's position in the tree. (The node may also have a “value” field, where additional data is stored.) ... Specifically, each node has a left child, a right child, and a parent.

![](https://1.bp.blogspot.com/-FaLp9NJirGI/XrVt6bY7BtI/AAAAAAAAMkA/rVBsEdIxZbwdQT1cFAoFkcwACIOHvdXxQCK4BGAsYHg/binaryTree.bmp)
Before dive into code let's get familliear with some terms related to tree.
### Root
----
==A== is the root of the tree which contains pointers to other node `B` and `C`

### Child
----
B and C are the child of the A (B is left child and C is right child)
### Leaf Node
-----
D,E and F are the leaf node of the tree

### Internal Nodes
-----
Nodes that are not leaf nodes are called `Internal Nodes` like B,C.

### Siblings Node
Nodes with the same parent are called siblings.

------
### Depth of the tree (Node)
The depth of a node is the number of edges from the root to the node.

-----

### Height of the tree (Node)
The height of a node is the number of edges from the node to the deepest leaf.

### Complete Binary Tree
A complete binary tree is a binary tree, which is completely filled, with the possible exception of the bottom level, which is filled from left to right.

-----

<div id="create"></div>

## Create a binary search tree and insert node
Now we are familiear with all the terms related to tree let's implement the tree using Typescript.
#### STEP-1 
Create a node class which have three fields namely `data`,`left` and `right`. Data field hold the node value and left and right pointer keep track of there childs.

```javascript
class TreeNode {
  constructor(
    public data: number,
    public left: TreeNode = null,
    public right: TreeNode = null
  ) {}
}
```
#### STEP 2
Create a BinarySearchTree class and pass the node refrence (`Node`) to the constructor and set the default value to null. And follow the following alogrithm to insert the new node into binary search tree.

```
 - Procedure (Insert X)
 - If tree is empty create a node and Set X 
 - ELSE If X < Y, insert new leaf X as new left 
 - ELSE If X > Y, insert new leaf X as new right 
 ```

### Example




```typescript
export class BinarySearchTree {
  constructor(private root: TreeNode = null) {}

  public insert(data: number): void {
    let newNode = new TreeNode(data);
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (data < this.root.data) {
        if (current.left == null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else if (data > this.root.data) {
        if (current.right == null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }
}
```

<div id="inorder"></div>
### What is In Order Traveral
>

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkxNDc2NzMzOF19
-->