document.addEventListener('DOMContentLoaded', function () {

  async function main() {
    let parts = await loadLists();

    const addPartButton = document.querySelector("#addPart");
    addPartButton.addEventListener('click', function () {

      const partIdInput = document.querySelector("#partId");
      const partId = partIdInput.value;
      const partQuantityInput = document.querySelector("#partQuantity");
      const partQuantity = partQuantityInput.value;
      const partLocationSelect = document.querySelector("#partLocation");
      const partLocation = partLocationSelect.value;

      if (partQuantity) {
        addPart(parts, partId, partQuantity, partLocation);
        renderParts(parts);
        partQuantityInput.value = '';
      }
    });

    const saveButton = document.querySelector("#save-btn");
    saveButton.addEventListener("click", async function () {
      saveLists(parts);
    })

    renderParts(parts);
  }

  function renderParts(parts) {
    partList.innerHTML = '';
    for (let part of parts) {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.innerHTML = `
                ${part.partId}<span></span>
                ${part.partQuantity}<span></span>
                ${part.partLocation}<span></span>
                <button class="btn edit-btn btn-success btn-sm">Update Quantity</button>
                <button class="btn delete-btn btn-danger btn-sm">Delete Part</button>
                      `;
      partList.appendChild(li);

      // Button to update part quantity
      li.querySelector(".edit-btn").addEventListener('click', function () {
        const newPartQuantity = prompt("Enter the new quantity: ", part.partQuantity);
        updatePart(parts, part.partId, newPartQuantity);
        renderParts(parts);
      });

      // Button to delete part
      li.querySelector(".delete-btn").addEventListener('click', function () {
        const confirmation = confirm("Do you want to delete the part: " + part.partId + "?");
        if (confirmation) {
          deletePart(parts, part.partId);
          renderParts(parts);
        }
      });

    }
    saveLists(parts);
  }

  main();
});
