const  postId = document.querySelector('input[name="comment-id"]').value;

const newCommentHandler = async (event) => {
    
    event.preventDefault();
    alert("button clicked");
    const description = document.querySelector('#comment-body').value.trim();
 
     if(description){
         try{
             alert("Before Fetch Content: " + description);
             const response = await fetch(`/comments/${postId}`,{
                 method: 'POST',
                 body: JSON.stringify({ 
                     postId,
                     description
                 }),
                 headers: { 'Content-Type': 'application/json' },
             });
             if(response.ok){
                 document.location.reload();
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
 document.querySelector("#comment-btn").addEventListener("click", newCommentHandler);