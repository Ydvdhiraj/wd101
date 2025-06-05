document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const tableBody = document.getElementById('tableBody');

  function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function saveToLocalStorage(entry) {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
  }

  function loadFromLocalStorage() {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(addEntryToTable);
  }

  function addEntryToTable(entry) {
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = sanitizeInput(entry.name);
    newRow.insertCell(1).textContent = sanitizeInput(entry.email);
    newRow.insertCell(2).textContent = sanitizeInput(entry.dob);
    newRow.insertCell(3).textContent = entry.terms ? 'Yes' : 'No';
  }

  loadFromLocalStorage();

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;

    if (!name || name.length > 100) {
      alert('Name is required and must be under 100 characters.');
      return;
    }
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    const dobDate = new Date(dob);
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 55, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

    if (isNaN(dobDate) || dobDate < minDate || dobDate > maxDate) {
      alert('Date of Birth must correspond to an age between 18 and 55 years.');
      return;
    }

    const entry = { name, email, dob, terms };
    saveToLocalStorage(entry);
    addEntryToTable(entry);

    form.reset();
  });
});
