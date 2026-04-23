// index.js

async function loadPosts() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    // Take the first post only (matches test expectations)
    const firstPost = posts[0];

    const h1 = document.createElement("h1");
    h1.textContent = firstPost.title;

    const p = document.createElement("p");
    p.textContent = firstPost.body;

    document.body.appendChild(h1);
    document.body.appendChild(p);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

loadPosts();