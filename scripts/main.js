// Responsive Menu
const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu").querySelector("ul");
menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Dynamic Dates
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

// Course List Array
const courses = [
  { code: "WDD130", name: "Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "WDD131", name: "Dynamic Web Fundamentals", credits: 2, type: "WDD", completed: true },
  { code: "CSE110", name: "Intro to Programming", credits: 2, type: "CSE", completed: true },
  { code: "CSE111", name: "Programming with Functions", credits: 2, type: "CSE", completed: false },
  { code: "CSE210", name: "Programming with Classes", credits: 2, type: "CSE", completed: false }
];

const courseList = document.getElementById("courseList");
const totalCreditsEl = document.getElementById("totalCredits");

function displayCourses(filteredCourses) {
  courseList.innerHTML = "";
  filteredCourses.forEach(course => {
    const card = document.createElement("div");
    card.className = `course-card ${course.completed ? "completed" : "incomplete"}`;
    card.innerHTML = `
      <h3>${course.code}</h3>
      <p>${course.name}</p>
      <p>Credits: ${course.credits}</p>
    `;
    courseList.appendChild(card);
  });

  const totalCredits = filteredCourses.reduce((sum, c) => sum + c.credits, 0);
  totalCreditsEl.textContent = totalCredits;
}

document.getElementById("all").addEventListener("click", () => displayCourses(courses));
document.getElementById("wdd").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "WDD")));
document.getElementById("cse").addEventListener("click", () => displayCourses(courses.filter(c => c.type === "CSE")));

// Initial Load
displayCourses(courses);
