// import { func, options } from "joi";

const superSelector = (function() {

  'use strict';
   
  const body = document.querySelector('body');
  let colorTheme =  1; //1 or 2 between colorThemes
  const TYPE_MULTI = "multi";
  const TYPE_DEFAULT = "default";
  const TYPE_INPUT = "input";
  let optionsParameter = TYPE_DEFAULT; //1 - ordinary, 2 - checkboxes (multi), 3  - UI options
  
  const _selector = _create('div', body, {id: "select"});
  _selector.style.position = "relative";
  const frame = _create('div', _selector, {className: "frame"});
  // let _selector;
  let _anchor = null;

  
  const DEFAULT_PARAMS = {
    type: TYPE_INPUT,
    autoApply: false,
    onChange: () => {}
  };

  
  let _items = [];
  let _onChange = () => {};
  let _params = DEFAULT_PARAMS;

function parseAnchorElement() {
  if (_anchor instanceof HTMLSelectElement) {
   for (let i = 0; i < _anchor.children.length; i++) {
     if (_anchor.children[i] instanceof HTMLOptionElement) {
       _items.push({
          name: _anchor.children[i].innerHTML, 
          value: _anchor.children[i].getAttribute("value")
        });
     }
   }

   return _items;
  } else {
    console.log("False")
  };
};

  function initializeItems(items) {
    if (Array.isArray(items)) {
      _items = items;       
    } else {
      _items = parseAnchorElement();
    }
  };

  function initializeParams(params = {}) {
    // let _classes = {
    //   ..._classes,
    // };

    // let _params = {
    //   ..._params,
    //   ...params
    // };
  };

    function _create (tag, parent, params = {}) {
      let element = document.createElement(tag);

      if (typeof params === "object" && !Array.isArray(params)) {
        for (let key in params) {
            element[key] = params[key];
        }
      } 
      else {
          console.warn("Wrong parameters");
      }

      parent && parent.appendChild(element);

      return element;
  };


  function _createButton() {

    let theme = '';
    switch(colorTheme) {
      case 1:
      default: {
        theme = 'theme_default';
        break;
      }

      case 2: {
        theme = 'theme_red';
        break;
      }
    }
    const buttonDiv = _create("div", null, {className: "buttonDiv"});
    const button = _create("div", buttonDiv, {className: `buttonDrop ${theme}` , innerHTML: "Не выбрано"});
    const status = _create("div", buttonDiv, {className: "status"});
    _create("img", status, {id: "statusImg", src: "/files/arrow.png"});
    buttonDiv.onclick = toggle;
    return buttonDiv;
    };

  function _handleOptionClick(){
    frame.style.display = "none";
    let name = _items
  }

  function _options() {
    console.log("fdefe");
    // let optionBlock = _create('div', null, {className: "optionBlock"});
    if (optionsParameter === TYPE_DEFAULT) {
      for (let i = 0; i < _items.length; i++) {
          const block = _create('div', frame, {className: `block block${i}`});
          block.addEventListener("click", function() {
            document.querySelector(".buttonDrop").innerHTML = `${_items[i].name}`;
            document.querySelector(".frame").style.display = "none";
            document.querySelector(".status").style.transform = "rotate(0.5turn)";;
          });
          // optionBlock.appendChild(block);
          const option = _create("span", block, {href: "custom", innerHTML: `${_items[i].name}`, className: `option option${i+1}`});
          // block.appendChild(a);
      }
    } else if (optionsParameter === TYPE_MULTI) {
        for (let i = 0; i < _items.length; i++) {
          const block = _create('div', frame, {className: `block block${i}`});
          block.addEventListener("click", function() {
            document.querySelector(".buttonDrop").innerHTML = `${_items[i].name}`;
            document.querySelector(".frame").style.display = "none";
            document.querySelector("#statusImg").style.transform = "rotate(0.5turn)";;
            
          });
          const checkbox = _create("input", block, {type: "checkbox"});
          const option = _create("span", block, {href: "custom", innerHTML: `${_items[i].name}`, className: `option option${i+1}`});
          checkbox.checked = false;
        }
        const optionSubmit = _create("button", frame, {innerHTML: "Submit", className: "submit"});

    } else if (optionsParameter === TYPE_INPUT) {
      // for (i = 1; i <= n; i++) {
        const block = _create('div', frame, {className: "block"});
        const checkbox = _create("input", block, {type: "text", placeholder: "write your option", className: "submitText"});
        // const a = _create("span", block, {href: "custom", innerHTML: "Custom", id: "hide", className: "hide"});
        const optionSubmit = _create("button", frame, {innerHTML: "Submit", className: "submit"});
        // }
    }

    return ;
  }
  
 
  function _search() {
    if (optionsParameter === TYPE_DEFAULT || optionsParameter === TYPE_MULTI) {
      const search = _create("input", frame, {type: "text", placeholder: "Search..", className:"myInput hide", id: "myInput", onkeyup:"filterFunction()"});
      search.style.padding = "20px"
      search.onkeyup = filterFunction;
      return search;

    }
    else {
      return;
    }
  }

  function filterFunction() {
    var input, filter, ul, li, a, i, seek;
  
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    seek = document.querySelector(".frame");
    a = seek.getElementsByTagName("a");
  
    for (i = 0; i < a.length; i++) {
      txtValue = a[i].textContent || a[i].innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }
  function _hideSeek() {
    frame.addEventListener('click', event => event.stopPropagation());
   document.addEventListener('click', function() {
     frame.style.display = "none";
   });
  }


  
  function _render() {
    // document.body.appendChild(_selector);
    _selector.appendChild(_createButton());

    _selector.appendChild(frame);
    _anchor.parentNode.replaceChild(_selector, _anchor);
  }

  function init(cssSelector) {
    _anchor = document.querySelector(cssSelector);
 
    if (_anchor instanceof HTMLElement) {
      initializeItems();
      // initializeParams();

      _anchor.appendChild(_selector);
      _createButton();
      _search();
      console.log(_anchor);
      _options(5);
      // document.onclick = _hideSeek;
      _render();
    } else {
      console.error('Anchor not found');
    }
  }
  
  function toggle() {
    let x = document.querySelector(".frame");
    let y = document.querySelector(".status");
    if (x.style.display === "none") {
      x.style.display = "block";
      y.style.transform = "rotate(0.5turn)";
    } else {
      x.style.display = "none";
      y.style.transform = "";
    }
  } 


  return init;

  })();





