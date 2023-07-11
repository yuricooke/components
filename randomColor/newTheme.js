
function generateRandomColor() {
  const maxVal = 16777215;
  const randomNumber = Math.floor(Math.random() * maxVal);
  const randColor = randomNumber.toString(16).padStart(6, "0");
  return `#${randColor.toUpperCase()}`;
}

const foreground = "#000000"; // For example, black


function getContrastRatio(background, foreground) {
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  function calculateRelativeLuminance(rgb) {
    const { r, g, b } = rgb;
    const sRGB = [r / 255, g / 255, b / 255];
    const sRGBAdjusted = sRGB.map((c) =>
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );
    const luminance =
      0.2126 * sRGBAdjusted[0] +
      0.7152 * sRGBAdjusted[1] +
      0.0722 * sRGBAdjusted[2];
    return luminance;
  }

  const backgroundRgb = hexToRgb(background);
  const foregroundRgb = hexToRgb(foreground);

  const backgroundLuminance = calculateRelativeLuminance(backgroundRgb);
  const foregroundLuminance = calculateRelativeLuminance(foregroundRgb);

  const contrastRatio =
    (backgroundLuminance + 0.05) / (foregroundLuminance + 0.05);

  return contrastRatio;
}

function updateElementColor(elementId, color, foreground) {
  const contrastRatio = getContrastRatio(color, foreground);
  const element = document.getElementById(elementId);
  element.textContent = color;
  element.style.color = contrastRatio >= 5 ? "#212121" : "#FBFCF8";
}

function updateThemeColors(color1, color2, color3, foreground) {
  const root = document.documentElement;
  root.style.setProperty("--primary", color1);
  root.style.setProperty("--accent", color2);
  root.style.setProperty("--neutral", color3);

  updateElementColor("color1", color1, foreground);
  updateElementColor("color2", color2, foreground);
  updateElementColor("color3", color3, foreground);
}

function newThemeColor() {
  let color1 = generateRandomColor();
  let color2 = generateRandomColor();
  let color3 = generateRandomColor();

  updateThemeColors(color1, color2, color3, foreground);

  console.log("New color 1:", color1);
  console.log("New color 2:", color2);
  console.log("New color 3:", color3);
}

function changeColor(elementId) {
  let color;
  if (elementId === "color1") {
    color = generateRandomColor();
    color1 = color;
    document.documentElement.style.setProperty(`--primary`, color);
  } else if (elementId === "color2") {
    color = generateRandomColor();
    color2 = color;
    document.documentElement.style.setProperty(`--accent`, color);
  } else if (elementId === "color3") {
    color = generateRandomColor();
    color3 = color;
    document.documentElement.style.setProperty(`--neutral`, color);
  }

  updateElementColor(elementId, color, foreground);

  console.log(`New ${elementId}:`, color);
}

window.addEventListener("load", newThemeColor);
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    newThemeColor();
  }
});

