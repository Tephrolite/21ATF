const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const nameInput = document.getElementById('nameInput');
const result = document.getElementById('result');
const fixedName = 'Maj Kim'; // Hardcoded fixed winner
let names = [];
let startAngle = 0;
let spinning = false;

function startWheel() {
  if (spinning) return;
  names = nameInput.value.split('\n').filter(name => name.trim() !== '');

  if (names.length < 2) {
    alert('Please enter at least 2 names!');
    return;
  }
  if (!names.includes(fixedName)) {
    alert(`The fixed winner "${fixedName}" must be in the name list!`);
    return;
  }

  spinning = true;
  let spinTime = 0;
  const spinDuration = 3000; // 3 seconds
  const fixedIndex = names.indexOf(fixedName);
  const targetAngle = (fixedIndex / names.length) * 2 * Math.PI + Math.PI * 2 * 3; // 3 full spins + fixed position

  function spin() {
    spinTime += 16; // ~60fps
    startAngle += 0.2; // Speed of spin
    drawWheel();

    if (spinTime >= spinDuration) {
      // Stop at fixed winner
      startAngle = targetAngle % (2 * Math.PI);
      drawWheel();
      result.textContent = `Winner: ${fixedName}`;
      spinning = false;
      return;
    }
    requestAnimationFrame(spin);
  }
  spin();
}

function drawWheel() {
  const arc = 2 * Math.PI / names.length;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw wheel segments
  for (let i = 0; i < names.length; i++) {
    const angle = startAngle + i * arc;
    ctx.beginPath();
    ctx.arc(200, 200, 200, angle, angle + arc);
    ctx.lineTo(200, 200);
    ctx.fillStyle = `hsl(${i * 360 / names.length}, 70%, 50%)`;
    ctx.fill();

    // Draw name
    ctx.save();
    ctx.translate(200, 200);
    ctx.rotate(angle + arc / 2);
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(names[i], 100, 0);
    ctx.restore();
  }

  // Draw pointer
  ctx.beginPath();
  ctx.moveTo(380, 190);
  ctx.lineTo(400, 200);
  ctx.lineTo(380, 210);
  ctx.fillStyle = 'red';
  ctx.fill();
}