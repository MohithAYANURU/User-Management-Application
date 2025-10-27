
export const inputFactory = (type, id, className, ariaDescribedby) => {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.classList.add(className);
  input.ariaDescribedby = ariaDescribedby;
  return input;
};

export const labelFactory = (text, htmlFor) => {
  const label = document.createElement("label");
  label.htmlFor = htmlFor;
  label.classList.add("form-label");
  label.textContent = text;
  return label;
};

export const appendNodeElement = (parentNode, childNode) => {
  parentNode.appendChild(childNode);
};
