const updatePostHandler = async (event) => {
    
    event.preventDefault();
 
    const title = document.querySelector('#selected-post-title').value.trim();
    const description = document.querySelector('#selected-post-description').value.trim();
 
     if(title && description){
         try{
             const response = await fetch('/api/posts/dashboard/new',{
                 method: 'POST',
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
 document.querySelector("#update-post-btn").addEventListener("click", updatePostHandler);