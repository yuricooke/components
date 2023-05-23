
function generateRandomColor() {
    const maxVal = 0xFFFFFF; // 16777215
    let randomNumber = Math.random() * maxVal;
    randomNumber = Math.floor(randomNumber);
    randomNumber = randomNumber.toString(16);
    const randColor = randomNumber.padStart(6, '0');
    return `#${randColor.toUpperCase()}`;
  }
  
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
        0.2126 * sRGBAdjusted[0] + 0.7152 * sRGBAdjusted[1] + 0.0722 * sRGBAdjusted[2];
      return luminance;
    }
  
    const backgroundRgb = hexToRgb(background);
    const foregroundRgb = hexToRgb(foreground);
  
    const backgroundLuminance = calculateRelativeLuminance(backgroundRgb);
    const foregroundLuminance = calculateRelativeLuminance(foregroundRgb);
  
    const contrastRatio = (backgroundLuminance + 0.05) / (foregroundLuminance + 0.05);
  
    return contrastRatio;
  }
  
  // Generate three random background colors
  // Outputs a random color code like "#A1B2C3"

  let color1 = generateRandomColor();
  let color2 = generateRandomColor();
  let color3 = generateRandomColor();
  
  // Specify a text color
  const foreground = '#000000'; // For example, black
  
  // Calculate the contrast ratio for each background color
  const contrastRatio1 = getContrastRatio(color1, foreground);
  const contrastRatio2 = getContrastRatio(color2, foreground);
  const contrastRatio3 = getContrastRatio(color3, foreground);
  
  // Display the results
  console.log('Background 1:', color1);
  console.log('Contrast ratio 1:', contrastRatio1);
  console.log('Background 2:', color2);
  console.log('Contrast ratio 2:', contrastRatio2);
  console.log('Background 3:', color3);
  console.log('Contrast ratio 3:', contrastRatio3);



// Update the HTML elements with the random color codes

    document.getElementById('color1').textContent = color1;
    document.getElementById('color1').style.color = contrastRatio1 >= 5 ? '#212121' : '#FBFCF8';
    document.getElementById('color2').textContent = color2;
    document.getElementById('color2').style.color = contrastRatio2 >= 5 ? '#212121' : '#FBFCF8';
    document.getElementById('color3').textContent = color3;
    document.getElementById('color3').style.color = contrastRatio1 >= 5 ? '#212121' : '#FBFCF8';


// COLORS

const themes = [
    {
      name: 'theme1',
      primary: color1,
      accent: color2,
      neutral: color3
    }
  ];

// RANDOM THEME


function setRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const randomTheme = themes[randomIndex];
    const root = document.documentElement;
  
    root.style.setProperty('--primary', randomTheme.primary);
    root.style.setProperty('--accent', randomTheme.accent);
    root.style.setProperty('--neutral', randomTheme.neutral);
  }



// Function to change the theme color
function changeThemeColor() {
  // Generate a new random color
  let newColor1 = generateRandomColor();
  let newColor2 = generateRandomColor();
  let newColor3 = generateRandomColor();


// assign color to newColor 


  let color1 = newColor1;
  let color2 = newColor2;
  let color3 = newColor3;


  // Display the results
  console.log('Background 1:', color1);
  console.log('Contrast ratio 1:', contrastRatio1);
  console.log('Background 2:', color2);
  console.log('Contrast ratio 2:', contrastRatio2);
  console.log('Background 3:', color3);
  console.log('Contrast ratio 3:', contrastRatio3);


  // Update the theme color
  const root = document.documentElement;
  root.style.setProperty('--primary', newColor1);
  root.style.setProperty('--accent', newColor2);
  root.style.setProperty('--neutral', newColor3);

  

  // Update any other elements that need to reflect the new color
  // For example, if you have a text element with ID 'color1'
  document.getElementById('color1').textContent = newColor1;
  document.getElementById('color1').style.color = getContrastRatio(newColor1, foreground) >= 5 ? '#212121' : '#FBFCF8';
  document.getElementById('color2').textContent = newColor2;
  document.getElementById('color2').style.color = getContrastRatio(newColor2, foreground) >= 5 ? '#212121' : '#FBFCF8';
  document.getElementById('color3').textContent = newColor3;
  document.getElementById('color3').style.color = getContrastRatio(newColor3, foreground) >= 5 ? '#212121' : '#FBFCF8';
  
}

// Add event listener to the button
const themeButton = document.getElementById('themeButton');
themeButton.addEventListener('click', changeThemeColor);


// RANDOM ON WINDOW LOAD

window.addEventListener('load', setRandomTheme);

// Change themes on spacebar press
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space') {
    event.preventDefault(); // Prevent default behavior of spacebar (scrolling)
    changeThemeColor ();
  }
});