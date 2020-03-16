export default (elements, callback, options = {}) => {
  const { unobserve } = options;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        callback();
        if (unobserve) {
          observer.unobserver();
        }
      }
    });
  }, options);

  // Passing the elements to observe
  elements = elements || [];

  elements.forEach(element => observer.observe(element));
};
