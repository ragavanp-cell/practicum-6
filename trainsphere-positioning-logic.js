// TrainSphere Positioning & Practicum Interactive Engine — 25CS208 Compliant

// 10. DOM element selection via querySelector
const positioningCanvasEl = document.querySelector("#positioningCanvas");

// Interactive Positioning "Try it Yourself" Highlight Function
function highlightOverlayBadge(positionKey) {
    document.querySelectorAll(".ts-pos-label").forEach(el => el.classList.remove("active-highlight"));
    const targetBadge = document.getElementById("badge-" + positionKey);
    const readout = document.getElementById("positioningInspectorMsg");

    const cssDescriptions = {
        "top-left": "position: absolute; top: 14px; left: 16px; z-index: 20;",
        "top-right": "position: absolute; top: 14px; right: 16px; z-index: 20;",
        "bottom-left": "position: absolute; bottom: 14px; left: 16px; z-index: 20;",
        "bottom-right": "position: absolute; bottom: 14px; right: 16px; z-index: 20;",
        "centered": "position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 20;"
    };

    if (targetBadge) {
        targetBadge.classList.add("active-highlight");
    }
    if (readout) {
        readout.textContent = "Highlighted [" + positionKey.toUpperCase() + "] -> " + cssDescriptions[positionKey];
    }
}

// 15. Dark Mode Switcher (Light/Dark buttons onclick)
function switchPortalTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
    } else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
    }
}

// Highlight selected quadrant card
function focusQuadrantPlan(planName) {
    document.querySelectorAll(".ts-quad-cell").forEach(c => c.classList.remove("quad-focused"));
    const cell = document.getElementById("quad-" + planName);
    if (cell) {
        cell.classList.add("quad-focused");
    }
    const selectEl = document.getElementById("planTierSelect");
    if (selectEl) {
        selectEl.value = planName;
    }
}

// 9. setTimeout & clearTimeout for quick navbar notification
let noticeTimeoutId = null;
function showQuickNotice(label) {
    const statusLine = document.getElementById("validationStatusText");
    if (noticeTimeoutId) {
        clearTimeout(noticeTimeoutId);
    }
    statusLine.style.color = "#1a8cff";
    statusLine.textContent = "TrainSphere Portal: Ready for " + label + " authentication.";
    document.getElementById("booking-validation").scrollIntoView({ behavior: "smooth" });

    noticeTimeoutId = setTimeout(() => {
        statusLine.textContent = "";
    }, 4000);
}

// 11. Form with Validation (Submit button onclick, if/else checks, empty box check, only numbers validation)
function handleFormValidation(event) {
    event.preventDefault();

    const nameVal = document.getElementById("coordinatorName").value.trim();
    const emailVal = document.getElementById("coordinatorEmail").value.trim();
    const seatsVal = document.getElementById("teamSeatsInput").value.trim();
    const goalsVal = document.getElementById("goalsTextarea").value.trim();
    const statusEl = document.getElementById("validationStatusText");

    // Empty box check (if/else)
    if (nameVal === "" || emailVal === "" || seatsVal === "" || goalsVal === "") {
        statusEl.style.color = "#dc2626";
        statusEl.textContent = "Error: All required boxes must not be empty.";
        return false;
    }

    // Only numbers validation
    if (!/^[0-9]+$/.test(seatsVal) || parseInt(seatsVal, 10) <= 0) {
        statusEl.style.color = "#dc2626";
        statusEl.textContent = "Error: Number of Participants must contain only positive numbers.";
        return false;
    }

    if (!emailVal.includes("@") || !emailVal.includes(".")) {
        statusEl.style.color = "#dc2626";
        statusEl.textContent = "Error: Enter a valid corporate email address.";
        return false;
    }

    statusEl.style.color = "#04aa6d";
    statusEl.textContent = "✓ Confirmed! Workshop & Reduction request logged for " + nameVal + " (" + seatsVal + " seats).";
    document.getElementById("tsBookingForm").reset();
    return true;
}

// 9. setInterval & clearInterval countdown timer
let timerSeconds = 300;
let timerIntervalRef = null;

function tickCountdown() {
    const clock = document.getElementById("countdownClock");
    if (!clock) return;
    const m = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    const s = String(timerSeconds % 60).padStart(2, "0");
    clock.textContent = m + ":" + s;
    timerSeconds = timerSeconds > 0 ? timerSeconds - 1 : 300;
}

function startCountdown() {
    if (!timerIntervalRef) {
        timerIntervalRef = setInterval(tickCountdown, 1000);
    }
}

function stopCountdown() {
    if (timerIntervalRef) {
        clearInterval(timerIntervalRef);
        timerIntervalRef = null;
    }
}

// 13. Task Manager (CRUD array of tasks)
let practicumTasks = [
    { id: 1, title: "Baseline AWS/Azure cloud waste (-34% reduction target)", completed: false },
    { id: 2, title: "Conduct 2-day GenAI Automation Workshop", completed: true },
    { id: 3, title: "Verify Scope 3 supplier carbon reduction report", completed: false }
];

function renderCrudTasks() {
    const listEl = document.getElementById("crudTaskList");
    if (!listEl) return;
    listEl.innerHTML = "";

    practicumTasks.forEach((item, idx) => {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = item.title;
        if (item.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.65";
        }

        const btnBox = document.createElement("div");

        const doneBtn = document.createElement("button");
        doneBtn.type = "button";
        doneBtn.textContent = item.completed ? "Undo" : "Done";
        doneBtn.onclick = () => {
            practicumTasks[idx].completed = !practicumTasks[idx].completed;
            renderCrudTasks();
        };

        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const nextText = prompt("Edit task:", practicumTasks[idx].title);
            if (nextText && nextText.trim() !== "") {
                practicumTasks[idx].title = nextText.trim();
                renderCrudTasks();
            }
        };

        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.textContent = "Delete";
        delBtn.onclick = () => {
            practicumTasks.splice(idx, 1);
            renderCrudTasks();
        };

        btnBox.appendChild(doneBtn);
        btnBox.appendChild(editBtn);
        btnBox.appendChild(delBtn);

        li.appendChild(span);
        li.appendChild(btnBox);
        listEl.appendChild(li);
    });
}

function createTaskItem() {
    const input = document.getElementById("newTaskInput");
    const text = input.value.trim();
    if (text === "") {
        alert("Please type a task before clicking Add.");
        return;
    }
    practicumTasks.push({ id: Date.now(), title: text, completed: false });
    input.value = "";
    renderCrudTasks();
}

// 14. Interactive Component (Quiz questions array + Next button onclick)
const positioningQuizArray = [
    {
        q: "1. Which CSS position value places corner badges relative to the nearest positioned ancestor?",
        choices: ["position: absolute", "position: static", "position: initial"],
        correct: 0
    },
    {
        q: "2. Which TrainSphere workshop reduces idle cloud spend and server CO₂e by ~34%?",
        choices: ["Green FinOps & Cloud Rightsizing", "Typography Basics", "Manual Spreadsheet Entry"],
        correct: 0
    },
    {
        q: "3. Which property controls the vertical stacking order of overlapping positioned elements?",
        choices: ["z-index", "flex-wrap", "border-radius"],
        correct: 0
    }
];

let quizIdx = 0;

function renderQuizStep() {
    const item = positioningQuizArray[quizIdx];
    const promptEl = document.getElementById("quizPromptText");
    const choicesEl = document.getElementById("quizChoicesContainer");
    const resultEl = document.getElementById("quizResultLine");

    if (!promptEl || !choicesEl) return;
    promptEl.textContent = item.q;
    resultEl.textContent = "";
    choicesEl.innerHTML = "";

    item.choices.forEach((choiceText, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "ts-choice-btn";
        btn.textContent = choiceText;
        btn.onclick = () => {
            if (i === item.correct) {
                resultEl.style.color = "#04aa6d";
                resultEl.textContent = "✓ Correct answer!";
            } else {
                resultEl.style.color = "#dc2626";
                resultEl.textContent = "✗ Try again or click Next Question.";
            }
        };
        choicesEl.appendChild(btn);
    });
}

function advanceQuizQuestion() {
    quizIdx = (quizIdx + 1) % positioningQuizArray.length;
    renderQuizStep();
}

// 12. Endpoint Data Management (API calls fetch/AJAX, JS function process & display, Test / debugging)
async function loadEndpointBenchmarks() {
    const grid = document.getElementById("endpointCardsGrid");
    if (!grid) return;
    grid.innerHTML = "<p>Fetching live benchmark data...</p>";

    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users?_limit=3");
        if (!res.ok) throw new Error("Status " + res.status);
        const json = await res.json();
        console.log("Endpoint Debug Data:", json);
        renderEndpointCards(json);
    } catch (err) {
        console.warn("Using fallback benchmark dataset:", err);
        renderEndpointCards([
            { company: { name: "Stratos Cloud Labs" }, address: { city: "Bengaluru" } },
            { company: { name: "EcoGrid Manufacturing" }, address: { city: "Coimbatore" } },
            { company: { name: "FinPulse Enterprise" }, address: { city: "Chennai" } }
        ]);
    }
}

function renderEndpointCards(list) {
    const grid = document.getElementById("endpointCardsGrid");
    const outcomes = [
        "-34% Cloud Infrastructure Spend (Green FinOps)",
        "-42% Manual Ops Cycle Time (GenAI Bootcamp)",
        "-28% Scope 3 Supply-Chain CO₂e (Reduction Sprint)"
    ];
    grid.innerHTML = list.map((entry, idx) => `
        <div class="ts-api-card">
            <h4>${entry.company ? entry.company.name : "Partner Organization"}</h4>
            <p><b>Region:</b> ${entry.address ? entry.address.city : "Global"}</p>
            <p><b>Result:</b> ${outcomes[idx % outcomes.length]}</p>
        </div>
    `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
    renderCrudTasks();
    renderQuizStep();
    startCountdown();
    loadEndpointBenchmarks();
});
