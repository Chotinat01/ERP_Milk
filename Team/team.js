let teamData = [
  { role: "หัวหน้าแผนกการผลิต", people: 1, salary: 20000 },
  { role: "พนักงานควบคุมเครื่องจักร", people: 6, salary: 14000 },
  { role: "หัวหน้าฝ่ายตรวจคุณภาพ", people: 1, salary: 21000 },
  { role: "ฝ่ายตรวจคุณภาพ (QC)", people: 4, salary: 15000 },
  { role: "หัวหน้าฝ่ายคลังสินค้า / แพ็กสินค้า", people: 1, salary: 21000 },
  { role: "คลังสินค้า / แพ็กสินค้า", people: 4, salary: 13000 },
  { role: "หัวหน้าด้านการตลาด / การขาย", people: 1, salary: 22000 },
  { role: "พนักงานด้านการตลาด / การขาย", people: 3, salary: 16000 },
  { role: "หัวหน้าฝ่ายบัญชี / การเงิน", people: 1, salary: 30000 },
  { role: "พนักงานบัญชี / การเงิน", people: 1, salary: 18000 },
  { role: "HR / ธุรการ", people: 1, salary: 23000 },
  { role: "ผู้จัดการโรงงาน", people: 2, salary: 38000 },
  { role: "ยาม / ผู้รักษาความปลอดภัย", people: 2, salary: 11000 },
  { role: "CEO", people: 1, salary: 60000 },
];

let editingIndex = null;

function formatTHB(n) {
  return n.toLocaleString("th-TH");
}

function render() {
  const tbody = document.getElementById("teamBody");

  let totalPeople = 0;
  let totalCost = 0;

  tbody.innerHTML = teamData.map((item, index) => {
    const rowTotal = item.people * item.salary;

    totalPeople += item.people;
    totalCost += rowTotal;

    if (editingIndex === index) {
      return `
      <tr>
        <td><input id="role${index}" value="${item.role}"></td>
        <td><input type="number" id="people${index}" value="${item.people}" min="0"></td>
        <td><input type="number" id="salary${index}" value="${item.salary}" min="0"></td>
        <td class="num">${formatTHB(rowTotal)}</td>
        <td class="center">
          <button class="save-btn" onclick="saveRow(${index})">บันทึก</button>
          <button class="cancel-btn" onclick="cancelEdit()">ยกเลิก</button>
        </td>
      </tr>
      `;
    }

    return `
    <tr>
      <td>${item.role}</td>
      <td class="num">${formatTHB(item.people)}</td>
      <td class="num">${formatTHB(item.salary)}</td>
      <td class="num">${formatTHB(rowTotal)}</td>
      <td class="center">
        <button class="edit-btn" onclick="editRow(${index})">แก้ไข</button>
        <button class="delete-btn" onclick="deleteRow(${index})">ลบ</button>
      </td>
    </tr>
    `;
  }).join("");

  document.getElementById("totalPeople").textContent = formatTHB(totalPeople);
  document.getElementById("totalCost").textContent = formatTHB(totalCost);

  document.getElementById("tfootPeople").textContent = formatTHB(totalPeople);
  document.getElementById("tfootCost").textContent = formatTHB(totalCost);
}

function editRow(index) {
  editingIndex = index;
  render();
}

function cancelEdit() {
  editingIndex = null;
  render();
}

function saveRow(index) {
  const role = document.getElementById(`role${index}`).value.trim();
  const people = parseInt(document.getElementById(`people${index}`).value, 10);
  const salary = parseInt(document.getElementById(`salary${index}`).value, 10);

  if (role === "" || isNaN(people) || isNaN(salary) || people < 0 || salary < 0) {
    alert("กรอกข้อมูลให้ถูกต้อง");
    return;
  }

  teamData[index] = {
    role,
    people,
    salary
  };

  editingIndex = null;
  render();
}

function deleteRow(index) {
  if (confirm("ต้องการลบข้อมูลนี้หรือไม่")) {
    teamData.splice(index, 1);
    render();
  }
}

document.addEventListener("DOMContentLoaded", render);