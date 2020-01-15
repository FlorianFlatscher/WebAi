document.querySelectorAll('.carousel-item svg rect').forEach((e, i) => {
    e.style.fill = [
        '#00E5C5', '#00C4BE', '#00A4AF'
    ][i];
});