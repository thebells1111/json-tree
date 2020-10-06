let src = [
  {
    name: "Display",
    type: "svelte",
    path: "Display",
    source:
      '<script>\r\n  export let total;\r\n  export let totalArr;\r\n  export let buttons;   \r\n\texport let width = \'250px\';\r\n</script>\r\n\r\n<style>\r\n  .calculator {\r\n    user-select: none;\r\n    cursor: pointer;\r\n    color: #444;\r\n    background-color: #bbb;\r\n    display: grid;\r\n    grid-template-columns: 25% 25% 25% 25%;\r\n    border: solid 1px black;\r\n    padding: 5px;\r\n    width: var(--width);\r\n  }\r\n\r\n  #display {\r\n    grid-column: 1 / span 4;\r\n    border: solid 1px black;\r\n    background-color: #ddd;\r\n    border-radius: 2px;\r\n    height: 60px;\r\n    background: linear-gradient(\r\n      135deg,\r\n      #fefefe 0%,\r\n      #d1d1d1 37%,\r\n      #dbdbdb 58%,\r\n      #e2e2e2 100%\r\n    );\r\n    margin-bottom: 2.5px;\r\n    cursor: default;\r\n  }\r\n\r\n  #display > div {\r\n    text-align: right;\r\n    box-sizing: border-box;\r\n    height: 50%;\r\n    width: 100%;\r\n    margin-left: auto;\r\n    margin-right: auto;\r\n    text-align: right;\r\n    overflow: hidden;\r\n    white-space: nowrap;\r\n  }\r\n\r\n  #display > div > div {\r\n    float: right;\r\n  }\r\n\r\n  .top {\r\n    font-size: 0.8em;\r\n    line-height: 200%;\r\n  }\r\n\r\n  .bottom {\r\n    font-size: 1.2em;\r\n    line-height: 100%;\r\n  }\r\n\r\n  button {\r\n    cursor: pointer;\r\n    padding: 0;\r\n    margin: 0;\r\n    font-size: 1.2em;\r\n    font-weight: 700;\r\n    border-style: outset;\r\n    border-radius: 3px;\r\n    height: 2.1em;\r\n    margin: 1px;\r\n  }\r\n\r\n  #ac {\r\n    grid-column: span 2;\r\n  }\r\n\r\n  #clear {\r\n    grid-column: span 2;\r\n  }\r\n\r\n  #add {\r\n    grid-row: span 2;\r\n    height: initial;\r\n  }\r\n\r\n  #equal {\r\n    grid-row: span 2;\r\n    height: initial;\r\n  }\r\n\r\n  #zero {\r\n    grid-column: span 2;\r\n  }\r\n</style>\r\n\r\n<div class="calculator" style="--width: {`${width}`}">\r\n  <div id="display">\r\n    {#if (total!==\'err\')}\r\n    <div>\r\n      <div class="top">{totalArr.join(\' \')}</div>\r\n    </div>\r\n    <div>\r\n      <div class="bottom">{total}</div>\r\n    </div>\r\n    {:else}\r\n    <div>{total}</div>\r\n    {/if}\r\n  </div>\r\n  {#each buttons as button}\r\n  <button id="{button.id}" on:click="{button.func}">{button.value}</button>\r\n  {/each}\r\n</div>\r\n',
    children: [],
  },
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
