const tocLinks = Array.from(document.querySelectorAll(".toc a"));
const slides = Array.from(document.querySelectorAll(".slide"));
const toast = document.querySelector("#toast");

const observer = new IntersectionObserver(
  entries => {
    const active = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    tocLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${active.target.id}`);
    });
  },
  { rootMargin: "-18% 0px -62% 0px", threshold: [0.15, 0.35, 0.6] }
);

slides.forEach(slide => observer.observe(slide));

document.querySelector("#printPage").addEventListener("click", () => window.print());

document.querySelector("#expandAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(item => {
    item.open = true;
  });
});

document.querySelector("#collapseAll").addEventListener("click", () => {
  document.querySelectorAll("details").forEach(item => {
    item.open = false;
  });
});

document.querySelectorAll(".copy").forEach(button => {
  button.addEventListener("click", async () => {
    const text = button.dataset.copy || "";
    try {
      await navigator.clipboard.writeText(text);
      showToast("已複製提示語（Prompt）");
    } catch {
      showToast("複製失敗，請手動選取");
    }
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 1600);
}
