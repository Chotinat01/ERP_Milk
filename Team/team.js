const teamData = [
  { role: "พนักงานควบคุมเครื่องจักร", people: 8, salary: 15000 },
  { role: "ฝ่ายตรวจคุณภาพ (QC)", people: 4, salary: 17000 },
  { role: "คลังสินค้า / แพ็กสินค้า", people: 4, salary: 13000 },
  { role: "พนักงานด้านการตลาด / การขาย", people: 4, salary: 21000 },
  { role: "พนักงานบัญชี / การเงิน", people: 2, salary: 26000 },
  { role: "HR / ธุรการ", people: 1, salary: 23000 },
  { role: "ผู้จัดการโรงงาน", people: 2, salary: 38000 },
  { role: "ยาม / ผู้รักษาความปลอดภัย", people: 2, salary: 11000 },
  { role: "CEO", people: 1, salary: 65000 },
];

function formatTHB(n) {
  return n.toLocaleString("th-TH");
}

function render() {
  const tbody = document.getElementById("teamBody");

  let totalPeople = 0;
  let totalCost = 0;

  tbody.innerHTML = teamData.map(item => {
    const rowTotal = item.people * item.salary;

    totalPeople += item.people;
    totalCost += rowTotal;

    // ✅ มี 4 ช่องตรงตามหัวตารางเสมอ
    return `
      <tr>
        <td>${item.role}</td>
        <td class="num">${formatTHB(item.people)}</td>
        <td class="num">${formatTHB(item.salary)}</td>
        <td class="num">${formatTHB(rowTotal)}</td>
      </tr>
    `;
  }).join("");

  document.getElementById("totalPeople").textContent = formatTHB(totalPeople);
  document.getElementById("totalCost").textContent = formatTHB(totalCost);

  document.getElementById("tfootPeople").textContent = formatTHB(totalPeople);
  document.getElementById("tfootCost").textContent = formatTHB(totalCost);
}

document.addEventListener("DOMContentLoaded", render);