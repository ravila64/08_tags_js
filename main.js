let tags = [];

const inputTagContainer = document.querySelector("#input-tag");
const tagsContainer = document.createElement("div");
const inputTag = document.createElement("span");

inputTag.ariaRoleDescription = "textbox";
inputTag.contentEditable = "true";
inputTag.classList.add("input");
inputTag.focus();

inputTagContainer.classList.add("input-tag-container");
tagsContainer.classList.add("tag-container");

inputTagContainer.appendChild(tagsContainer);
tagsContainer.appendChild(inputTag);

inputTagContainer.addEventListener("click", (e) => {
  if (
    e.target.id === "input-tag" ||
    e.target.classList.contains("tag-container")
  ) {
    inputTag.focus();
  }
});

// input-tag cuando escribimnos
inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && inputTag.textContent !== "") {
        e.preventDefault();
        if (!existTag(inputTag.textContent)) {
        tags.push(inputTag.textContent);
        inputTag.textContent = "";
        renderTags();
        } 
   }else if ( e.key === "Backspace" &&
        inputTag.textContent === "" &&
        tags.length > 0 ) {
        // valida si tecla BCKSPC y inputTag=blanco y cantidad tags > 0
        tags.pop(); // Elimino el ultimo tag
        renderTags();  // mostrar los tags
   }
});

function renderTags() {
  tagsContainer.innerHTML = "";
  const html = tags.map((tag) => {
    const tagElement = document.createElement("div");
    const tagButton = document.createElement("button");

    tagElement.classList.add("tag-item");
    tagButton.textContent = "X";
    tagButton.addEventListener("click", (e) => {
      // eliminar etiqueta
      removeTag(tag);
    });
    tagElement.appendChild(document.createTextNode(tag));
    tagElement.appendChild(tagButton);
    return tagElement;
  });

  html.forEach((element) => {
    tagsContainer.appendChild(element);
  });
  tagsContainer.appendChild(inputTag);
  inputTag.focus();
}

// validad si ya existe un tag
function existTag(value) {
  return tags.includes(value);
}

// remover un tag
function removeTag(value) {
  tags = tags.filter((tag) => tag !== value);
  renderTags();
}
