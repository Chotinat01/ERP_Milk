const UNIT_PRICE = 12;

function getDiscountRate(qty) {
  // ทำตามเงื่อนไขที่ผู้ใช้ให้มาเป๊ะ (เลือกขั้นสูงสุด)
  if (qty >= 500) return 15;
  if (qty >= 250) return 10;  // ตามที่ระบุ: ≥250 ลด 5%
  if (qty >= 100) return 5;
  return 0;
}

function money(n) {
  return Math.round(n).toString();
}

function readProductFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const product = (params.get("product") || "plain").toLowerCase();

  const map = {
    plain: { name: "Milkty นมจืด", img: "../img/milk.png" },
    strawberry: { name: "Milkty นมสตอเบอรี่", img: "../img/milk_straw.png" },
    chocolate: { name: "Milkty นมช็อกโกแลต", img: "../img/milk_choc.png" }
  };

  const p = map[product] || map.plain;
  document.getElementById("productName").textContent = p.name;
  document.getElementById("productImg").src = p.img;
}

function calculate() {
  const qty = parseInt(document.getElementById("qty").value, 10) || 0;

  const subtotal = qty * UNIT_PRICE;
  const rate = getDiscountRate(qty);
  const discountAmount = subtotal * (rate / 100);
  const total = subtotal - discountAmount;

  document.getElementById("subtotal").textContent = money(subtotal);
  document.getElementById("discountRate").textContent = rate;
  document.getElementById("discountAmount").textContent = money(discountAmount);
  document.getElementById("total").textContent = money(total);

  const note = document.getElementById("promoNote");
  if (rate > 0) {
    note.textContent = `เข้าเงื่อนไขโปรโมชั่น ลด ${rate}% แล้ว ✅`;
  } else {
    note.textContent = "ยังไม่เข้าเงื่อนไขโปรโมชั่น";
  }

  return { qty, subtotal, rate, discountAmount, total };
}

document.addEventListener("DOMContentLoaded", () => {
  readProductFromQuery();
  calculate();

  document.getElementById("btnCalc").addEventListener("click", calculate);

  // คำนวณสดเวลาเปลี่ยนจำนวน
  document.getElementById("qty").addEventListener("input", calculate);

  // Submit
  document.getElementById("orderForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !address) {
      alert("กรุณากรอกชื่อลูกค้าและที่อยู่ให้ครบ");
      return;
    }

    const result = calculate();
    if (result.qty < 1) {
      alert("กรุณากรอกจำนวนกล่องอย่างน้อย 1 กล่อง");
      return;
    }

    alert(
      "ยืนยันสั่งซื้อสำเร็จ ✅\n\n" +
      `ชื่อลูกค้า: ${name}\n` +
      (phone ? `เบอร์โทร: ${phone}\n` : "") +
      `จำนวน: ${result.qty} กล่อง\n` +
      `ราคารวม: ${result.subtotal} บาท\n` +
      `ส่วนลด: ${result.rate}% (${money(result.discountAmount)} บาท)\n` +
      `ยอดสุทธิ: ${money(result.total)} บาท\n\n` +
      "หมายเหตุ: ตอนนี้ยังเป็นตัวอย่าง (ยังไม่บันทึกลงฐานข้อมูล)"
    );
  });
});