function generateSpaceBackground() {
    const createStars = (count, elementId) => {
        const element = document.getElementById(elementId);
        let shadowString = '';
        for (let i = 0; i < count; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.8 + 0.2;
            const color = Math.random() > 0.8 ? '#aabfff' : '#ffffff'; 
            const size = Math.random() > 0.9 ? 2 : 1; 
            shadowString += `${x}vw ${y}vh ${size}px ${size-1}px ${color}, `;
        }
        shadowString = shadowString.slice(0, -2);
        element.style.boxShadow = shadowString;
    };
    createStars(150, 'stars1'); 
    createStars(80, 'stars2');
}

generateSpaceBackground();

const CONFIG = {
    startDate: new Date('2026-01-05T21:02:00-05:00').getTime(),
    targetDate: new Date('2026-04-12T12:00:00-05:00').getTime()
};

const root = document.documentElement;
const percentageDisplay = document.querySelector('.progress-percentage');

function updateHourglass() {
    const now = Date.now();
    const totalDuration = CONFIG.targetDate - CONFIG.startDate;
    const timeElapsed = now - CONFIG.startDate;
    let percentageElapsed = timeElapsed / totalDuration;

    let isFlowing = true;
    let topOpacity = 1;

    if (now < CONFIG.startDate) {
        percentageElapsed = 0;
        isFlowing = false;
    } else if (now >= CONFIG.targetDate) {
        percentageElapsed = 1;
        isFlowing = false;
        topOpacity = 0; 
    }

    if (isFlowing) {
        root.style.setProperty('--flow-opacity', '1');
        root.style.setProperty('--flow-visibility', 'visible');
        root.style.setProperty('--animation-state', 'running');
    } else {
        root.style.setProperty('--flow-opacity', '0');
        root.style.setProperty('--flow-visibility', 'hidden');
        root.style.setProperty('--animation-state', 'paused');
    }
    
    root.style.setProperty('--sand-top-opacity', topOpacity);

    const rawPercentage = percentageElapsed * 100;
    const formattedPercentage = parseFloat(rawPercentage.toFixed(3));
    percentageDisplay.textContent = formattedPercentage + '%';
        
    const MAX_FILL_PERCENTAGE = 95; 

    const bottomHeight = percentageElapsed * MAX_FILL_PERCENTAGE;
    const topHeight = (1 - percentageElapsed) * MAX_FILL_PERCENTAGE;

    root.style.setProperty('--sand-bottom-height', `${bottomHeight}%`);
    root.style.setProperty('--sand-top-height', `${topHeight}%`);

    requestAnimationFrame(updateHourglass);
}

requestAnimationFrame(updateHourglass);
updateHourglass();