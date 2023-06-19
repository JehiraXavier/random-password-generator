console.clear();

const slider_props = {
  fill: "#5ea191",
  background: "rgba(255, 255, 255, 0.214)",
};

const slider = document.querySelector(".range__slider");
const sliderValue = document.querySelector(".length__title");

slider.querySelector("input").addEventListener("input", (event) => {
  sliderValue.setAttribute("data-length", event.target.value);
  applyFill(event.target);
});

applyFill(slider.querySelector("input"));

function applyFill(slider) {
  const percentage =
    (100 * (slider.value - slider.min)) / (slider.max - slider.min);
  const bg = `linear-gradient(90deg, ${slider_props.fill} ${percentage}%, ${
    slider_props.background
  } ${percentage + 0.1}%)`;
  slider.style.background = bg;
  sliderValue.setAttribute("data-length", slider.value);
}

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

function secureMathRandom() {
  return (
    window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1)
  );
}
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return String.fromCharCode(Math.floor(secureMathRandom() * 10) + 48);
}
function getRandomSymbol() {
  const symbols = '~!@#$%^&*()_+{}":?><;.,';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

const result_element = document.getElementById("result");
const length_element = document.getElementById("slider");
const uppercase_element = document.getElementById("uppercase");
const lowercase_element = document.getElementById("lowercase");
const number_element = document.getElementById("number");
const symbol_element = document.getElementById("symbol");
const generate_button = document.getElementById("generate");
const copy_button = document.getElementById("copy-btn");
const result_container = document.querySelector(".result");
const copy_info = document.querySelector(".result__info.right");
const copied_info = document.querySelector(".result__info.left");

let generate_password = false;

copy_button.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = result_element.innerText;
  if (!password || password == "CLICK GENERATE") {
    return;
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  copy_info.style.transform = "translateY(200%)";
  copy_info.style.opacity = "0";
  copied_info.style.transform = "translateY(0%)";
  copied_info.style.opacity = "0.75";
});

generate_button.addEventListener("click", () => {
  const length = +length_element.value;
  const hasLower = lowercase_element.checked;
  const hasUpper = uppercase_element.checked;
  const hasNumber = number_element.checked;
  const hasSymbol = symbol_element.checked;
  generate_password = true;
  result_element.innerText = generatePassword(
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol
  );
  copy_info.style.transform = "translateY(0%)";
  copy_info.style.opacity = "0.75";
  copied_info.style.transform = "translateY(200%)";
  copied_info.style.opacity = "0";
});

function generatePassword(length, lower, upper, number, symbol) {
  let generate_password = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i++) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generate_password += randomFunc[funcName]();
    });
  }
  return generate_password
    .slice(0, length)
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
}

function disableOnlyCheckbox() {
  let totalChecked = [
    uppercase_element,
    lowercase_element,
    number_element,
    symbol_element,
  ].filter((el) => el.checked);
  totalChecked.forEach((el) => {
    if (totalChecked.length == 1) {
      el.disabled = true;
    } else {
      el.disabled = false;
    }
  });
}

[uppercase_element, lowercase_element, number_element, symbol_element].forEach(
  (el) => {
    el.addEventListener("click", () => {
      disableOnlyCheckbox();
    });
  }
);
