// Navigation
function navigateTo(interfaceId) {
    document.querySelectorAll('div[id^="interface-"]').forEach(div => {
        div.classList.add('hidden');
    });
    document.querySelectorAll('div[id^="interface-"]').forEach(div => {
        div.classList.add('hidden');
    });
    document.getElementById(interfaceId).classList.remove('hidden');

    // Special cases for features that need initialization
    if (interfaceId === 'interface-3') {
        startRealTimeUpdates(); // Start health data updates
    } else {
        stopRealTimeUpdates(); // Stop health data updates when navigating away
    }
    if (interfaceId === 'interface-4') {
        fetchHospitals(); // Load hospitals on demand
    }
    if (interfaceId === 'interface-7') {
        loadMedications(); // Load medications
    }
    if (interfaceId === 'interface-8') {
        startChat(); // Initialize the chat
    }
}

// Emergency Call
function makeEmergencyCall() {
    window.location.href = 'tel:911';
}

// Real-time Health Data Simulation
let realTimeInterval;

function startRealTimeUpdates() {
    updateHealthData(); // Initial update
    realTimeInterval = setInterval(updateHealthData, 3000); // Update every 3 seconds
}

function stopRealTimeUpdates() {
    clearInterval(realTimeInterval);
}

function updateHealthData() {
    // Simulate data changes
    const heartRate = Math.floor(Math.random() * (80 - 60 + 1)) + 60;
    const pulseRate = Math.floor(Math.random() * (85 - 65 + 1)) + 65;
    const hydrationLevel = Math.floor(Math.random() * (70 - 50 + 1)) + 50;
    const bloodPressureSystolic = Math.floor(Math.random() * (130 - 110 + 1)) + 110;
    const bloodPressureDiastolic = Math.floor(Math.random() * (90 - 70 + 1)) + 70;
    const stepsWalked = Math.floor(Math.random() * (2500 - 1500 + 1)) + 1500;
    const temperature = (Math.random() * (37.5 - 36.5) + 36.5).toFixed(1);
    // Update the HTML elements
    document.getElementById('heart-rate').textContent = `${heartRate} bpm`;
    document.getElementById('pulse-rate').textContent = `${pulseRate} bpm`;
    document.getElementById('hydration-level').textContent = `${hydrationLevel}%`;
    document.getElementById('blood-pressure').textContent = `${bloodPressureSystolic}/${bloodPressureDiastolic} mmHg`;
    document.getElementById('steps-walked').textContent = `${stepsWalked}`;
    document.getElementById('temperature').textContent = `${temperature}°C`;

    // BLE Data Integration (Conceptual)
    const bleData = receiveBLEData();
    if (bleData) {
        // Update health data from BLE data (if available)
    }
}

// Simulated BLE Data Reception
function receiveBLEData() {
    // Replace with actual BLE code
    return null;
}
// Hospitals Near Me
function fetchHospitals() {
    const hospitalsList = document.getElementById('hospitals-list');
    hospitalsList.innerHTML = "<p>Loading hospitals near you...</p>";

    // Simulated data
    setTimeout(() => {
        hospitalsList.innerHTML = `
            <ul>
                <li>City Hospital - (123) 456-7890</li>
                <li>Green Valley Clinic - (987) 654-3210</li>
                <li>Sunrise Medical Center - (555) 123-4567</li>
            </ul>
        `;
    }, 1500);
}
//Diet Plan
function showDietPlan(planType) {
    const dietPlanContent = document.getElementById('diet-plan-content');
    let planDetails = '';

    switch (planType) {
        case 'diabetes':
            planDetails = `
                <h3>Diabetes Diet Plan</h3>
                <p>Focus on whole grains, lean proteins, and non-starchy vegetables. Limit sugary drinks and processed foods.</p>
                <ul>
                    <li>Breakfast: Oatmeal with berries and nuts</li>
                    <li>Lunch: Grilled chicken salad</li>
                    <li>Dinner: Baked salmon with steamed broccoli</li>
                </ul>
            `;
            break;
        case 'heart':
            planDetails = `
                <h3>Heart Health Diet Plan</h3>
                <p>Emphasize fruits, vegetables, whole grains, and lean proteins. Reduce saturated and trans fats and sodium.</p>
                <ul>
                    <li>Breakfast: Smoothie with spinach, banana, and almond milk</li>
                    <li>Lunch: Lentil soup with whole grain bread</li>
                    <li>Dinner: Turkey breast with roasted vegetables</li>
                </ul>
            `;
            break;
        case 'weightLoss':
            planDetails = `
                <h3>Weight Loss Diet Plan</h3>
                <p>Control portion sizes, increase fiber intake, and stay hydrated. Avoid processed foods and sugary snacks.</p>
                <ul>
                    <li>Breakfast: Greek yogurt with fruit</li>
                    <li>Lunch: Salad with grilled shrimp</li>
                    <li>Dinner: Chicken stir-fry with brown rice</li>
                </ul>
            `;
            break;
        default:
            planDetails = '<p>Select a diet plan to view details.</p>';
    }

    dietPlanContent.innerHTML = planDetails;
}
// Medication Reminders
function loadMedications() {
    const medicationList = document.getElementById('medication-list');
    medicationList.innerHTML = '<p>Loading medications...</p>';

    // Simulated data
    setTimeout(() => {
        medicationList.innerHTML = `
            <ul>
                <li>Medication A - 8:00 AM</li>
                <li>Medication B - 12:00 PM</li>
                <li>Medication C - 8:00 PM</li>
            </ul>
        `;
    }, 1500);
}

function addMedication() {
    const medicationName = prompt("Enter medication name:");
    if (medicationName) {
        const medicationTime = prompt("Enter time (e.g., 8:00 AM):");
        if (medicationTime) {
            const medicationList = document.getElementById('medication-list');
              if (!medicationList.querySelector('ul')) {
                const ul = document.createElement('ul');
                medicationList.appendChild(ul);
            }
            const newMedication = `<li>${medicationName} - ${medicationTime}</li>`;
            medicationList.querySelector('ul').innerHTML += newMedication;
        }
    }
}
//Real Time Communication
function startChat() {
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');

    // Simulated chat messages (replace with real chat implementation)
    function addMessage(sender, message) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
    }

    // Send message function
    window.sendMessage = function() { // Make sendMessage global
        const messageText = messageInput.value;
        if (messageText) {
            addMessage('You', messageText);
            messageInput.value = '';

            // Simulate a reply from a healthcare provider
            setTimeout(() => {
                addMessage('Doctor/Nurse', 'Thank you for your message. We will get back to you shortly.');
            }, 1500);
        }
    };
}

// Cognitive Games
function startMemoryGame() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Memory Game</h2><p>Coming Soon...</p>';
}

function startNumberPuzzle() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = '<h2>Number Puzzle</h2><p>Coming Soon...</p>';
}