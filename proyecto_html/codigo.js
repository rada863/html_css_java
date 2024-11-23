document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            const user = users.find(user => user.email === email);
            if (user && user.address.geo.lat === password) {
                document.getElementById('login-container').classList.add('hidden');
                document.getElementById('main-container').classList.remove('hidden');
            } else {
                document.getElementById('login-error').textContent = 'Email o contraseña incorrectos';
            }
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('name-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;

    Promise.all([
        fetch(`https://api.genderize.io/?name=${name}`).then(genero => genero.json()),
        fetch(`https://api.nationalize.io/?name=${name}`).then(nacionalidad => nacionalidad.json())
    ]).then(results => {
        const genderData = results[0];
        const nationalityData = results[1];

        document.getElementById('gender-result').textContent = `Género: ${genderData.gender}`;
        document.getElementById('nationality-result').textContent = `Nacionalidad: ${nationalityData.country.map(c => `${c.country_id} (${(c.probability * 100).toFixed(2)}%)`).join(', ')}`;
    }).catch(error => console.error('Error:', error));
});
