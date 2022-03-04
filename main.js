const funcStorage = {
  get(){
      return JSON.parse(localStorage.getItem("list")) || []
  },
  set(list){
      localStorage.setItem("list", JSON.stringify(list))
  }
};


let localStorageList = funcStorage.get()

localStorageList.forEach(element => {
  elementHTML(element[0])
});


function elementHTML(toAddValue) {
  setTimeout(() => {
    
    const listAll = document.querySelector("#container-new-list");
  
    const newList = document.createElement("li");
    newList.classList.add("new-list");
    listAll.appendChild(newList);
  
    const btn = document.createElement("button");
    const buttonX = document.createTextNode("X");
    btn.classList.add("delete");
    newList.appendChild(btn);
    btn.appendChild(buttonX);
    btn.addEventListener("click", () => {
      btn.parentNode.parentNode.removeChild(newList);
      const nodeText = btn.parentNode.childNodes[2];
      let comparisonList = [];
      comparisonList.push(nodeText.data);
      const found = localStorageList.find(element => element[0] == comparisonList);

      const index = localStorageList.indexOf(found);

      localStorageList.forEach(element =>{
        if(element === found){
          localStorageList.splice(index, 1)
        };
      });
      funcStorage.set(localStorageList);

    });

    const checkbox = document.createElement("input");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("type", "checkbox");
    newList.appendChild(checkbox);
    checkbox.addEventListener("change", () => {
      const found = localStorageList.find(element => element[0] == toAddValue);
      const index = localStorageList.indexOf(found);
      
      localStorageList.forEach(element => {
        if (element === found) {
          if(checkbox.checked){
            newList.classList.add("list-made")
            localStorageList[index].splice(1, 1, true)
          }
          else {
            newList.classList.remove("list-made");
            localStorageList[index].splice(1, 1, false)
          }
          funcStorage.set(localStorageList);
        }
      })
    })
    const found = localStorageList.find(element => element[0] == toAddValue);

    if (found[1] === true) {
      newList.classList.add("list-made")
      checkbox.checked = true
    }
    else {
      newList.classList.remove("list-made");
      checkbox.checked = false
    }

    const text = document.createTextNode(toAddValue);
    newList.appendChild(text);
  
    const line = document.createElement("div");
    line.classList.add("line");
    newList.appendChild(line);

  }, 2000);
}

function addList() {
  const toAdd = document.querySelector("#to-add");
    if(!toAdd.value == ""){
      
      elementHTML(toAdd.value);
  
      localStorageList.push([toAdd.value, false]);
  
      funcStorage.set(localStorageList);
    }

  toAdd.value = "";

}


const addButton = document.querySelector("#btn-to-add");

addButton.addEventListener("click", addList)
