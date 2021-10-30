
const newCommentHandler = async (event) => {
    
    event.preventDefault();
    alert("button clicked");
    const description = document.querySelector('#comment-body').value.trim();
    const postId = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];
 
     if(description){
         alert(postId);
         try{
             const response = await fetch(`/api/comments/${postId}`,{
                 method: 'POST',
                 body: JSON.stringify({ 
                     description,
                     postId,
                 }),
                 headers: { 'Content-Type': 'application/json' },
             });
             alert("after fetch", response);
             if(response.ok){
                 alert("fetch ok");
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