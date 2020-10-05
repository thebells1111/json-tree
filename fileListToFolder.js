let fileList = require("./file.json");

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
        let idcount = 0;
        var idmap = {};

        add(directories);

        function add(dirs) {
          if (!dirs.length) return "#";
          var name = dirs.join("/");
          if (name in idmap) return idmap[name];
          var dir = dirs.pop();
          var parent = add(dirs);
          var id = "ajson" + ++idcount;
          folder[project][chapter][app].folders.push({
            id: id,
            parent: parent,
            text: dir,
          });
          return (idmap[name] = id);
        }

        // let splitName = directories.join("/").split(".");
        // let type = splitName.pop();
        // let name = splitName.join(".");

        // let component = {};
        // component.name = name;
        // component.type = type;
        // component.source = "source"; //change to async file reader

        // folder[project][chapter][app].components.push(component);
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
let list = fileListToFolder(fileList);
console.log(JSON.stringify(list, null, 2));
