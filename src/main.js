class Node {
    constructor(data) {
      this.data = data; 
      this.left = null;   
      this.right = null;  
    }
  }
  
  class Tree {
    constructor(arr) {
      // Initialize the root using the buildTree function
      const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
      this.root = this.buildTree(sortedArray);
    }
  
    buildTree(array) {
        if (array.length === 0) {
          return null;
      }
      
      // Finds the middle index
      const mid = Math.floor(array.length / 2);
      
      // Creates a node for the middle element
      const node = new Node(array[mid]);

      // Recursively builds the left and right subtrees
      node.left = this.buildTree(array.slice(0, mid)); // Left half (excluding mid)
      node.right = this.buildTree(array.slice(mid + 1)); // Right half (excluding mid)
  
      return node;
    }

    _findNode(root, value) {
        if (root === null) {
            return null; // Value not found in the tree
        }

        if (root.data === value) {
            return root; // Node found
        }

        // If value is less than current node's data, search left subtree
        if (value < root.data) {
            return this._findNode(root.left, value);
        }

        // If value is greater than current node's data, search right subtree
        return this._findNode(root.right, value);
    }

    insert(data) {
        this.root = insert(this.root, data);  // Use insert function to add data to the tree
      }

      delete(data) {
        this.root = delNode(this.root, data);  // Delete node and update root
    }

    find(value) {
        const node = this._findNode(this.root, value)
        if (node === null) {
            console.log(`Node with value ${value} not found.`);
        } else {
            console.log(`Node found:`, node);
        }
    }

    levelOrder(callback) {
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }

        if (this.root === null) {
            return;
        }

        const queue = [this.root]; // Initialize the queue with the root node

        while (queue.length > 0) {
            const currentNode = queue.shift(); // Dequeue the first element
            
            callback(currentNode); // Call the callback function with the current node

            // Enqueue the left and right children, if they exist
            if (currentNode.left) {
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }

    inOrder(callback){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }


        const traverse = (node) => {
            if (node === null) return;

        // Traverse the left subtree
        traverse(node.left);

        // Process the current node
        callback(node);

        // Traverse the right subtree
        traverse(node.right);
        };

        traverse(this.root)
    }

    preOrder(callback){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
        if(node === null) return;

        // Process the current node (root)
        callback(node);

        
        traverse(node.left);

        
        traverse(node.right);

        }

        traverse(this.root)

    }

    postOrder(callback){
        if (typeof callback !== 'function') {
            throw new Error("A callback function is required.");
        }

        const traverse = (node) => {
            if(node === null) return;
    
            traverse(node.left);
    
            
            traverse(node.right);
    
            // Process the current node (root)
            callback(node);
            }
    
            traverse(this.root)
    }


    height(node) {
        if (node === null) {
            return -1; // Null node has height -1 (representing an empty tree)
        }

        // Recursively calculate the height of left and right subtrees
        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);

        // Return the greater of the two heights + 1 (for the current edge)
        return Math.max(leftHeight, rightHeight) + 1;
    }


    depth(node) {
        let current = this.root;
        let depthCount = 0;

        while (current !== null) {
            if (current.data === node.data) {
                return depthCount; // Return depth once we reach the node
            }

            // If the target node is smaller, go to the left subtree
            if (node.data < current.data) {
                current = current.left;
            } 
            // If the target node is larger, go to the right subtree
            else {
                current = current.right;
            }

            depthCount++; // Increment the depth counter
        }

        return -1; // If node is not found
    }


    isBalanced(node = this.root) {
        // Function to calculate height and check balance
        const checkBalance = (node) => {
          if (node === null) {
            return 0; // Null nodes have height 0 and are balanced
          }
    
          // Recursively check the left and right subtrees
          const leftHeight = checkBalance(node.left);
          const rightHeight = checkBalance(node.right);
    
          // If any subtree is unbalanced, propagate -1 upward
          if (leftHeight === -1 || rightHeight === -1) {
            return -1;
          }
    
          // Check the balance condition for the current node
          if (Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // Tree is unbalanced
          }
    
          // Return the height of the current node
          return Math.max(leftHeight, rightHeight) + 1;
        };
    
        // Start the balance check
        return checkBalance(node) !== -1;
      }

      rebalance() {
        // Get all elements in sorted order using in-order traversal
        const elements = [];
        this.inOrder((node) => elements.push(node.data));
    
        // Build a new balanced tree with the sorted elements
        this.root = this.buildTree(elements);
      }

      

  }

  function insert(root, data) {

    if (root === null)
        return new Node(data);
        
    // Duplicates not allowed    
    if (root.data === data)
        return root;
        
    if (data < root.data)
        root.left = insert(root.left, data);
    else if (data > root.data)
        root.right = insert(root.right, data);

    return root;
}

function getSuccessor(curr) {
    curr = curr.right;
    while (curr !== null && curr.left !== null) {
        curr = curr.left;
    }
    return curr;
}


// This function deletes a given data x from the
// given BST and returns the modified root of the
// BST (if it is modified).
function delNode(root, x) {
    // Base case
    if (root === null) {
        return root;
    }

    // If data to be searched is in a subtree
    if (root.data > x) {
        root.left = delNode(root.left, x);
    } else if (root.data < x) {
        root.right = delNode(root.right, x);
    } else {
        // If root matches with the given data

        // Cases when root has 0 children or 
        // only right child
        if (root.left === null) 
            return root.right;

        // When root has only left child
        if (root.right === null) 
            return root.left;

        // When both children are present
        let succ = getSuccessor(root);
        root.data = succ.data;
        root.right = delNode(root.right, succ.data);
    }
    return root;
}




  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const tree = new Tree(values)
  
  
  
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }

    

    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "|   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "+-- " : "|-- "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "|   "}`, true);
    }
  };
  

tree.levelOrder((node) => {
    console.log(node.data);
})

  prettyPrint(tree.root)

tree.preOrder((node) => {
    console.log(node.data);
});

tree.postOrder((node) => {
    console.log(node.data);
});

console.log("The height of this tree is: ", tree.height(tree.root))

const node = tree._findNode(tree.root, 5);

console.log("The depth of this node is: ", tree.depth(node))

console.log(tree.isBalanced());

tree.insert(80);
tree.insert(90);
tree.insert(100);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());