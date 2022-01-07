var InputBoxes = document.getElementsByClassName("input-box");
var InputFields = document.getElementsByTagName("input");
var SelectionInputDropdown = document.getElementsByClassName("selection-input-dropdown")[0];

var mouseX;
var mouseY;
document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

for (var i = 0; i < InputFields.length; i++) {
    const pass = i;
    var tempInputValue = "";
    InputFields[pass].addEventListener("focus", (event) => {
        tempInputValue = InputFields[pass].value;
        InputFields[pass].style.cursor = "auto";
        InputBoxes[pass].style.border = "1px solid var(--primary-color)";
        InputBoxes[pass].style.boxShadow = "rgba(0, 0, 0, 0) 0px 0px 0px";
        
        if(InputFields[pass].className === "selection-input"){
            InputFields[pass].value = "";
            InputFields[pass].placeholder = "Type to search..."
            for(var i = 0; i < SelectionInputDropdown.children.length; i++) {
                SelectionInputDropdown.children[i].style.display = "initial";
            }
            SelectionInputDropdown.style.display = "block";
            SelectionInputDropdown.style.left = (InputFields[pass].getBoundingClientRect().x) + "px";
            SelectionInputDropdown.style.top = (InputFields[pass].getBoundingClientRect().y + 50) + "px";
        }
    });
    InputFields[pass].addEventListener("focusout", (event) => {
        InputBoxes[pass].style.border = "";
        InputBoxes[pass].style.boxShadow = "";

        if(InputFields[pass].className === "selection-input"){
            InputFields[pass].style.cursor = "pointer";
            InputFields[pass].placeholder = "";
            InputFields[pass].value = tempInputValue;
            
            bound = SelectionInputDropdown.getBoundingClientRect();
            if(mouseX > bound.x && mouseX < bound.x + bound.width && mouseY > bound.y && mouseY < bound.y + bound.height){
            } else{
                SelectionInputDropdown.style.display = "none";
            }
        }
    });
    if(InputFields[pass].className === "selection-input"){
        InputFields[pass].addEventListener("input", async function(event) {
            for(var i = 0; i < SelectionInputDropdown.children.length; i++) {
                if(!SelectionInputDropdown.children[i].textContent.toUpperCase().includes(InputFields[pass].value.toUpperCase())){
                    SelectionInputDropdown.children[i].style.display = "none";
                } else{
                    SelectionInputDropdown.children[i].style.display = "initial";
                }
            }
        });
    }
}