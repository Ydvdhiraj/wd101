const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('tableBody');

    // Load saved entries from localStorage
    window.onload = function () {
        const entries = JSON.parse(localStorage.getItem('userEntries')) || [];
        entries.forEach(entry => addRowToTable(entry));
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Age validation
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55 years.");
            return;
        }

        // Save entry
        const entry = { name, email, password, dob, terms };
        const existingEntries = JSON.parse(localStorage.getItem('userEntries')) || [];
        existingEntries.push(entry);
        localStorage.setItem('userEntries', JSON.stringify(existingEntries));

        // Add to table
        addRowToTable(entry);

        // Reset form
        form.reset();
    });

    function addRowToTable(entry) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.terms ? 'Yes' : 'No'}</td>
        `;
        tableBody.appendChild(row);
    }
