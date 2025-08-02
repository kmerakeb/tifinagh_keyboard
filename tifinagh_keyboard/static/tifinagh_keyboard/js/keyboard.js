document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".tifinagh-input");
  const container = document.querySelector(".tifinagh-virtual-keys");
  const toggleBtn = document.getElementById("keyboard-toggle");

  if (!input || !container || !toggleBtn) {
    console.log("Missing input, container, or toggle button");
    return;
  }

  let currentLayout = 'tifinagh';

  const row0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-"];

  const tifinaghRows = [
    ["ⴰ","ⴱ","ⴲ","ⴳ","ⴴ","ⴵ","ⴶ","ⴷ","ⴸ","ⴹ","ⴺ","ⴻ","ⴼ","ⴽ","ⴾ","ⴿ"],
    ["ⵀ","ⵁ","ⵂ","ⵃ","ⵄ","ⵅ","ⵆ","ⵇ","ⵈ","ⵉ","ⵊ","ⵋ","ⵌ","ⵍ","ⵎ","ⵏ"],
    ["ⵐ","ⵑ","ⵒ","ⵓ","ⵔ","ⵕ","ⵖ","ⵗ","ⵘ","ⵙ","ⵚ","ⵛ","ⵜ","ⵝ","ⵞ","ⵟ"],
    ["\u2D60","\u2D61","\u2D62","\u2D63","\u2D64","\u2D65","\u2D66","\u2D67","\u2D68","\u2D69","\u2D6A","\u2D6B","\u2D6C","\u2D6D","\u2D6E","\u2D6F"],
    ["\u2D70","\u2D71","\u2D72","\u2D73","\u2D74","\u2D75","\u2D76","\u2D77","\u2D78","\u2D79","\u2D7A","\u2D7B","\u2D7C","\u2D7D","\u2D7E","\u2D7F"]
  ];

const kabyleRows = [
  ["č", "ɛ", "ɣ", "ḥ", "ṭ", "ṣ", "ẓ", "ṛ", "ṇ", "ḍ"],
  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
  ["k", "l", "m", "n", "o", "p", "q", "r", "s", "t"],
  ["u", "v", "w", "x", "y", "z", "ž"]
];

  function insertAtCursor(myField, myValue) {
    if (myField.selectionStart || myField.selectionStart === 0) {
      const startPos = myField.selectionStart;
      const endPos = myField.selectionEnd;
      const before = myField.value.substring(0, startPos);
      const after = myField.value.substring(endPos);
      myField.value = before + myValue + after;
      myField.selectionStart = myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
    }
    myField.focus();
  }

  function createButton(key) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = key;
    btn.classList.add("key");
    return btn;
  }

  function createRow(keys, addDelete = false) {
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("keyboard-row");

    keys.forEach(key => {
      const btn = createButton(key);
      btn.addEventListener("click", () => insertAtCursor(input, key));
      rowDiv.appendChild(btn);
    });

    if (addDelete) {
      const delBtn = createButton("⌫");
      delBtn.classList.add("key-delete");
      delBtn.addEventListener("click", () => {
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        if (startPos > 0) {
          const before = input.value.substring(0, startPos - 1);
          const after = input.value.substring(endPos);
          input.value = before + after;
          input.selectionStart = input.selectionEnd = startPos - 1;
          input.focus();
        }
      });
      rowDiv.appendChild(delBtn);
    }

    return rowDiv;
  }

function renderKeyboard() {
  container.innerHTML = "";
  container.appendChild(createRow(row0));

  const layout = currentLayout === 'tifinagh' ? tifinaghRows : kabyleRows;

  layout.forEach((row, index) => {
    const isLast = index === layout.length - 1;
    container.appendChild(createRow(row, isLast));
  });

  // Spacebar + Switch row
  const spaceRow = document.createElement("div");
  spaceRow.classList.add("keyboard-row");

  const spaceBtn = createButton("Space");
  spaceBtn.classList.add("key-space");
  spaceBtn.addEventListener("click", () => insertAtCursor(input, " "));
  spaceRow.appendChild(spaceBtn);

  const switchBtn = createButton(currentLayout === 'tifinagh' ? "QWERTY ⌨️" : "ⵜⵉⴼⵉⵏⴰⵖ ⌨️");
  switchBtn.classList.add("key-switch");
  switchBtn.addEventListener("click", () => {
    currentLayout = currentLayout === 'tifinagh' ? 'qwerty' : 'tifinagh';
    renderKeyboard();  // re-render with new layout
  });

  spaceRow.appendChild(switchBtn);
  container.appendChild(spaceRow);
}


  // Initial render
  renderKeyboard();

  toggleBtn.addEventListener("click", () => {
    currentLayout = currentLayout === 'tifinagh' ? 'qwerty' : 'tifinagh';
    toggleBtn.textContent = currentLayout === 'tifinagh' ? "Switch to QWERTY" : "Switch to Tifinagh";
    renderKeyboard();
  });
});
