
const jobs = [
  {
    id: 1,
    title: "Junior Java Developer",
    company: "DemoTech",
    location: "Bengaluru",
    salary: "₹3–4 LPA (sample)",
    category: "IT",
    type: "Fresher",
    link: ""
  },
  {
    id: 2,
    title: "Customer Support Associate",
    company: "ServiceCo",
    location: "Hyderabad",
    salary: "₹2–3 LPA (sample)",
    category: "Non-IT",
    type: "Entry Level",
    link: ""
  },
  {
    id: 3,
    title: "Web Development Intern",
    company: "CodeDemo",
    location: "Remote",
    salary: "Stipend varies",
    category: "Internship",
    type: "Internship",
    link: ""
  },
  {
    id: 4,
    title: "Data Entry Executive",
    company: "OfficeDemo",
    location: "Bengaluru",
    salary: "Salary not specified",
    category: "Non-IT",
    type: "Fresher",
    link: ""
  }
];

const jobList = document.getElementById("jobList");
const keyword = document.getElementById("keyword");
const locationInput = document.getElementById("location");
const category = document.getElementById("category");
const count = document.getElementById("count");
const listTitle = document.getElementById("listTitle");

let savedJobs = JSON.parse(
  localStorage.getItem("savedJobs") || "[]"
);
let showSaved = false;

function renderJobs() {
  const searchText = keyword.value.toLowerCase().trim();
  const place = locationInput.value.toLowerCase().trim();

  const filtered = jobs.filter(job => {
    const matchesText =
      job.title.toLowerCase().includes(searchText) ||
      job.company.toLowerCase().includes(searchText);

    const matchesLocation =
      job.location.toLowerCase().includes(place);

    const matchesCategory =
      category.value === "All" ||
      job.category === category.value;

    const matchesSaved =
      !showSaved || savedJobs.includes(job.id);

    return matchesText && matchesLocation &&
      matchesCategory && matchesSaved;
  });

  listTitle.textContent = showSaved
    ? "Saved Jobs"
    : "Latest Jobs";

  count.textContent = `${filtered.length} job(s) found`;

  if (filtered.length === 0) {
    jobList.innerHTML = "<p>No jobs found. Try another search.</p>";
    return;
  }

  jobList.innerHTML = filtered.map(job => `
    <article class="job-card">
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${job.location}</p>
      <p><strong>Salary:</strong> ${job.salary}</p>
      <p><strong>Type:</strong> ${job.type}</p>

      <div class="job-actions">
        <button class="apply-btn"
          data-apply="${job.id}">View / Apply</button>

        <button class="save-btn"
          data-save="${job.id}">
          ${savedJobs.includes(job.id) ? "★ Saved" : "☆ Save"}
        </button>
      </div>
    </article>
  `).join("");
}

document.getElementById("searchForm")
  .addEventListener("submit", event => {
    event.preventDefault();
    renderJobs();
  });

category.addEventListener("change", renderJobs);

document.getElementById("homeBtn").addEventListener("click", () => {
  showSaved = false;
  renderJobs();
});

document.getElementById("savedBtn").addEventListener("click", () => {
  showSaved = true;
  renderJobs();
});

jobList.addEventListener("click", event => {
  const saveId = event.target.dataset.save;
  const applyId = event.target.dataset.apply;

  if (saveId) {
    const id = Number(saveId);

    if (savedJobs.includes(id)) {
      savedJobs = savedJobs.filter(savedId => savedId !== id);
    } else {
      savedJobs.push(id);
    }

    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    renderJobs();
  }

  if (applyId) {
    const job = jobs.find(item => item.id === Number(applyId));

    if (job && job.link) {
      window.open(job.link, "_blank", "noopener,noreferrer");
    } else {
      alert("This is a demo listing. Add a verified application URL to enable applying.");
    }
  }
});

renderJobs();
