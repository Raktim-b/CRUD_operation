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

  const fnameError = document.getElementById("fnameError");
  const lnameError = document.getElementById("lnameError");
  const emailError = document.getElementById("emailError");
  const genderError = document.getElementById("genderError");
  const ageError = document.getElementById("ageError");
  const cityError = document.getElementById("cityError");
  const numError = document.getElementById("numError");
  const passError = document.getElementById("passError");

  fnameError.textContent = "";
  emailError.textContent = "";
  numError.textContent = "";
  passError.textContent = "";
  lnameError.textContent = "";
  genderError.textContent = "";
  ageError.textContent = "";
  cityError.textContent = "";

  if (fname.length < 3) {
    fnameError.textContent = " At least 3 characters";
    return;
  }
  if (lname.length < 3) {
    lnameError.textContent = "At least 3 characters";
    return;
  }
  if (city.length < 3) {
    cityError.textContent = "Enter a valid city name";
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Enter a valid email";
    return;
  }
  if (age === "") {
    ageError.textContent = "Age is required";
  } else if (age < 18 || age > 60) {
    ageError.textContent = "Age must be between 18 and 60";
  }
  if (num.length !== 10) {
    numError.textContent = "Phone number must be 10 digits";
    return;
  }

  if (pass.length < 6) {
    passError.textContent = "Password must be at least 6 characters";
    return;
  }

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

const Close = () => {
  closeForm();
};
