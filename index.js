    const form = document.getElementById('registrationForm');
    const tableBody = document.getElementById('tableBody');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        // Calculate age
        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const m = today.getMonth() - dobDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        // Validate age between 18 and 55
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55 years.");
            return;
        }

        // Create new table row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dob}</td>
            <td>${terms ? 'Yes' : 'No'}</td>
        `;

        tableBody.appendChild(row);
        form.reset();
    });
