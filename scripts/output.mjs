export function setTitle(course) {
  document.querySelector("#courseTitle").textContent =
    `${course.code}: ${course.name}`;
}

export function renderSections(sections) {
  const container = document.querySelector("#sections");
  container.innerHTML = "";

  sections.forEach(sec => {
    const div = document.createElement("div");
    div.classList.add("section-card");
    div.innerHTML = `
      <strong>Section ${sec.sectionNum}</strong>
      <p>Enrolled: ${sec.enrolled} / ${sec.available}</p>
    `;
    container.appendChild(div);
  });
}
