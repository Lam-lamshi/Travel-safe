
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



