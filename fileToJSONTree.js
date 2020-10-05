let fileList = require("./file.json");

var treeJSON = [];
var idcount = 0;
var idmap = {};

//file categorizing function

function add(dirs, isfolder) {
  if (!dirs.length) return "#";
  var name = dirs.join("/");
  if (name in idmap) {
    return idmap[name];
  }
  var dir = dirs.pop();
  var parent = add(dirs, true);
  var id = "ajson" + ++idcount;
  let splitName = dir.split(".");
  if (splitName.length > 1) {
    splitName.pop();
  }

  var item = {
    id: id,
    parent: parent,
    name: splitName.join("."),
    type: "folder",
  };
  if (!isfolder && dir.indexOf(".") > 0) item.type = dir.split(".").pop();
  treeJSON.push(item);
  return (idmap[name] = id);
}

for (var i = 0; i < fileList.length; ++i) {
  var name = fileList[i].webkitRelativePath;
  add(name.split("/"), false);
}

console.log(treeJSON);
console.log(idmap);
