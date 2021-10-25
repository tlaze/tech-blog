const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();
    console.log(username, password);
    if(username && password) {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replaces('/');
        }
        else{
            alert('Failed To Log In');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('username').value.trim();
    const password = document.querySelector('#password').value.trim();
    
    if (username && password) {
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
            document.location.replace('/');
        } 
        else {
            alert('Failed to sign up.');
        }
    }
};

document.querySelector('#submit').addEventListener('submit', loginFormHandler);

document.querySelector('#signupLink').addEventListener('click', signupFormHandler);