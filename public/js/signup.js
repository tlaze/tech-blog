// Creates a new entry in the user table when a user signs up
const signupFormHandler = async (event) => {
    
    event.preventDefault();
    const username = document.querySelector('#user-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify(
                { 
                    username,
                    password,
                }
            ),
            headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            console.log("New Account Created");
            document.location.replace('/dashboard');

        }
        else {
            alert('Failed to Create Account. Password must be more than 6 characters. If so, username is already in database');
        }
    }
};
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);