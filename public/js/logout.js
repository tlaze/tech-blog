const logout = async () => {
    // Makes POST request to destroy the session on the backend
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if(response.ok){
        document.location.replace('/');
    }
    else{
        alert(response.statusText);
    }
};

document.querySelector('#logout').addEventListener('click', logout);