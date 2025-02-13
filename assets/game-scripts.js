function toggleDetails(id) {
    let details = document.getElementById("details-" + id);
    let arrow = details.previousElementSibling.querySelector(".arrow");

    if (details.style.display === "block") {
        details.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
    } else {
        details.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
    }
}
