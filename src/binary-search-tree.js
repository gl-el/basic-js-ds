const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }

  root() {
    return this.node;
  }

  add(data) {
    (this.node) ? innerAdd(this.node, data) : this.node = new Node(data);
    function innerAdd(node, data) {
      if (node.data < data) {
        (node.right) ? innerAdd(node.right, data) : node.right = new Node(data);
      }
      if (node.data > data) {
        (node.left) ? innerAdd(node.left, data) : node.left = new Node(data);
      }
    }
    //console.debug(this.node)
  }

  has(data) {
    return (this.find(data)) ? true : false;
  }

  find(data) {
    return (this.node.data === data) ? this.node : innerFind(this.node, data);
    function innerFind(node, data) {
      //console.debug(node)
      if (node.data < data) {
        return (node.right) ? innerFind(node.right, data) : null
      } else if (node.data > data) {
        return (node.left) ? innerFind(node.left, data) : null;
      } else {
        return (node.data === data) ? node : null;
      }
    }
  }

  remove(data) {
    this.node = innerRemove(this.node, data);

    function innerRemove(node, data) {
      if (!node) return null;
      if (node.data < data) {
        node.right = innerRemove(node.right, data);
        return node;
      }
      if (node.data > data) {
        node.left = innerRemove(node.left, data);
        return node;
      }
      if (node.data === data) {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minFromRight = node.right;
        while (minFromRight.left) {
          minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = innerRemove(node.right, minFromRight.data);
        return node;
      }
    }
  }

  min() {
    if (!this.node) {
      return;
    }
    let node = this.node;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    if (!this.node) {
      return;
    }
    let node = this.node;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};