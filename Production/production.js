const flavorMap = {
  plain: {
    name: "นมจืด",
    img: "../img/milk.png"
  },
  strawberry: {
    name: "นมสตรอเบอรี่",
    img: "../img/milk_straw.png"
  },
  chocolate: {
    name: "นมช็อกโกแลต",
    img: "../img/milk_choc.png"
  }
};

const flavorSelect = document.getElementById("flavor");
const boxPerRoundInput = document.getElementById("boxPerRound");
const roundsInput = document.getElementById("rounds");

const selectedFlavorText = document.getElementById("selectedFlavor");
const showBoxPerRound = document.getElementById("showBoxPerRound");
const showRounds = document.getElementById("showRounds");
const totalBoxes = document.getElementById("totalBoxes");
const milkPreview = document.getElementById("milkPreview");
const productionForm = document.getElementById("productionForm");

function updateProductionSummary() {
  const flavor = flavorSelect.value;
  const boxPerRound = parseInt(boxPerRoundInput.value) || 0;
  const rounds = parseInt(roundsInput.value) || 0;
  const total = boxPerRound * rounds;

  selectedFlavorText.textContent = flavorMap[flavor].name;
  showBoxPerRound.textContent = boxPerRound;
  showRounds.textContent = rounds;
  totalBoxes.textContent = total;
  milkPreview.src = flavorMap[flavor].img;
}

flavorSelect.addEventListener("change", updateProductionSummary);
boxPerRoundInput.addEventListener("input", updateProductionSummary);
roundsInput.addEventListener("input", updateProductionSummary);

productionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const flavor = flavorMap[flavorSelect.value].name;
  const boxPerRound = parseInt(boxPerRoundInput.value) || 0;
  const rounds = parseInt(roundsInput.value) || 0;
  const total = boxPerRound * rounds;

  if (boxPerRound < 1 || rounds < 1) {
    alert("กรุณากรอกจำนวนให้ถูกต้อง");
    return;
  }

  alert(
    "สั่งผลิตสำเร็จ ✅\n\n" +
    "รสชาติ: " + flavor + "\n" +
    "จำนวนต่อรอบ: " + boxPerRound + " กล่อง\n" +
    "จำนวนรอบ: " + rounds + " รอบ\n" +
    "จำนวนผลิตรวม: " + total + " กล่อง"
  );
});

updateProductionSummary();