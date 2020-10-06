var arr = require("./file.json");

function filesToTreeNodes(arr) {
  var tree = {};
  function addnode(obj) {
    var splitpath = obj.webkitRelativePath.replace(/^\/|\/$/g, "").split("/");
    var ptr = tree;
    for (let i = 0; i < splitpath.length; i++) {
      let node = {
        name: splitpath[i],
        type: "directory",
      };
      if (i == splitpath.length - 1) {
        let splitName = splitpath[i].split(".");
        node.type = splitName.pop();
        node.name = splitName.join(".");
      }
      ptr[splitpath[i]] = ptr[splitpath[i]] || node;
      ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
      ptr = ptr[splitpath[i]].children;
    }
  }
  function objectToArr(node) {
    Object.keys(node || {})
      .map((k) => {
        if (node[k].children) {
          objectToArr(node[k]);
        }
      })
      .sort((a, b) => {
        let aa = a.name.toLowerCase(),
          bb = b.name.toLowerCase();

        if (aa < bb) {
          return -1;
        }
        if (aa > bb) {
          return 1;
        }
        return 0;
      });
    if (node.children) {
      node.children = Object.values(node.children).sort((a, b) => {
        let aa = a.name.toLowerCase(),
          bb = b.name.toLowerCase();

        if (aa < bb) {
          return -1;
        }
        if (aa > bb) {
          return 1;
        }
        return 0;
      });
      node.children.forEach(objectToArr);
    }
  }
  arr.map(addnode);
  objectToArr(tree);
  return Object.values(tree);
}

let tree = filesToTreeNodes(arr);
console.log(require("util").inspect(tree, { depth: null }));
