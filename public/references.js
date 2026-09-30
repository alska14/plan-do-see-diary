document.querySelectorAll('.sw').forEach((el) => { const c = el.dataset.color; if (c) el.style.background = c; else el.classList.add('none'); });
