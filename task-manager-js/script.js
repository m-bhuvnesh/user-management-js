const btnId = document.getElementById("addUserBtn");
btnId.addEventListener("click", addUser);

const filterButtons = document.querySelectorAll(".filters button");

let userList = [];

let currentFilter = "all";

function addUser() {
  const userName = document.getElementById("userName").value;
  const userRole = document.getElementById("userRole").value;

  if (!userName) return;

  const user = {
    id: Date.now(),
    name: userName,
    role: userRole,
    active: true,
  };

  userList.push(user);
  renderUsers();
}

function renderUsers() {
  const list = document.getElementById("userList");
  list.innerHTML = "";

  let filteredUsers = userList;

  if (currentFilter === "active") {
    filteredUsers = userList.filter((user) => user.active);
  }

  if (currentFilter === "admin") {
    filteredUsers = userList.filter((user) => user.role === "admin");
  }

  filteredUsers.forEach((user) => {
    const li = document.createElement("li");
    li.classList.add("user-item");

    const text = document.createElement("span");
    text.textContent = `${user.name} (${user.role}) - ${
      user.active ? "Active" : "Inactive"
    }`;

    const div = document.createElement("div");
    div.classList.add("task-actions");

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Toggle";
    toggleBtn.classList.add("toggle");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete");

    toggleBtn.addEventListener("click", () => {
      toggleStatus(user.id);
    });

    deleteBtn.addEventListener("click", () => {
      deleteUser(user.id);
    });

    div.appendChild(toggleBtn);
    div.appendChild(deleteBtn);

    li.appendChild(text);
    li.appendChild(div);
    list.appendChild(li);
  });
}

function deleteUser(id) {
  userList = userList.filter((user) => user.id !== id);
  renderUsers();
}

function toggleStatus(id) {
  userList = userList.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        active: !user.active,
      };
    }
    return user;
  });

  renderUsers();
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    renderUsers();
  });
});
