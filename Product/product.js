function calculateTotal() {
    let plain = document.getElementById("plainQty").value * 15;
    let straw = document.getElementById("strawQty").value * 18;
    let choco = document.getElementById("chocoQty").value * 20;

    let total = plain + straw + choco;

    document.getElementById("total").innerText = total;
}

function orderNow() {
    calculateTotal();
    let total = document.getElementById("total").innerText;

    if (total > 0) {
        alert("สั่งซื้อสำเร็จ! ยอดรวม " + total + " บาท");
    } else {
        alert("กรุณาเลือกสินค้า");
    }
}