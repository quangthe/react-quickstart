(function () {

  if (!sessionStorage.length) {
    // Ask other tabs for session storage
    localStorage.setItem("getSessionStorage", "" + Date.now());
    localStorage.removeItem("getSessionStorage");
  }

  window.addEventListener("storage", function (event) {
    // Add !== null checking to help to remove it later.
    if (event.key === "getSessionStorage" && event.newValue !== null) {
      // Some tab asked for the sessionStorage -> send it

      localStorage.setItem("sessionStorage", sessionStorage.getItem("__auth__"));
      localStorage.removeItem("sessionStorage");
      localStorage.removeItem("getSessionStorage");
      // Add !== null checking to help to remove it later.
    } else if (event.key === "sessionStorage" && event.newValue !== null && !sessionStorage.length) {
      // sessionStorage is empty -> fill it
      sessionStorage.setItem("__auth__", event.newValue);
    }
  });
})();
