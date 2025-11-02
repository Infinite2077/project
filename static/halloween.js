
// 🕯️ Додаємо плаваючі іскорки
document.addEventListener("DOMContentLoaded", () => {
  for (let i = 0; i < 30; i++) {
    const spark = document.createElement("div");
    spark.classList.add("spark");
    spark.style.left = Math.random() * 100 + "vw";
    spark.style.animationDelay = Math.random() * 10 + "s";
    document.body.appendChild(spark);
  }

  // 🦇 Кажани
  for (let i = 0; i < 5; i++) {
    const bat = document.createElement("div");
    bat.classList.add("bat");

    const delay = Math.random() * 10;
    const duration = 8 + Math.random() * 5;
    const top = Math.random() * 70 + 10;

    bat.style.top = top + "vh";
    bat.style.left = "-50px";
    bat.style.animationDelay = `${delay}s`;
    bat.style.animationDuration = `${duration}s`;

    document.body.appendChild(bat);

    bat.addEventListener("animationiteration", () => {
      bat.style.top = Math.random() * 70 + "vh";
      bat.style.animationDuration = 8 + Math.random() * 5 + "s";
    });
  }
});

bat.classList.add("bat"); 

