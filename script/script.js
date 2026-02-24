const userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];
const form = document.getElementById("form");
let editMode = null;
const saveData = (userDetails) => {
  localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

window.onload = () => {
  onRender();

  if (userDetails.length === 0) {
    setTimeout(() => {
      formAppear();
    }, 1000);
  }
};
const formSubmit = (event) => {
  event.preventDefault();
  const form = event.target;
  //   console.log(form);
  const fname = form.fname.value;
  const lname = form.lname.value;
  const email = form.email.value;
  const gender = form.gender.value;
  const age = form.age.value;
  const city = form.city.value;
  const num = form.num.value;
  const pass = form.pass.value;
  const user = {
    fname,
    lname,
    email,
    gender,
    age,
    city,
    num,
    pass,
  };
  if (editMode === null) {
    console.log("Add mode working");
    userDetails.push(user);
  } else {
    console.log("edit mode woking");
    userDetails[editMode] = {
      fname,
      lname,
      email,
      gender,
      age,
      city,
      num,
      pass,
    };
    editMode = null;
    form.querySelector("#submit").textContent = "Submit";
  }
  // console.log(user);
  saveData(userDetails);
  // console.log(userDetails);
  onRender();
  form.reset();
  closeForm();
};

const onRender = () => {
  const list = document.getElementById("list");
  list.innerHTML = "";
  userDetails.forEach((elem, index) => {
    const li = document.createElement("li");
    li.className = "grid grid-cols-10  border-b border-gray-300 py-5";
    li.innerHTML = `<span class="col-span-2 px-4">${elem.fname} ${elem.lname}</span>  <span class="col-span-2 px-2">${elem.email}</span>  <span class="px-2">${elem.gender}</span>  <span>${elem.age}</span>  <span>${elem.city}</span>  <span class="col-span-1">${elem.num}</span>  <span class="col-span-2 ml-4 xl:ml-8 "> <button onclick="handelEdit(${index})" id="edit">Edit</button><button onclick="handelDelete(${index})" id="delete">Delete</button></span>`;
    list.appendChild(li);
  });
};

const handelEdit = (index) => {
  console.log(index);
  const user = userDetails[index];
  editMode = index;
  console.log(user);
  form.fname.value = user.fname;
  form.lname.value = user.lname;
  form.email.value = user.email;
  form.gender.value = user.gender;
  form.age.value = user.age;
  form.city.value = user.city;
  form.num.value = user.num;
  form.querySelector("#submit").textContent = "Update";
  formAppear();
};

const handelDelete = (id) => {
  userDetails.splice(id, 1);
  saveData(userDetails);
  onRender();
};

const formAppear = () => {
  const fromDiv = document.getElementById("registerForm");
  const overlay = document.getElementById("overlay");

  fromDiv.classList.toggle("-translate-y-[150%]");
  fromDiv.classList.toggle("translate-y-[10%]");
  overlay.classList.toggle("opacity-0");
  overlay.classList.toggle("opacity-100");
  overlay.classList.toggle("pointer-events-none");
};
function closeForm() {
  const form = document.getElementById("registerForm");
  const overlay = document.getElementById("overlay");

  form.classList.remove("translate-y-[10%]");
  form.classList.add("-translate-y-[150%]");

  if (overlay) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0", "pointer-events-none");
  }
}
