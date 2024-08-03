const BASE_JSON_BIN_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = "66a76abce41b4d34e418b40f";
const MASTER_KEY = "$2a$10$SZmQCZpQHkTV2gZGuDKJ1uat8z2cpklVj5IacRiQqobvjjwweTOYq";

function addPart(parts, partId, partQuantity, partLocation) {
  let newPart = {
    partId: partId,
    partQuantity: partQuantity,
    partLocation: partLocation
  };
  parts.push(newPart);
}

function updatePart(parts, partId, newPartQuantity) {
  let list = null;
  for (let p of parts) {
    if (p.partId == partId) {
      list = p;
    }
  }
  if (list) {
    list.partQuantity = newPartQuantity;
  } else {
    console.log("List is not found");
  }
}

function deletePart(parts, partId) {
  let indexToDelete = null;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].partId == partId) {
      indexToDelete = i;
      break;
    }
  }
  if (indexToDelete !== null) {
    parts.splice(indexToDelete, 1);
  } else {
    console.log("List is not found");
  }
}

async function loadLists() {
  const response = await axios.get(BASE_JSON_BIN_URL + "/" + BIN_ID + "/latest");
  return response.data.record;
}

async function saveLists(parts) {
  const response = await axios.put(`${BASE_JSON_BIN_URL}/${BIN_ID}`, parts, {
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": MASTER_KEY
    }
  });
  return response.data;

}