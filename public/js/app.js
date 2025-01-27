// app.js
document.addEventListener('DOMContentLoaded', async () => {
    await loadNutrients();
    initEventListeners();
    checkAdminStatus();
});

let nutrients = [];
let isAdmin = false;

// ========================
//     HAUPTFUNKTIONEN
// ========================
async function loadNutrients() {
    try {
        const response = await fetch('/api/nutrients');
        nutrients = await response.json();
        renderNutrients();
        renderAdminPanel();
    } catch (error) {
        console.error('Fehler beim Laden:', error);
        showMessage('Fehler beim Laden der Daten', 'error');
    }
}

async function saveNutrients() {
    try {
        const response = await fetch('/api/nutrients', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nutrients)
        });
        
        if (!response.ok) throw new Error('Speichern fehlgeschlagen');
        showMessage('Änderungen gespeichert!', 'success');
    } catch (error) {
        console.error('Fehler:', error);
        showMessage('Fehler beim Speichern', 'error');
    }
}

// ========================
//      ADMIN-FUNKTIONEN
// ========================
function initEventListeners() {
    // Login
    document.getElementById('adminLoginBtn').addEventListener('click', () => {
        document.getElementById('loginModal').classList.remove('hidden');
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const password = document.getElementById('adminPassword').value;
        // Demo-Passwort: "admin123"
        if (password === 'admin123') {
            isAdmin = true;
            toggleAdminUI(true);
            document.getElementById('loginModal').classList.add('hidden');
        } else {
            showMessage('Falsches Passwort!', 'error');
        }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
        isAdmin = false;
        toggleAdminUI(false);
    });

    // Nährstoff hinzufügen
    document.getElementById('addNutrientForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const newNutrient = {
            name: document.getElementById('nutrientName').value,
            ranges: []
        };
        nutrients.push(newNutrient);
        await saveNutrients();
        renderAdminPanel();
    });

    // User Form Submit
    document.getElementById('userDataForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const age = parseInt(document.getElementById('age').value, 10);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const gender = document.getElementById('gender').value;
        // Neu: Aktivitätslevel, Ziel & Mahlzeiten
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        const goalOffset = parseFloat(document.getElementById('goal').value);
        const meals = parseInt(document.getElementById('meals').value, 10);

        if (isNaN(age) || isNaN(weight) || isNaN(height)) {
            document.getElementById('errorMessage').classList.remove('hidden');
            return;
        } else {
            document.getElementById('errorMessage').classList.add('hidden');
        }

        const result = calculateNutrients({
            age,
            gender,
            weight,
            height,
            activityLevel,
            goalOffset,
            meals
        });
        displayResults(result);
        // Result-Section einblenden
        document.getElementById('resultSection').classList.remove('hidden');
    });
}

function renderAdminPanel() {
    if (!isAdmin) return;

    const adminList = document.getElementById('nutrientList');
    adminList.innerHTML = nutrients.map((nutrient, index) => `
        <div class="nutrient-card" data-index="${index}">
            <h3>
                <input type="text" value="${nutrient.name}" 
                    onchange="updateNutrientName(${index}, this.value)">
            </h3>
            
            ${nutrient.ranges.map((range, rangeIndex) => `
                <div class="age-range">
                    Alter:
                    <input type="number" value="${range.minAge}" 
                        onchange="updateRange(${index}, ${rangeIndex}, 'minAge', this.value)">
                    -
                    <input type="number" value="${range.maxAge}" 
                        onchange="updateRange(${index}, ${rangeIndex}, 'maxAge', this.value)">
                    
                    Menge:
                    <input type="number" step="any" value="${range.amount}"
                        onchange="updateRange(${index}, ${rangeIndex}, 'amount', this.value)">
                    
                    Einheit:
                    <select onchange="updateRange(${index}, ${rangeIndex}, 'unit', this.value)">
                        <option ${range.unit === 'g' ? 'selected' : ''}>g</option>
                        <option ${range.unit === 'mg' ? 'selected' : ''}>mg</option>
                        <option ${range.unit === 'µg' ? 'selected' : ''}>µg</option>
                        <option ${range.unit === 'IU' ? 'selected' : ''}>IU</option>
                    </select>
                    
                    <button onclick="deleteRange(${index}, ${rangeIndex})">×</button>
                </div>
            `).join('')}
            
            <button class="add-range" onclick="addNewRange(${index})">+ Bereich hinzufügen</button>
            <button class="delete-nutrient" onclick="deleteNutrient(${index})">Nährstoff löschen</button>
        </div>
    `).join('');
}

function toggleAdminUI(show) {
    document.getElementById('adminPanel').classList.toggle('hidden', !show);
    document.querySelectorAll('.admin-only').forEach(el => {
        el.classList.toggle('hidden', !show);
    });
}

// ========================
//     MELDUNGEN/HELPER
// ========================
function showMessage(text, type) {
    let msg = document.getElementById('message');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'message';
        document.body.appendChild(msg);
    }
    msg.textContent = text;
    msg.className = `message ${type}`;
    setTimeout(() => msg.className = 'message hidden', 3000);
}

function checkAdminStatus() {
    // Falls du Session-Handling einbauen möchtest
    // Hier nur ein Platzhalter
}

// ========================
//      GLOBALE FUNKTIONEN
// ========================
window.updateNutrientName = async (index, newName) => {
    nutrients[index].name = newName;
    await saveNutrients();
};

window.updateRange = async (nutrientIndex, rangeIndex, property, value) => {
    // minAge oder maxAge müssen Zahlen sein
    if (property === 'minAge' || property === 'maxAge') {
        nutrients[nutrientIndex].ranges[rangeIndex][property] = parseInt(value, 10);
    } else {
        nutrients[nutrientIndex].ranges[rangeIndex][property] = value;
    }
    await saveNutrients();
};

window.addNewRange = async (nutrientIndex) => {
    nutrients[nutrientIndex].ranges.push({
        minAge: 18,
        maxAge: 99,
        amount: 0,
        unit: 'g'
        // calculation: 'perKg' oder 'fixed' kann bei Bedarf ergänzt werden
    });
    await saveNutrients();
    renderAdminPanel();
};

window.deleteRange = async (nutrientIndex, rangeIndex) => {
    nutrients[nutrientIndex].ranges.splice(rangeIndex, 1);
    await saveNutrients();
    renderAdminPanel();
};

window.deleteNutrient = async (index) => {
    nutrients.splice(index, 1);
    await saveNutrients();
    renderAdminPanel();
};

// ========================
//   BENUTZERBERECHNUNGEN
// ========================
/**
 * Berechnet Kalorien, BMI + Farbe, Makros, Mahlzeitenaufteilung und Nährstoffe.
 */
function calculateNutrients({ age, gender, weight, height, activityLevel, goalOffset, meals }) {
    // ============ BMR =============
    // Mifflin-St. Jeor (Grundumsatz)
    const bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
    // Tagesbedarf = BMR * Aktivitätslevel + Ziel-Anpassung
    let totalCals = (bmr * activityLevel) + goalOffset;

    // ============ BMI-BERECHNUNG =============
    const bmi = weight / ((height / 100) ** 2);
    const { category, color } = getBMICategory(bmi, gender);

    // ============ MAKROVERTEILUNG ============
    // Beispiel: 20% Protein, 50% Kohlenhydrate, 30% Fett
    // Kalorien in g umrechnen: 1g Protein/Carb ~ 4 kcal, 1g Fett ~ 9 kcal
    const proteinCals = totalCals * 0.20;
    const carbsCals   = totalCals * 0.50;
    const fatCals     = totalCals * 0.30;

    const proteinGrams = proteinCals / 4;
    const carbsGrams   = carbsCals / 4;
    const fatGrams     = fatCals / 9;

    // Nährstoff-Objekt
    const results = {
        'Kalorien (gesamt)': Math.round(totalCals) + ' kcal',
        'BMI': {
            value: bmi.toFixed(2) + ' (' + category + ')',
            color: color
        },
        'Protein (gesamt)': proteinGrams.toFixed(1) + ' g',
        'Kohlenhydrate (gesamt)': carbsGrams.toFixed(1) + ' g',
        'Fett (gesamt)': fatGrams.toFixed(1) + ' g'
    };

    // ============ MAHLZEITEN-AUFTEILUNG ============
    // Verteile totalCals, proteinGrams, carbsGrams, fatGrams auf "meals" Mahlzeiten
    const perMealCals    = totalCals / meals;
    const perMealProtein = proteinGrams / meals;
    const perMealCarbs   = carbsGrams / meals;
    const perMealFat     = fatGrams / meals;

    // Kurze Zusammenfassung
    results['Mahlzeitenaufteilung'] = {
        value: `
          Pro Mahlzeit bei ${meals} Mahlzeiten:
          ${Math.round(perMealCals)} kcal,
          ${perMealProtein.toFixed(1)} g Protein,
          ${perMealCarbs.toFixed(1)} g Kohlenhydrate,
          ${perMealFat.toFixed(1)} g Fett
        `,
        color: '#f5f5f5' // neutrales Grau (oder weiß)
    };

    // ============ NÄHRSTOFFE aus JSON ============
    // Altersbereiche: z. B. minAge:16, maxAge:99 => 1500 mg
    nutrients.forEach(nutrient => {
        const range = nutrient.ranges.find(r => age >= r.minAge && age <= r.maxAge);
        if (range) {
            // Wenn "calculation" fixed = fester Wert
            // Wenn "calculation" perKg = range.amount * Gewicht
            // => Hier könntest du Logik ausbauen. Wir nehmen "fixed" an:
            results[nutrient.name] = range.amount + ' ' + range.unit;
        }
    });

    return results;
}

/** 
 * Stellt fest, in welcher BMI-Kategorie sich eine Person befindet, 
 * inkl. Hintergrundfarbe. 
 */
function getBMICategory(bmi, gender) {
    let category = '';

    if (gender === 'male') {
        if (bmi < 20) {
            category = 'Untergewicht';
        } else if (bmi < 25) {
            category = 'Normalgewicht';
        } else if (bmi < 30) {
            category = 'Übergewicht';
        } else if (bmi < 35) {
            category = 'Adipositas Grad I';
        } else if (bmi < 40) {
            category = 'Adipositas Grad II';
        } else {
            category = 'Adipositas Grad III';
        }
    } else {
        // female
        if (bmi < 19) {
            category = 'Untergewicht';
        } else if (bmi < 24) {
            category = 'Normalgewicht';
        } else if (bmi < 30) {
            category = 'Übergewicht';
        } else if (bmi < 35) {
            category = 'Adipositas Grad I';
        } else if (bmi < 40) {
            category = 'Adipositas Grad II';
        } else {
            category = 'Adipositas Grad III';
        }
    }

    // Farbcode: Grün = Normalgewicht, Rot = Rest
    let color = (category === 'Normalgewicht') ? '#C2FBCB' : '#FBCBCB';

    return { category, color };
}

/**
 * Zeigt alle Resultate im "resultGrid" an.
 * BMI und Mahlzeiten sind Objekte mit {value, color}.
 */
function displayResults(results) {
    const resultGrid = document.getElementById('nutrientResults');
    resultGrid.innerHTML = '';

    for (const [name, data] of Object.entries(results)) {
        if (typeof data === 'object' && data !== null && data.value !== undefined) {
            // Objekt mit "value" und ggf. "color"
            const bg = data.color || '#f8f9fa';
            resultGrid.innerHTML += `
                <div class="nutrient-card" style="background-color: ${bg}">
                    <h3>${name}</h3>
                    <p>${data.value}</p>
                </div>
            `;
        } else {
            // Normaler String
            resultGrid.innerHTML += `
                <div class="nutrient-card">
                    <h3>${name}</h3>
                    <p>${data}</p>
                </div>
            `;
        }
    }
}

function renderNutrients() {
    console.log('Rendere Nährstoffe...');
    const list = document.getElementById('nutrientList');
    
    if (!list) {
        console.error('nutrientList Element nicht gefunden!');
        return;
    }

    list.innerHTML = nutrients.map(nutrient => `
        <div class="nutrient">
            <h3>${nutrient.name}</h3>
            <ul>
                ${nutrient.ranges.map(range => `
                    <li>
                        Alter ${range.minAge}-${range.maxAge}: 
                        ${range.amount}${range.unit}
                    </li>
                `).join('')}
            </ul>
        </div>
    `).join('');
    
    console.log('Rendering abgeschlossen');
}
