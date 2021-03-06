// Changes the value of a given item in the post table when selected
const postId = document.querySelector('input[name="selected-post-id"]').value;

const updatePostHandler = async (event) => {
    
    event.preventDefault();
 
    const title = document.querySelector('input[name="selected-post-title"]').value;
    const description = document.querySelector('textarea[name="selected-post-description"]').value;

     if(title && description){
         try{
             const response = await fetch(`/api/posts/dashboard/${postId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    description
                }),
                 headers: { 'Content-Type': 'application/json' },
             });
             if(response.ok){
                 document.location.replace('/dashboard');
             }
             else{
                 alert(response.statusText);
             }    
         }
         catch(err){
             console.error(err);
             res.status(500).json(err);
         }
     }
 };

// Deletes given value from post table
 const deletePostHandler = async (event) => {
    event.preventDefault();

    try{
        const response = await fetch(`/api/posts/dashboard/${postId}`, {
            method: 'DELETE'
        });
        if(response.ok){
            document.location.replace('/dashboard');
        }
        else{
            alert(response.statusText);
        }    
    }
    catch(err){
        console.error(err);
        res.status(500).json(err);
    }
};

 document.querySelector("#selected-post-form").addEventListener("submit", updatePostHandler);
 document.querySelector("#delete-post-btn").addEventListener("click", deletePostHandler);