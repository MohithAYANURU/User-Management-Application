import { fetchData } from "./utils/fetchData.js";
import { formFactory } from "./utils/formFactory.js";
import { putData } from "./utils/putData.js";

const alertBox = document.querySelector(".alert");
const spinner = document.querySelector(".spinner-border");
const remoteURL = "./response.json"; // your local JSON
let users = [];
let currentEditIndex = null; 

// Load users from JSON
const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    const data = await fetchData(remoteURL);
    spinner.classList.add("d-none");

    users = Array.isArray(data.data) ? data.data : [];
    displayUsers(users);
    addEditEventListeners();
  } catch (error) {
    spinner.classList.add("d-none");
    alertBox.classList.remove("d-none");
    alertBox.classList.add("alert-danger");
    alertBox.innerHTML = `Failed to load data: ${error.message}`;
    console.error(error);
  }
};

// Display user cards
const displayUsers = (localUsers) => {
  const container = document.getElementById("users-container");
  container.innerHTML = "";

  if (!localUsers || localUsers.length === 0) {
    alertBox.classList.remove("d-none");
    alertBox.classList.add("alert-danger");
    alertBox.innerHTML = "No users found.";
    return;
  }

  localUsers.forEach((user) => {
    container.innerHTML += `
      <article class="card m-3 p-2">
        <div class="card-image p-3 text-center">
          <img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-contain" />
        </div>
        <div class="card-body">
          <h5 class="card-title">${user.name}</h5>
          <ul class="list-group">
            <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
            <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
            <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
          </ul>
          <button 
            data-user-id="${user.id}" 
            data-bs-target="#exampleModal" 
            data-bs-toggle="modal" 
            class="btn btn-secondary m-2"
          >
            Edit
          </button>
        </div>
      </article>
    `;
  });
};

// Add event listeners to all Edit buttons
const addEditEventListeners = () => {
  const editButtons = document.querySelectorAll(".btn-secondary");

  editButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = ""; 

      currentEditIndex = index; 
      const user = users[index];
      const form = formFactory(user);
      modalBody.appendChild(form);

      // Set user id on submit button
      const submitBtn = document.querySelector(".submit-btn");
      if (submitBtn) {
        submitBtn.setAttribute("data-user-id", user.id);
      }
    });
  });

  attachSubmitListener();
};

// Attach submit listener (reusable)
const attachSubmitListener = () => {
  const submitBtn = document.querySelector(".submit-btn");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", async () => {
    if (currentEditIndex === null) return;

    // Grab updated data
    const updatedData = {
      name: document.querySelector("#userName").value,
      email: document.querySelector("#userEmail").value,
      age: document.querySelector("#userAge").value,
      avatar_url: document.querySelector("#userAvatar").value,
      gender: document.querySelector("#userGender").value,
      id: document.querySelector(".submit-btn").getAttribute("data-user-id")
    };

    // Show modal spinner
    document.querySelector(".modal-body").innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    `;

    try {
      const response = await putData("https://easy-simple-users-rest-api.onrender.com/api/users", updatedData);


      // Update local user
      users[currentEditIndex] = { ...users[currentEditIndex], ...updatedData };

      // Update the card
      updateCard(updatedData);

      // Show success
      document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
          <div class="alert alert-success" role="alert">
            ${response.message || "User updated successfully!"}
          </div>
        </div>
      `;

      // Close modal after a short delay
      const modalEl = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      setTimeout(() => {
        modal.hide();
        addEditEventListeners(); // reattach listeners after updating DOM
      }, 700);

    } catch (error) {
      console.error("Failed to update user:", error);
      document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
          <div class="alert alert-danger w-100" role="alert">
            ${error.message}
          </div>
        </div>
      `;
    }
  });
};

// Update a single card
const updateCard = (user) => {
  const cards = Array.from(document.querySelectorAll(".card"));
  const foundCard = cards.find(card => Number(card.querySelector("button").getAttribute("data-user-id")) === Number(user.id));

  if (!foundCard) return;

  foundCard.innerHTML = `
    <div class="card-image p-3 text-center">
      <img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-contain" />
    </div>
    <div class="card-body">
      <h5 class="card-title">${user.name}</h5>
      <ul class="list-group">
        <li class="list-group-item"><strong>Email:</strong> ${user.email}</li>
        <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
        <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
      </ul>
      <button 
        data-user-id="${user.id}" 
        data-bs-target="#exampleModal" 
        data-bs-toggle="modal" 
        class="btn btn-secondary m-2"
      >
        Edit
      </button>
    </div>
  `;
};

document.addEventListener("DOMContentLoaded", () => {
  loadData();
});
