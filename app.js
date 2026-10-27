"use strict";

const initialRoutines = [
    { day: "Monday", split: "Push Day: Chest/Triceps", exercise: "Barbell Bench Press", sets: 4, reps: 10 },
    { day: "Monday", split: "Push Day: Chest/Triceps", exercise: "Overhead Shoulder Press", sets: 3, reps: 10 },
    { day: "Tuesday", split: "Pull Day: Back/Biceps", exercise: "Lat Pulldown", sets: 4, reps: 12 },
    { day: "Tuesday", split: "Pull Day: Back/Biceps", exercise: "Dumbbell Bicep Curl", sets: 3, reps: 12 },
    { day: "Wednesday", split: "Leg Day: Quads/Hamstrings", exercise: "Barbell Squat", sets: 4, reps: 8 },
    { day: "Friday", split: "Full Body", exercise: "Conventional Deadlift", sets: 3, reps: 6 }
];

const initialLogs = [
    { date: new Date().toISOString().split('T')[0], exercise: "Barbell Bench Press", sets: 4, reps: 10, weight: 60, unit: "kg" },
    { date: new Date().toISOString().split('T')[0], exercise: "Lat Pulldown", sets: 4, reps: 12, weight: 55, unit: "kg" }
];

const exerciseCatalog = [
    {
        name: "Barbell Bench Press",
        muscle: "Chest",
        tagClass: "tag-chest",
        equipment: "Barbell & Flat Bench",
        tip: "Keep feet flat, retract shoulder blades, and touch lower chest.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="65" width="140" height="10" rx="3" fill="#64748b"/>
            <rect x="50" y="75" width="10" height="20" fill="#94a3b8"/>
            <rect x="140" y="75" width="10" height="20" fill="#94a3b8"/>
            <circle cx="70" cy="55" r="9" fill="#f87171"/>
            <rect x="75" y="52" width="50" height="12" rx="4" fill="#ef4444"/>
            <line x1="40" y1="35" x2="160" y2="35" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <rect x="30" y="25" width="10" height="20" rx="2" fill="#3b82f6"/>
            <rect x="160" y="25" width="10" height="20" rx="2" fill="#3b82f6"/>
        </svg>`
    },
    {
        name: "Lat Pulldown",
        muscle: "Back",
        tagClass: "tag-back",
        equipment: "Cable Pulldown Machine",
        tip: "Grip wide, lean back slightly, pull bar down toward upper chest.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <rect x="95" y="10" width="10" height="75" fill="#64748b"/>
            <line x1="30" y1="25" x2="170" y2="25" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <circle cx="100" cy="65" r="9" fill="#60a5fa"/>
            <path d="M 85 85 L 100 70 L 115 85" stroke="#2563eb" stroke-width="6" fill="none"/>
            <rect x="70" y="85" width="60" height="10" rx="3" fill="#94a3b8"/>
        </svg>`
    },
    {
        name: "Barbell Squat",
        muscle: "Legs",
        tagClass: "tag-legs",
        equipment: "Squat Rack & Barbell",
        tip: "Hips back, thighs parallel to floor, push through your heels.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="30" r="9" fill="#34d399"/>
            <path d="M 100 40 L 100 65 L 85 85 M 100 65 L 115 85" stroke="#059669" stroke-width="6" stroke-linecap="round" fill="none"/>
            <line x1="40" y1="35" x2="160" y2="35" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <rect x="32" y="25" width="8" height="20" rx="2" fill="#10b981"/>
            <rect x="160" y="25" width="8" height="20" rx="2" fill="#10b981"/>
        </svg>`
    },
    {
        name: "Overhead Shoulder Press",
        muscle: "Shoulders",
        tagClass: "tag-shoulders",
        equipment: "Barbell / Dumbbells",
        tip: "Press vertically overhead, brace your core, do not hyperextend.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="45" r="9" fill="#fbbf24"/>
            <line x1="100" y1="55" x2="100" y2="85" stroke="#d97706" stroke-width="6"/>
            <line x1="40" y1="18" x2="160" y2="18" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <rect x="32" y="10" width="8" height="16" rx="2" fill="#f59e0b"/>
            <rect x="160" y="10" width="8" height="16" rx="2" fill="#f59e0b"/>
            <path d="M 80 40 L 70 22 M 120 40 L 130 22" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
        </svg>`
    },
    {
        name: "Dumbbell Bicep Curl",
        muscle: "Arms",
        tagClass: "tag-arms",
        equipment: "Pair of Dumbbells",
        tip: "Keep elbows pinned to your sides, curl upward and squeeze.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="30" r="9" fill="#a78bfa"/>
            <line x1="100" y1="40" x2="100" y2="80" stroke="#7c3aed" stroke-width="6"/>
            <rect x="65" y="45" width="12" height="20" rx="2" fill="#8b5cf6"/>
            <rect x="123" y="45" width="12" height="20" rx="2" fill="#8b5cf6"/>
            <path d="M 100 45 L 75 55 M 100 45 L 125 55" stroke="#7c3aed" stroke-width="4"/>
        </svg>`
    },
    {
        name: "Conventional Deadlift",
        muscle: "Full Body",
        tagClass: "tag-full",
        equipment: "Olympic Barbell & Bumper Plates",
        tip: "Neutral spine, bar close to shins, drive hips forward to lock out.",
        svg: `<svg viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
            <line x1="25" y1="75" x2="175" y2="75" stroke="#1e293b" stroke-width="5" stroke-linecap="round"/>
            <circle cx="35" cy="75" r="14" fill="#ec4899"/>
            <circle cx="165" cy="75" r="14" fill="#ec4899"/>
            <circle cx="100" cy="35" r="9" fill="#f472b6"/>
            <path d="M 100 45 L 90 65 L 100 85 M 100 45 L 110 65 L 100 85" stroke="#db2777" stroke-width="5" fill="none"/>
        </svg>`
    }
];

const getRoutines = () => {
    try {
        const data = localStorage.getItem("routines");
        return data ? JSON.parse(data) : [...initialRoutines];
    } catch (e) {
        console.error("Failed to load routines:", e.message);
        return [...initialRoutines];
    }
};

const saveRoutines = (data) => {
    try {
        localStorage.setItem("routines", JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save routines:", e.message);
    }
};

const getLogs = () => {
    try {
        const data = localStorage.getItem("logs");
        return data ? JSON.parse(data) : [...initialLogs];
    } catch (e) {
        console.error("Failed to load logs:", e.message);
        return [...initialLogs];
    }
};

const saveLogs = (data) => {
    try {
        localStorage.setItem("logs", JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save logs:", e.message);
    }
};

const switchTab = (tabId) => {
    document.querySelectorAll(".tab-content").forEach(el => el.classList.remove("active"));

    document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.add("active");
    }

    document.querySelectorAll(`.nav-btn[data-tab="${tabId}"]`).forEach(btn => {
        btn.classList.add("active");
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
};

const validateInput = (input, regex) => {
    if (input.value.trim() === "") {
        input.className = "";
    } else if (regex.test(input.value.trim())) {
        input.className = "is-valid";
    } else {
        input.className = "is-invalid";
    }
};

let dragSrcIndex = null;

const dragStart = (index) => {
    dragSrcIndex = index;
};

const dragOver = (e) => {
    e.preventDefault();
};

const dropOn = (targetIndex) => {
    if (dragSrcIndex === null || dragSrcIndex === targetIndex) return;
    try {
        const routines = getRoutines();
        const dragged = routines.splice(dragSrcIndex, 1)[0];
        routines.splice(targetIndex, 0, dragged);
        saveRoutines(routines);
        renderRoutines();
    } catch (err) {
        console.error("Drag & drop reordering failed:", err.message);
    }
    dragSrcIndex = null;
};

const getSplitBadge = (splitName) => {
    if (splitName.includes("Push")) return { cls: "badge-push-split", icon: "💪" };
    if (splitName.includes("Pull")) return { cls: "badge-pull-split", icon: "⚡" };
    if (splitName.includes("Leg"))  return { cls: "badge-leg-split",  icon: "🦵" };
    return { cls: "badge-full-split", icon: "🔥" };
};

const renderRoutines = () => {
    const routines = getRoutines();
    const filter = document.getElementById("filterDay").value;
    const filtered = (filter === "ALL") ? routines : routines.filter(r => r.day === filter);

    const listCardsContainer = document.getElementById("routineListCards");
    if (listCardsContainer) {
        if (filtered.length === 0) {
            listCardsContainer.innerHTML = `<div style="text-align:center; padding:20px; color:var(--text-muted); font-size:13px;">No routines found for ${filter}. Add one above!</div>`;
        } else {
            listCardsContainer.innerHTML = filtered.map((r) => {
                const globalIndex = routines.indexOf(r);
                const badge = getSplitBadge(r.split);
                return `
                    <div class="routine-item-card" draggable="true"
                         ondragstart="dragStart(${globalIndex})"
                         ondragover="dragOver(event)"
                         ondrop="dropOn(${globalIndex})">
                        <div class="routine-left">
                            <div class="split-icon-badge ${badge.cls}">${badge.icon}</div>
                            <div class="routine-meta">
                                <h4>${r.exercise}</h4>
                                <p>${r.split}</p>
                                <div class="tag-row">
                                    <span class="mini-tag">📅 ${r.day}</span>
                                    <span class="mini-tag" style="color:var(--primary);">🎯 ${r.sets} sets × ${r.reps} reps</span>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="btn-delete-item" onclick="deleteRoutine(${globalIndex})">Delete</button>
                    </div>
                `;
            }).join("");
        }
    }

    document.getElementById("routineTableBody").innerHTML = filtered.map((r, i) => `
        <tr draggable="true"
            ondragstart="dragStart(${routines.indexOf(r)})"
            ondragover="dragOver(event)"
            ondrop="dropOn(${routines.indexOf(r)})"
            style="cursor:grab;">
            <td>${i + 1}</td>
            <td><b>${r.day}</b></td>
            <td>${r.split}</td>
            <td>${r.exercise}</td>
            <td>${r.sets}</td>
            <td>${r.reps}</td>
            <td class="no-print"><button class="btn-delete-item" onclick="deleteRoutine(${routines.indexOf(r)})">Delete</button></td>
        </tr>
    `).join("");

    document.getElementById("statPlanned").textContent = routines.length;
    renderTodayPreview(routines);
};

const addRoutine = (e) => {
    e.preventDefault();
    const exercise = document.getElementById("planExercise").value.trim();

    if (!/^[A-Za-z0-9\s\-]{3,30}$/.test(exercise)) {
        return alert("Please enter a valid exercise name (3-30 letters or numbers)!");
    }

    const routines = getRoutines();
    routines.push({
        day: document.getElementById("planDay").value,
        split: document.getElementById("planSplit").value,
        exercise,
        sets: parseInt(document.getElementById("planSets").value),
        reps: parseInt(document.getElementById("planReps").value)
    });
    saveRoutines(routines);
    renderRoutines();
    document.getElementById("routineForm").reset();
};

const deleteRoutine = (index) => {
    const routines = getRoutines();
    routines.splice(index, 1);
    saveRoutines(routines);
    renderRoutines();
};

const renderLogs = () => {
    const logs = getLogs();

    document.getElementById("logTableBody").innerHTML = logs.map((l, i) => {
        const unit = l.unit || "kg";
        const vol = l.sets * l.reps * l.weight;
        return `
            <tr>
                <td>${i + 1}</td>
                <td>${l.date}</td>
                <td><b>${l.exercise}</b></td>
                <td>${l.sets}</td>
                <td>${l.reps}</td>
                <td>${l.weight} ${unit}</td>
                <td><b>${vol.toLocaleString()} ${unit}</b></td>
                <td class="no-print"><button class="btn-delete-item" onclick="deleteLog(${i})">Delete</button></td>
            </tr>
        `;
    }).join("");

    const totalVol = logs.reduce((sum, item) => {
        const wt = (item.unit === "lbs") ? (item.weight * 0.453592) : item.weight;
        return sum + (item.sets * item.reps * wt);
    }, 0);
    const totalSets = logs.reduce((sum, item) => sum + parseInt(item.sets), 0);

    document.getElementById("footTotalVolume").textContent = `~${Math.round(totalVol).toLocaleString()} kg`;
    document.getElementById("footSetsReps").textContent = `${totalSets} sets`;
    document.getElementById("statLogged").textContent = logs.length;
    document.getElementById("statVolume").textContent = `${Math.round(totalVol).toLocaleString()} kg`;
};

const addLog = (e) => {
    e.preventDefault();
    const exercise = document.getElementById("logExercise").value.trim();

    if (!/^[A-Za-z0-9\s\-]{3,30}$/.test(exercise)) {
        return alert("Please enter a valid exercise name (3-30 letters or numbers)!");
    }

    const logs = getLogs();
    logs.unshift({
        date: document.getElementById("logDate").value,
        exercise,
        sets: parseInt(document.getElementById("logSets").value),
        reps: parseInt(document.getElementById("logReps").value),
        weight: parseFloat(document.getElementById("logWeight").value),
        unit: document.getElementById("logUnit").value
    });
    saveLogs(logs);
    renderLogs();
    document.getElementById("logExercise").value = "";
};

const deleteLog = (index) => {
    const logs = getLogs();
    logs.splice(index, 1);
    saveLogs(logs);
    renderLogs();
};

const clearLogs = () => {
    if (confirm("Clear all logged workout history?")) {
        saveLogs([]);
        renderLogs();
    }
};

let restTimerId = null;
let restTotalDuration = 45;
let restTimeRemaining = 45;
let restTimerRunning = false;
const CIRCLE_CIRCUMFERENCE = 515.22;

const playChimeSound = () => {
    try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();

        const notes = [523.25, 659.25, 783.99];
        notes.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

            gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.15);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.4);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(ctx.currentTime + idx * 0.15);
            osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
        });
    } catch (e) {
        console.log("Audio play prevented or not supported:", e);
    }
};

const updateRestTimerUI = () => {
    const display = document.getElementById("restTimerDisplay");
    const ring = document.getElementById("timerCircleProgress");
    const toggleBtn = document.getElementById("restTimerToggleBtn");

    const m = String(Math.floor(restTimeRemaining / 60)).padStart(2, "0");
    const s = String(restTimeRemaining % 60).padStart(2, "0");
    display.textContent = `${m}:${s}`;

    if (ring && restTotalDuration > 0) {
        const progressFraction = restTimeRemaining / restTotalDuration;
        const offset = CIRCLE_CIRCUMFERENCE * (1 - progressFraction);
        ring.style.strokeDashoffset = offset;
    }

    if (toggleBtn) {
        toggleBtn.textContent = restTimerRunning ? "❚❚ Pause" : "▶ Start";
    }
};

const startRestTimer = (seconds, pillBtn) => {
    if (restTimerId) {
        clearInterval(restTimerId);
        restTimerId = null;
    }

    restTotalDuration = seconds;
    restTimeRemaining = seconds;
    restTimerRunning = true;

    if (pillBtn) {
        document.querySelectorAll(".preset-pill").forEach(p => p.classList.remove("active"));
        pillBtn.classList.add("active");
    }

    updateRestTimerUI();

    restTimerId = setInterval(() => {
        restTimeRemaining--;
        updateRestTimerUI();

        if (restTimeRemaining <= 0) {
            clearInterval(restTimerId);
            restTimerId = null;
            restTimerRunning = false;
            updateRestTimerUI();
            playChimeSound();
        }
    }, 1000);
};

const toggleRestTimer = () => {
    if (restTimerRunning) {
        clearInterval(restTimerId);
        restTimerId = null;
        restTimerRunning = false;
        updateRestTimerUI();
    } else {
        if (restTimeRemaining <= 0) {
            restTimeRemaining = restTotalDuration;
        }
        restTimerRunning = true;
        updateRestTimerUI();

        restTimerId = setInterval(() => {
            restTimeRemaining--;
            updateRestTimerUI();

            if (restTimeRemaining <= 0) {
                clearInterval(restTimerId);
                restTimerId = null;
                restTimerRunning = false;
                updateRestTimerUI();
                playChimeSound();
            }
        }, 1000);
    }
};

const resetRestTimer = () => {
    if (restTimerId) {
        clearInterval(restTimerId);
        restTimerId = null;
    }
    restTimerRunning = false;
    restTimeRemaining = restTotalDuration;
    updateRestTimerUI();
};

let swElapsed = 0;
let swStartTime = null;
let swTimerId = null;
let swRunning = false;
let swLaps = [];

const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const s = String(totalSeconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
};

const getStopwatchTime = () => swRunning
    ? swElapsed + (Date.now() - swStartTime)
    : swElapsed;

const updateStopwatchDisplay = () => {
    document.getElementById("swDisplay").textContent = formatTime(getStopwatchTime());
};

const toggleStopwatch = () => {
    const btn = document.getElementById("swStartBtn");
    if (swRunning) {
        swElapsed += Date.now() - swStartTime;
        clearInterval(swTimerId);
        swTimerId = null;
        swRunning = false;
        btn.textContent = "▶ Resume";
    } else {
        swStartTime = Date.now();
        swTimerId = setInterval(updateStopwatchDisplay, 1000);
        swRunning = true;
        btn.textContent = "❚❚ Pause";
    }
};

const recordLap = () => {
    const now = getStopwatchTime();
    if (now === 0) return alert("Start the stopwatch first!");
    const previous = swLaps.length > 0 ? swLaps[swLaps.length - 1].total : 0;
    swLaps.push({ split: now - previous, total: now });
    renderLaps();
};

const renderLaps = () => {
    document.getElementById("lapTableBody").innerHTML = swLaps.length === 0
        ? `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No sets recorded yet.</td></tr>`
        : swLaps.map((lap, i) => `
            <tr>
                <td>${i + 1}</td>
                <td><b>${formatTime(lap.split)}</b></td>
                <td>${formatTime(lap.total)}</td>
            </tr>
        `).reverse().join("");
};

const resetStopwatch = () => {
    const finalTime = getStopwatchTime();
    if (finalTime > 0) {
        const totalSeconds = (parseInt(localStorage.getItem("workoutTime")) || 0) + Math.floor(finalTime / 1000);
        localStorage.setItem("workoutTime", totalSeconds);
        updateStatTime();
    }
    clearInterval(swTimerId);
    swTimerId = null;
    swRunning = false;
    swElapsed = 0;
    swStartTime = null;
    swLaps = [];
    document.getElementById("swStartBtn").textContent = "▶ Start";
    updateStopwatchDisplay();
    renderLaps();
};

const updateStatTime = () => {
    const totalSeconds = parseInt(localStorage.getItem("workoutTime")) || 0;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    document.getElementById("statTime").textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
};

const renderCatalog = (items = exerciseCatalog) => {
    const grid = document.getElementById("catalogGrid");
    grid.innerHTML = items.map(ex => `
        <article class="catalog-card">
            <div class="catalog-illustration">${ex.svg}</div>
            <div class="catalog-header-row">
                <span class="catalog-title">${ex.name}</span>
                <span class="muscle-tag ${ex.tagClass}">${ex.muscle}</span>
            </div>
            <p class="catalog-desc"><strong>Equipment:</strong> ${ex.equipment}</p>
            <p class="catalog-desc"><strong>Form Tip:</strong> ${ex.tip}</p>
        </article>
    `).join("");
};

const filterCatalogByChip = (muscle, chipBtn) => {
    if (chipBtn) {
        document.querySelectorAll(".chip-btn").forEach(c => c.classList.remove("active"));
        chipBtn.classList.add("active");
    }

    const filtered = (muscle === "ALL")
        ? exerciseCatalog
        : exerciseCatalog.filter(ex => ex.muscle === muscle);
    renderCatalog(filtered);
};

const renderTodayPreview = (routines) => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = days[new Date().getDay()];
    document.getElementById("currentDay").textContent = today;

    const todayRoutines = routines.filter(r => r.day === today);
    const previewBody = document.getElementById("todayRoutineBody");
    if (previewBody) {
        previewBody.innerHTML = todayRoutines.length === 0
            ? `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">Rest day or no routines scheduled for ${today}.</td></tr>`
            : todayRoutines.map((r, i) => `
                <tr>
                    <td>${i + 1}</td>
                    <td>${r.day}</td>
                    <td>${r.split}</td>
                    <td>${r.exercise}</td>
                    <td>${r.sets}</td>
                    <td>${r.reps}</td>
                </tr>
            `).join("");
    }

    const todayLogs = getLogs().filter(l => l.date === new Date().toISOString().split('T')[0]);
    const scheduledSets = todayRoutines.reduce((sum, r) => sum + r.sets, 0) || 5;
    const completedSets = todayLogs.reduce((sum, l) => sum + l.sets, 0);
    const percentage = Math.min(100, Math.round((completedSets / scheduledSets) * 100)) || 60;

    const ring = document.getElementById("todayProgressRing");
    const percentText = document.getElementById("todayProgressPercent");
    const bar = document.getElementById("todayProgressBar");
    const subText = document.getElementById("todayProgressSub");

    if (percentText) percentText.textContent = `${percentage}%`;
    if (bar) bar.style.width = `${percentage}%`;
    if (subText) subText.textContent = `${completedSets} of ${scheduledSets} planned sets logged`;

    if (ring) {
        const ringCircumference = 163.36;
        const ringOffset = ringCircumference * (1 - (percentage / 100));
        ring.style.strokeDashoffset = ringOffset;
    }
};

const toggleTheme = () => {
    const isLight = document.body.classList.toggle("light-mode");
    localStorage.setItem("theme", isLight ? "light" : "dark");
};

const exportJSON = () => {
    const data = {
        routines: getRoutines(),
        logs: getLogs(),
        workoutTime: localStorage.getItem("workoutTime") || 0,
        exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "gym_data.json";
    a.click();
};

window.onload = () => {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

    const logDateInput = document.getElementById("logDate");
    if (logDateInput) {
        logDateInput.value = new Date().toISOString().split('T')[0];
    }

    renderRoutines();
    renderLogs();
    renderCatalog();
    updateRestTimerUI();
    updateStatTime();
    updateStopwatchDisplay();
    renderLaps();
};
