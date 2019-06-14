(function () {

  if (!sessionStorage.length) {
    // Ask other tabs for session storage
    localStorage.setItem("getSessionStorage", "" + Date.now());
    localStorage.removeItem("getSessionStorage");
  }

  window.addEventListener("storage", function (event) {
    if (event.key === "getSessionStorage" && event.newValue !== null) {
      //
      // there's tab asked for the sessionStorage -> send auth state
      //
      if (localStorage.getItem("isLoggedIn") === "true") {
        localStorage.setItem("sessionStorage", sessionStorage.getItem("__auth__"));
      }
      localStorage.removeItem("sessionStorage");
      localStorage.removeItem("getSessionStorage");
    } else if (event.key === "sessionStorage" && event.newValue !== null && !sessionStorage.length) {
      //
      // get auth state from other tabs
      //
      if (localStorage.getItem("isLoggedIn") === "true") {
        sessionStorage.setItem("__auth__", event.newValue);
      }
    }
  });
})();
