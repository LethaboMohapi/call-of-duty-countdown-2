// Set target date and calculate total duration
const targetDate = new Date('November 14, 2025 00:00:00').getTime();
const startDate = new Date('September 20, 2025 00:00:00').getTime();
const totalDuration = targetDate - startDate;

// Store previous values for animation
let previousValues = { days: null, hours: null, minutes: null, seconds: null };

/**
 * Main countdown update function
 */
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Check if countdown has ended
    if (distance < 0) {
        displayEndState();
        celebrate();
        return;
    }

    // Calculate time units
    const timeUnits = calculateTimeUnits(distance);
    
    // Update display
    updateDisplay(timeUnits);
    updateProgressBar(distance);
    updateMessage(timeUnits);
}

/**
 * Calculate days, hours, minutes, and seconds from distance
 * @param {number} distance - Time remaining in milliseconds
 * @returns {Object} Object containing time units
 */
function calculateTimeUnits(distance) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
}

/**
 * Update the countdown display
 * @param {Object} timeUnits - Object containing time units
 */
function updateDisplay(timeUnits) {
    const { days, hours, minutes, seconds } = timeUnits;
    
    // Format with leading zeros
    const formattedDays = days.toString().padStart(2, '0');
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    // Update display with animation
    animateChange('days', formattedDays);
    animateChange('hours', formattedHours);
    animateChange('minutes', formattedMinutes);
    animateChange('seconds', formattedSeconds);
}

/**
 * Update progress bar
 * @param {number} distance - Time remaining in milliseconds
 */
function updateProgressBar(distance) {
    const elapsed = totalDuration - distance;
    const progress = (elapsed / totalDuration) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

/**
 * Update message based on remaining time
 * @param {Object} timeUnits - Object containing time units
 */
function updateMessage(timeUnits) {
    const { days, hours, minutes } = timeUnits;
    const messageElement = document.getElementById('message');

    if (days === 0 && hours === 0 && minutes < 10) {
        messageElement.textContent = 'Almost there! Just minutes to go! ⏰';
    } else if (days === 0 && hours < 2) {
        messageElement.textContent = 'Final hours approaching! 🚀';
    } else if (days === 0) {
        messageElement.textContent = 'Less than a day remaining! 🎯';
    } else if (days === 1) {
        messageElement.textContent = 'Just one more day to go! 📅';
    } else if (days <= 7) {
        messageElement.textContent = 'Final week countdown! 📆';
    } else {
        messageElement.textContent = 'Time remaining until the big day! ✨';
    }
}

/**
 * Display end state when countdown finishes
 */
function displayEndState() {
    document.getElementById('days').textContent = '00';
    document.getElementById('hours').textContent = '00';
    document.getElementById('minutes').textContent = '00';
    document.getElementById('seconds').textContent = '00';
    document.getElementById('message').textContent = 'The countdown has ended! 🎉';
    document.getElementById('progressFill').style.width = '100%';
}

/**
 * Animate number changes
 * @param {string} elementId - ID of the element to animate
 * @param {string} newValue - New value to display
 */
function animateChange(elementId, newValue) {
    const element = document.getElementById(elementId);
    
    // Check if value has changed
    if (previousValues[elementId] !== null && previousValues[elementId] !== newValue) {
        element.style.transform = 'scale(1.1)';
        element.style.color = '#feca57';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = 'white';
        }, 200);
    }
    
    // Update display and store previous value
    element.textContent = newValue;
    previousValues[elementId] = newValue;
}

/**
 * Create celebration fireworks animation
 */
function celebrate() {
    const fireworksContainer = document.getElementById('fireworks');
    const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFirework(fireworksContainer, colors);
        }, i * 100);
    }
}

/**
 * Create individual firework element
 * @param {HTMLElement} container - Fireworks container element
 * @param {Array} colors - Array of colors for fireworks
 */
function createFirework(container, colors) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.background = colors[Math.floor(Math.random() * colors.length)];
    firework.style.left = Math.random() * 100 + 'px';
    firework.style.top = Math.random() * 100 + 'px';
    
    container.appendChild(firework);
    
    // Remove firework after animation
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

/**
 * Add click interaction to time units
 */
function setupInteractions() {
    document.querySelectorAll('.time-unit').forEach(unit => {
        unit.addEventListener('click', () => {
            // Reset and restart animation
            unit.style.animation = 'none';
            setTimeout(() => {
                unit.style.animation = 'pulse 2s ease-in-out infinite';
            }, 100);
        });
    });
}

/**
 * Initialize the countdown
 */
function init() {
    // Initial countdown update
    updateCountdown();
    
    // Set up interactions
    setupInteractions();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
}

// Start the countdown when the page loads
document.addEventListener('DOMContentLoaded', init);