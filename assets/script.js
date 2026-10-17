(() => {
  const config = window.SITE_CONFIG || {};
  const message = config.telegramMessage || "здравстуйте, хочу записаться";
  const encodedMessage = encodeURIComponent(message);
  const username = (config.telegramUsername || "").replace(/^@/, "").trim();
  const bookingUrl = username
    ? `https://t.me/${encodeURIComponent(username)}?text=${encodedMessage}`
    : `https://t.me/share/url?text=${encodedMessage}`;

  document.querySelectorAll(".book-link").forEach((link) => {
    link.href = bookingUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", username
      ? "Записаться через Telegram"
      : "Открыть Telegram и отправить подготовленное сообщение");
  });

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    }));
  }
})();
