const loginFormHandler = async () => {
    
    const username = document.querySelector('#inputUsername').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    if(username && password) {
        const response = await fetch('/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replaces('/dashboard');
        }
        else{
            alert('Failed To Log In');
        }
    }
};

// const signupFormHandler = async (event) => {
//     event.preventDefault();

//     const username = document.querySelector('#username').value.trim();
//     const password = document.querySelector('#password').value.trim();
    
//     if (username && password) {
//         const response = await fetch('/api/users', {
//           method: 'POST',
//           body: JSON.stringify({ username, password }),
//           headers: { 'Content-Type': 'application/json' },
//         });
    
//         if (response.ok) {
//             document.location.replace('/dashboard');
//             console.log("New Account Created");
//         } 
//         else {
//             alert('Failed to sign up.');
//         }
//     }
// };

document.querySelector('#submitBtn').addEventListener('click', loginFormHandler);

document.querySelector('#signupLink').addEventListener('click', signupFormHandler);