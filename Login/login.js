document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim().toLowerCase();
  const password = document.getElementById("password").value.trim();

  // ✅ ถ้า username เป็น admin (ไม่สนตัวพิมพ์ใหญ่เล็ก) และรหัส 123456
  if (username === "admin" && password === "123456") {
    window.location.href = "../Home/home.html"; // ไปหน้า home.html
  } else {
    alert("Username หรือ Password ไม่ถูกต้อง!");
  }
}); 