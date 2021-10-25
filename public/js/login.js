async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#user-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
      const response = await fetch("/api/users/login", {
        method: "post",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replaces("/dashboard");
      } else {
        alert("Failed To Log In");
      }
    }
  };
  document.querySelector(".login-form").addEventListener("submit", loginFormHandler);

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


// document.querySelector('#signupLink').addEventListener('click', signupFormHandler);
