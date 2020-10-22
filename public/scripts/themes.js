var dark;
let background = document.getElementById('background');
let toggleButton = document.getElementById('toggle');

const theme = localStorage.getItem('theme')

console.log(dark)

if (theme === null) {
  background.className = 'light'
  toggleButton.innerHTML = 'Go Dark'

  console.log(dark)

  dark = false;

  localStorage.setItem("theme", "light");
} else if (theme === 'light') {
  background.className = 'light'
  toggleButton.innerHTML = 'Go Dark'

  console.log(dark)

  dark = false;

  localStorage.setItem("theme", "light");
} else if (theme === 'dark') {
  background.className = 'dark'
  toggleButton.innerHTML = 'Go Bright'

  console.log(dark)

  dark = true;

  localStorage.setItem("theme", "dark")
}



function toggleModes() {
  if (dark) {
    background.className = 'light'
    toggleButton.innerHTML = 'Go Dark'

    console.log(dark)

    dark = false;

    localStorage.setItem("theme", "light");
  } else {
    background.className = 'dark'
    toggleButton.innerHTML = 'Go Bright'

    console.log(dark)

    dark = true;

    localStorage.setItem("theme", "dark")
  }
}

module.exports = 'theme'