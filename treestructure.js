var arr = require("./file.json");
var tree = {};

function addnode(obj) {
  var splitpath = obj.webkitRelativePath.replace(/^\/|\/$/g, "").split("/");
  var ptr = tree;
  for (i = 0; i < splitpath.length; i++) {
    node = { name: splitpath[i], type: "directory" };
    if (i == splitpath.length - 1) {
      node.type = splitpath[i].split(".").pop();
    }
    ptr[splitpath[i]] = ptr[splitpath[i]] || node;
    ptr[splitpath[i]].children = ptr[splitpath[i]].children || {};
    ptr = ptr[splitpath[i]].children;
  }
}

arr.map(addnode);
console.log(require("util").inspect(tree, { depth: null }));
