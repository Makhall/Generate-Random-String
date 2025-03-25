document.getElementById("length").addEventListener("input", function () {
  document.getElementById("lengthValue").innerText = this.value;
});

function generateString() {
  const length = document.getElementById("length").value;
  const includeUppercase = document.getElementById("uppercase").checked;
  const includeLowercase = document.getElementById("lowercase").checked;
  const includeNumbers = document.getElementById("numbers").checked;
  const includeSymbols = document.getElementById("symbols").checked;

  let charPool = "";
  if (includeUppercase) charPool += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLowercase) charPool += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charPool += "0123456789";
  if (includeSymbols) charPool += "!@#$%^&*()_+{}[]|:;<>,.?/";

  if (!charPool) {
    document.getElementById("output").innerText =
      "Error: No character set selected!";
    document.getElementById("strength").innerText = "";
    return;
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    result += charPool[Math.floor(Math.random() * charPool.length)];
  }

  document.getElementById("output").innerText = result;
  document.getElementById("strength").innerText = checkStrength(result);
}

function checkStrength(password) {
  let score = 0;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*()_+{}\[\]|:;<>,.?/]/.test(password)) score++;
  if (password.length >= 12) score++;

  const levels = ["Weak", "Fair", "Good", "Strong", "Very Strong"];
  const progressValues = [10, 30, 50, 75, 100];

  document.getElementById("strengthBar").value = progressValues[score - 1] || 10;
  return levels[score - 1] || "Weak";
}

// Copy to clipboard
function copyToClipboard() {
  const text = document.getElementById("output").innerText;
  if (!text) {
    alert("No string to copy!");
    return;
  }
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
}
