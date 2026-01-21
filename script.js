document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transportForm');
    const historyList = document.getElementById('historyList');
    const checkInBtn = document.getElementById('checkInBtn');
    const checkOutBtn = document.getElementById('checkOutBtn');
    const checkInStatus = document.getElementById('checkInStatus');
    const checkOutStatus = document.getElementById('checkOutStatus');

    // Load history from local storage
    let history = JSON.parse(localStorage.getItem('transportHistory')) || [];

    // Display history
    function displayHistory() {
        historyList.innerHTML = '<div class="list-group-item"><h5>Route: New York to Boston</h5><p>Date: 2023-10-01 | Driver: John Doe | Vehicle: Truck ABC-123 | Check-in: 08:00 | Check-out: 18:00</p></div>';
        history.forEach(item => {
            const li = document.createElement('div');
            li.className = 'list-group-item';
            li.innerHTML = `<h5>Route: ${item.route}</h5><p>Date: ${item.date} | Driver: ${item.driver} | Vehicle: ${item.vehicle} | Check-in: ${item.checkIn || 'N/A'} | Check-out: ${item.checkOut || 'N/A'}</p>`;
            historyList.appendChild(li);
        });
    }
    displayHistory();

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newTransport = {
            route: document.getElementById('route').value,
            date: document.getElementById('date').value,
            driver: document.getElementById('driver').value,
            vehicle: document.getElementById('vehicle').value,
            checkIn: null,
            checkOut: null
        };
        history.push(newTransport);
        localStorage.setItem('transportHistory', JSON.stringify(history));
        displayHistory();
        form.reset();
    });

    // Check-in
    checkInBtn.addEventListener('click', () => {
        const time = new Date().toLocaleTimeString();
        checkInStatus.textContent = `Status: Checked in at ${time}`;
        if (history.length > 0) {
            history[history.length - 1].checkIn = time;
            localStorage.setItem('transportHistory', JSON.stringify(history));
            displayHistory();
        }
    });

    // Check-out
    checkOutBtn.addEventListener('click', () => {
        const time = new Date().toLocaleTimeString();
        checkOutStatus.textContent = `Status: Checked out at ${time}`;
        if (history.length > 0) {
            history[history.length - 1].checkOut = time;
            localStorage.setItem('transportHistory', JSON.stringify(history));
            displayHistory();
        }
    });
});