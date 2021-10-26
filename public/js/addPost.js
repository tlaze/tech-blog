const newPostHandler = async (event) => {
   
  event.preventDefault();

  buttonClicked = true;
  }
document.querySelector("#add-post-button").addEventListener("click", newPostHandler);