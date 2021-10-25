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
            alert(response.statusText);
        }
    }
};
