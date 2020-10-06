let fileList = require("./fileList.json");

function fileListToFolder(fileList) {
  let folder = {};

  folder.projectNames = new Set();

  for (let file of fileList) {
    let relativePath = file.webkitRelativePath;
    let directories = relativePath.split("/");
    directories.shift();
    let project = directories.shift();
    let chapter = directories.shift();
    let app = directories.shift();
    folder.projectNames.add(project);
    folder[project] = folder[project] || {};
    folder[project].chapterNames = folder[project].chapterNames || new Set();
    if (chapter !== `meta.json`) {
      folder[project].chapterNames.add(chapter);
      folder[project][chapter] = folder[project][chapter] || {};
    } else {
      folder[project].meta = chapter; //change this to actual meta data
    }
    if (app) {
      if (app !== `text.md`) {
        folder[project][chapter][app] = folder[project][chapter][app] || {
          folders: [],
        };

        let x = filesToTreeNodes([
          { webkitRelativePath: directories.join("/") },
        ]);
        //console.log(x);

        folder[project][chapter][app].folders = x;
      } else {
        folder[project][chapter].text = app; //change this to actual text.md
      }
    }
  }

  folder.projectNames = [...folder.projectNames].sort();
  folder.projectNames.forEach((project) => {
    folder[project].chapterNames = [...folder[project].chapterNames].sort();
  });
  return folder;
}

function filesToTreeNodes(arr) {
  var tree = {};
  function addnode(obj) {
    var splitpath = obj.webkitRelativePath.replace(/^\/|\/$/g, "").split("/");
    var ptr = tree;
    for (let i = 0; i < splitpath.length; i++) {
      let node = {
        name: splitpath[i],
        type: "directory",
        path: obj.webkitRelativePath.split(".").slice(0, -1).join("."),
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

let list = fileListToFolder(fileList);
console.log(JSON.stringify(list, null, 2));
