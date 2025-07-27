document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".tifinagh-input");
  const container = document.querySelector(".tifinagh-virtual-keys");

  if (!input || !container) {
    console.log("Missing input or virtual keyboard container");
    return;
  }

  // Clear container early
  container.innerHTML = "";

  // Row 0: Numbers and symbols
  const row0 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-"];

  // Tifinagh rows (using unicode escapes for row4 and row5)
  const row1 = ["ⴰ","ⴱ","ⴲ","ⴳ","ⴴ","ⴵ","ⴶ","ⴷ","ⴸ","ⴹ","ⴺ","ⴻ","ⴼ","ⴽ","ⴾ","ⴿ"];
  const row2 = ["ⵀ","ⵁ","ⵂ","ⵃ","ⵄ","ⵅ","ⵆ","ⵇ","ⵈ","ⵉ","ⵊ","ⵋ","ⵌ","ⵍ","ⵎ","ⵏ"];
  const row3 = ["ⵐ","ⵑ","ⵒ","ⵓ","ⵔ","ⵕ","ⵖ","ⵗ","ⵘ","ⵙ","ⵚ","ⵛ","ⵜ","ⵝ","ⵞ","ⵟ"];
  const row4 = [
    "\u2D60", "\u2D61", "\u2D62", "\u2D63", "\u2D64", "\u2D65", "\u2D66", "\u2D67",
    "\u2D68", "\u2D69", "\u2D6A", "\u2D6B", "\u2D6C", "\u2D6D", "\u2D6E", "\u2D6F"
  ];
  const row5 = [
    "\u2D70", "\u2D71", "\u2D72", "\u2D73", "\u2D74", "\u2D75", "\u2D76", "\u2D77",
    "\u2D78", "\u2D79", "\u2D7A", "\u2D7B", "\u2D7C", "\u2D7D", "\u2D7E", "\u2D7F"
  ];

  // Extra symbols row (optional)
  const symbolsRow = [".", ",", "?", "!", "(", ")", "*", "%", "#", "@", "$"];

  function insertAtCursor(field, value) {
    if (field.selectionStart || field.selectionStart === 0) {
      const start = field.selectionStart;
      const end = field.selectionEnd;
      field.value = field.value.substring(0, start) + value + field.value.substring(end);
      field.selectionStart = field.selectionEnd = start + value.length;
    } else {
      field.value += value;
    }
    field.focus();
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
        const start = input.selectionStart;
        const end = input.selectionEnd;
        if (start > 0) {
          input.value = input.value.substring(0, start - 1) + input.value.substring(end);
          input.selectionStart = input.selectionEnd = start - 1;
          input.focus();
        }
      });
      rowDiv.appendChild(delBtn);
    }

    return rowDiv;
  }

  // Append rows to container
  container.appendChild(createRow(row0));
  container.appendChild(createRow(row1));
  container.appendChild(createRow(row2));
  container.appendChild(createRow(row3));
  container.appendChild(createRow(row4));
  container.appendChild(createRow(row5, true)); // delete key on last row
  container.appendChild(createRow(symbolsRow)); // symbols row

  // Spacebar row
  const spaceRow = document.createElement("div");
  spaceRow.classList.add("keyboard-row");

  const spaceBtn = createButton("Space");
  spaceBtn.classList.add("key-space");
  spaceBtn.addEventListener("click", () => insertAtCursor(input, " "));
  spaceRow.appendChild(spaceBtn);

  container.appendChild(spaceRow);

  // Font load check
  document.fonts.load('16px "Noto Sans Tifinagh"').then(fonts => {
    if (fonts.length > 0) {
      console.log("Font loaded successfully!");
    } else {
      console.log("Font failed to load.");
    }
  });
});
