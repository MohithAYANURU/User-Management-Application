// utils/formFactory.js
export const formFactory = (user = {}) => {
  const form = document.createElement("form");

  // Helper function to create a label + input
  const createInputField = (labelText, id, type = "text", value = "") => {
    const label = document.createElement("label");
    label.htmlFor = id;
    label.classList.add("form-label");
    label.textContent = labelText;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.classList.add("form-control");
    input.value = value;

    form.appendChild(label);
    form.appendChild(input);
  };

  // Create all fields
  createInputField("User Name", "userName", "text", user.name || "");
  createInputField("Email", "userEmail", "email", user.email || "");
  createInputField("Age", "userAge", "number", user.age || "");
  createInputField("Avatar URL", "userAvatar", "text", user.avatar_url || "");
  createInputField("Gender", "userGender", "text", user.gender || "");

  return form;
};
