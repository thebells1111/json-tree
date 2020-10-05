let src = [
  {
    type: "folder",
    name: "Components",
    files: [
      {
        type: "folder",
        name: "Display",
        files: [
          { type: "svelte", name: "index", source: "a" },
          { type: "svelte", name: "Screen", source: "b" },
        ],
      },
      {
        type: "folder",
        name: "Calculator",
        files: [
          {
            type: "folder",
            name: "Display",
            files: [
              { type: "svelte", name: "index", source: "a" },
              { type: "svelte", name: "Screen", source: "b" },
            ],
          },
          {
            type: "folder",
            name: "Calculator",
            files: [{ type: "svelte", name: "index", source: "c" }],
          },
        ],
      },
    ],
  },

  { type: "svelte", name: "App", source: "Stuff" },
];

function convertToComponent(file) {
  let initialPath = "";
  let components = [];

  function c(x, path) {
    x.forEach((f) => {
      if (f.type === "folder") {
        initialPath += `${f.name}/`;
        c(f.files, initialPath);
        initialPath = path ? `${path}` : "";
      } else {
        if (f.name === "index") {
          initialPath = initialPath.slice(0, -1);
          f.name = "";
        }
        components.push({
          name: `${initialPath}${f.name}`,
          type: f.type,
          source: f.source,
        });
      }
    });
  }
  c(file);
  return components;
}

console.log(convertToComponent(src));
