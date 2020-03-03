_anchor = document.querySelector("#top-selector");
_items = [];
for (let i = 0; i < 4; i++) {
     if (_anchor.children[i] instanceof HTMLOptionElement) {
       _items.push({
         name: _anchor.children[i].innerHTML, value: _anchor.children[i].getAttribute("value")});
     }
   }
_items