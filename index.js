// index.js
async function loadPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    console.log("DBUG: Data received:", posts[0]);

    // Take the first post only (matches test expectations)
    const firstPost = posts[0];

    const resultDiv = document.getElementById("post-list");
    resultDiv.innerHTML = "";

    const h1 = document.querySelector("h1");
    h1.textContent = firstPost.title;

    const p = document.createElement("p");
    p.textContent = firstPost.body;

    resultDiv.appendChild(h1);
    resultDiv.appendChild(p);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

loadPosts();