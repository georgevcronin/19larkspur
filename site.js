// 19 Larkspur Terrace — language toggle + cookie banner.

(function () {
  // Language: ?lang= param wins (used for PDF generation), then saved
  // preference, then English.
  var params = new URLSearchParams(window.location.search);
  var lang = params.get("lang") || localStorage.getItem("larkspur-lang") || "en";
  if (lang !== "en" && lang !== "tr") lang = "en";
  document.body.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang);

  window.setLang = function (l) {
    localStorage.setItem("larkspur-lang", l);
    document.body.setAttribute("data-lang", l);
    document.documentElement.setAttribute("lang", l);
    document.dispatchEvent(new CustomEvent("larkspur-langchange", { detail: l }));
    return false;
  };

  // Cookie banner
  var banner = document.getElementById("cookie-banner");
  if (banner && !localStorage.getItem("larkspur-cookies-acknowledged")) {
    banner.hidden = false;
  }
  window.acceptCookies = function () {
    localStorage.setItem("larkspur-cookies-acknowledged", "yes");
    if (banner) banner.hidden = true;
    return false;
  };
})();
