const { data } = require("browserslist");

  function filterPosts(query) {
    const posts = document.querySelectorAll('.blog-post');
    posts.forEach(post => {
      const title = post.dataset.title.toLowerCase();
      post.style.display = title.includes(query.toLowerCase()) ? 'block' : 'none';
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-slider]').forEach(slider => {
      const images = slider.querySelectorAll('img');
      let current = 0;

      setInterval(() => {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
      }, 3000);
    });
  });


fetch("https://YOUR-URL.onrender.com/news")
.then(res => res.json())
.then (data =>{
  const blog = document.getElementById("blog-container");
  data.articles.forEach(article =>{
      blog.innerHTML += `
        <div class="blog-card">
          <img src="${article.urlToImage || 'default.jpg'}">
          <h3>${article.title}</h3>
          <p>${article.description || ''}</p>
          <a href="${article.url}" target="_blank">Read more</a>
        </div>
      `;
  });
});
