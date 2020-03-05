
const superSelector = (function () {

  'use strict';

  const body = document.querySelector('body');
  const TYPE_MULTI = "multi";
  const TYPE_DEFAULT = "default";
  const TYPE_INPUT = "input";

  const _selector = _create('div', body, {
    id: "select"
  });
  const select__dropdown = _create('div', _selector, {
    className: "select__dropdown"
  });
  let _anchor = null;
  let arrayValues = [];
  let checkboxValues = [];

  const DEFAULT_PARAMS = {
    type: TYPE_DEFAULT,
    autoApply: false
  };


  let _items = [];
  let _classes = {};
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
      console.log("items", items);

      _items = items;
    } else {
      _items = parseAnchorElement();
    }
  };

  function initializeParams(params = {}) {
    // let _classes = {
    //   ..._classes,
    // };
    console.log("params:",params);

    if (typeof params === "object" && !Array.isArray(params)) {
      const {
        items,
        classes,
        onChange,
        ...restParams
      } = params;

      _classes = classes || _classes;
      _onChange = onChange || _onChange;

      _params = {
        ..._params,
        ...restParams
      };

      initializeItems(items);
    } else {
      console.error("Wrong parameters");
    }
  };

  function _create(tag, parent, params = {}) {
    let element = document.createElement(tag);

    if (typeof params === "object" && !Array.isArray(params)) {
      for (let key in params) {
        element[key] = params[key];
      }
    } else {
      console.warn("Wrong parameters");
    }

    parent && parent.appendChild(element);

    return element;
  };


  function _createButton() {

    const buttonWrapper = _create("div", null, {
      className: "button-wrapper"
    });
    const buttonWrapper__buttonText = _create("div", buttonWrapper, {
      className: "button-wrapper__button-text"
    });
    _create("span", buttonWrapper__buttonText, {
      innerHTML: "Не выбрано"
    });
    const buttonWrapper__buttonArrow = _create("div", buttonWrapper, {
      className: "button-wrapper__button-arrow"
    });
    _create("img", buttonWrapper__buttonArrow, {
      className: "button-wrapper__button-arrow-img",
      src: "/files/arrow.png"
    });
    buttonWrapper.onclick = toggle;
    return buttonWrapper;
  };

  function _options(items = _items) {
    // arrayValues = [];
    
    let dropdown__optionBlock = document.querySelector(".select__dropdown__option-block"); 
    dropdown__optionBlock.innerHTML = "";
    if (_params.type === TYPE_DEFAULT) {
      for (let i = 0; i < items.length; i++) {
        const select__dropdown__optionBlock__option = _create('div', dropdown__optionBlock, {
          className: "select__dropdown__option-block__option",
         
        });
        select__dropdown__optionBlock__option.addEventListener("click", function () {
          document.querySelector(".button-wrapper__button-text").innerHTML = `${items[i].name}`;
          toggle();
          _onChange(items[i].value);
        });
        const option = _create("span", select__dropdown__optionBlock__option, {
          href: "custom",
          innerHTML: `${items[i].name}`,
          className: "option"
        });
      }
    } else if (_params.type === TYPE_MULTI) {
      for (let i = 0; i < items.length; i++) {
        const select__dropdown__optionBlock__option = _create('div', dropdown__optionBlock, {
          className: "select__dropdown__option-block__option"
        });
    
        const select__checkboxLabel = _create("label", select__dropdown__optionBlock__option, {
          className:"select__container-checkbox"
        });
        const checkbox = _create("input", select__checkboxLabel, {
          type: "checkbox",
          className: "select__container-checkbox__checkbox"
        });
        checkbox.onclick = (event, function () {
          event.stopPropagation;
        });
        _create("span", select__checkboxLabel, {
          className: "checkmark"
        });
        const option = _create("span", select__dropdown__optionBlock__option, {
          href: "custom",
          innerHTML: `${items[i].name}`,
          className: "option"
        });
         checkbox.checked = checkboxValues.includes(items[i].value);
        select__dropdown__optionBlock__option.addEventListener("click", function () {
         
          checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
          checkboxValues = checkboxValues.includes(items[i].value) ? checkboxValues.filter(value => items[i].value !== value) : [...checkboxValues, items[i].value]; 

          // checkboxValues.includes(items[i].value) ? checkboxValues.filter(function () ) : checkboxValues.push(items[i].value);
          console.log(checkboxValues);
          // (checkbox.checked = false && buttonText.innerHTML.includes(` ${items[i].name}`)  ? buttonText.innerHTML.replace(` ${items[i].name}`)
        
        });
      }
      const select__optionSelect__dropdown__optionBlock__submit = _create("button", dropdown__optionBlock, {
        innerHTML: "Submit",
        className: "select__dropdown__option-block__submit"
      });
      select__optionSelect__dropdown__optionBlock__submit.addEventListener("click", function () {
        toggle();
        let buttonText = document.querySelector(".button-wrapper__button-text");
        const checkboxes = document.querySelectorAll(".select__container-checkbox__checkbox");
        buttonText.innerHTML = "";

        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            arrayValues.push(items[i].value);
            // console.log(items[i].value);
            buttonText.innerHTML += ` ${items[i].name}`;
          }
        }
        // arrayValues.includes(items[i].value)  ? console.log(false) : arrayValues.push(items[i].value);
        // buttonText.innerHTML.includes(items[i].name) ? false : buttonText.innerHTML += ` ${items[i].name}`;
        _onChange(arrayValues);
        // arrayValues = [];
        // for (let i = 0; i < checkboxes.length; i++) {
        //   checkboxes[i].checked = false;

        // }

      });
    }

    // else if (_params.type === TYPE_INPUT) {

    //   const input = _create("input", dropdown__optionBlock, {
    //     type: "text",
    //     placeholder: "write your option",
    //     className: "submitText"
    //   });
    //   // const a = _create("span", select__dropdown__optionBlock__option, {href: "custom", innerHTML: "Custom", id: "hide", className: "hide"});
    //   const select__optionSelect__dropdown__optionBlock__submit = _create("buttonWrapper__buttonText", dropdown__optionBlock, {
    //     innerHTML: "Submit",
    //     className: "select__dropdown__option-block__submit"
    //   });
    //   select__optionSelect__dropdown__optionBlock__submit.addEventListener("click", function () {
    //     input.value = "";
    //     input.placeholder = "Thank you!";
    //     setTimeout(function () {
    //       select__dropdown.style.display = "none";
    //     }, 1000);
    //   });
    // }

    return ;
  }

  function _search() {
    if (_params.type === TYPE_DEFAULT || _params.type === TYPE_MULTI) {
      const search = _create("input", select__dropdown, {
        type: "text",
        placeholder: "Search..",
        className: "select__dropdown__search hide",
        id: "select__dropdown__search",
        oninput: "filterFunction()"
      });
      console.log(_searchFilter);
      search.oninput = _searchFilter;
      return search;

    } else {
      return;
    }
  }

  function _searchFilter(event) {
    const searchValue = event.target.value;
    let itemsToRender;

    if (searchValue) {
      const searchRegEx = new RegExp(`^${searchValue}`, 'i');

      itemsToRender = _items.filter((item, index) => {
        const {
          name
        } = item;
        return searchRegEx.test(name);
      })

      // console.log(filteredItems);
      // itemsToRender = filteredItems
      // _renderDropdown(filteredItems);
    }
    // else {
    //   _dropdownRefresh();
    // }

    _options(itemsToRender);
  }
  


  // function _renderDropdown(items = _items) {
  //   // let select__dropdown__optionBlock__option = document.querySelectorAll(".select__dropdown__optionBlock__option");
  //   // let dropdown__optionBlock = document.querySelector(".select__dropdown__option-block");
  //   if (items.length !== 0) {
  //     console.log(items.length);
  //     if (_params.type === TYPE_DEFAULT) {
  //       dropdown__optionBlock.remove();

  //       for (let i = 0; i < items.length; i++) {
  //         let dropdown__optionBlock = _create('div', dropdown__optionBlock, {
  //           className: "select__dropdown__option-block"
  //         });
  //         let select__dropdown__optionBlock__option = _create("span", dropdown__optionBlock, {
  //           href: "custom",
  //           innerHTML: `${items[i].name}`,
  //           className: "select__dropdown__option-block__option"
  //         });
  //         select__dropdown__optionBlock__option.addEventListener("click", function () {
  //           document.querySelector(".button-wrapper__button-text").innerHTML = `${items[i+1].name}`;
  //           select__dropdown.style.display = "none";
  //           document.querySelector(".buttonWrapper__buttonArrow").style.transform = "rotate(0.5turn)";
  //           // _renderDropdown();

  //           document.querySelector("#select__dropdown__search").value = "";
  //         });
          
  //       }
  //     } 

  //     if (_params.type === TYPE_MULTI) {
  //       dropdown__optionBlock.style.display = "none";
  //       let select__dropdown__optionBlock__option = _create('div', select__dropdown, {
  //         className: "select__dropdown__option-block__option"
  //       });
  //       for (let i = 0; i < items.length; i++) {
  //         const select__dropdown__optionBlock__option = _create('div', dropdown__optionBlock, {
  //           className: `select__dropdown__option-block__option`
  //         });
  //         select__dropdown__optionBlock__option.addEventListener("click", function () {
  //           document.querySelector(".button-wrapper__button-text").innerHTML = `${items[i].name}`;
  //           select__dropdown.style.display = "none";
  //           document.querySelector(".buttonWrapper__buttonArrow").style.transform = "rotate(0.5turn)";
  //           _renderDropdown();
  //           document.querySelector("#select__dropdown__search").value = "";
  //         });
  //         const option = _create("span", select__dropdown__option-block__option, {
  //           href: "custom",
  //           innerHTML: `${items[i].name}`,
  //           className: "select__dropdown__option-block__option"
  //         });
  //       }
  //       const select__optionSelect__dropdown__optionBlock__submit = _create("buttonWrapper__buttonText", dropdown__optionBlock, {
  //         innerHTML: "Submit",
  //         className: "select__dropdown__option-block__submit"
  //       });
  //       select__optionSelect__dropdown__optionBlock__submit.addEventListener("click", function () {
  //         select__dropdown.style.display = "none";
  //         let checkboxes = document.querySelectorAll(".check");
  //         document.querySelector(".select__dropdown__search").value = "";
  //         for (let i = 0; i < checkboxes.length; i++) {
  //           checkboxes[i].checked = false;

  //         }
  //       });
  //     }

  //   } else if (items.length === 0) {
  //     // document.querySelector(".select__dropdown__optionBlock__submit") ? document.querySelector(".select__dropdown__optionBlock__submit").remove() : console.log("j");
  //     let dropdown__optionBlock = document.querySelector(".select__dropdown__option-block");

  //     dropdown__optionBlock ? dropdown__optionBlock.remove(): false;
      
  //   }

  // }

  function _hideSeek() {
    select__dropdown.addEventListener('click', event => event.stopPropagation());
    document.addEventListener('click', function() {
      select__dropdown.className.includes("select__dropdown_hide") ? false : toggle();
      _onChange(arrayValues);
       let search = document.querySelector(".select__dropdown__search");

        search.value = "";
        let buttonText = document.querySelector(".button-wrapper__button-text");
        const checkboxes = document.querySelectorAll(".select__container-checkbox__checkbox");
        // for (let i = 0; i < arrayValues.length; i++) {
        //   if (arrayValues) {
            
        //   }
        // }
        checkboxValues = [...arrayValues];
        _options();

    });
  }

  function _render() {
    _selector.appendChild(_createButton());
    _selector.appendChild(select__dropdown);
    _anchor.parentNode.replaceChild(_selector, _anchor);
  }

  let dropdown__optionBlock = document.querySelector(".select__dropdown__option-block"); 

  function init(cssSelector, params) {
    _anchor = document.querySelector(cssSelector);

  

    if (_anchor instanceof HTMLElement) {

      initializeParams(params);
      console.log(_params);

      _search();
       _create('div', select__dropdown, {
        className: "select__dropdown__option-block"
      });
      console.log(_anchor);

      _options();
      _hideSeek();

      _render();
    } else {
      console.error('Anchor not found');
    }
  }

  function toggle(event) {
    event === undefined ? false :event.stopPropagation();
    document.querySelector(".button-wrapper__button-arrow").classList.toggle("select__arrow_down");
    select__dropdown.classList.toggle("select__dropdown_hide");
  }


  return init;

})();

// {
//   _items = []
//   _params = {}

//   selectedValue = 'string' || ['string'];
//   checkedValues = [];

//   select = element
//   dropdown = element
//   optionBLock = element

//   _initialRender() {
//     renderSearch();
//     renderOptions();
//     renderControls();
//   };

//   // _toggleDropdown() {
//   //   if (open) {
//   //     checkedValues = selectedValues
//   //     dropdown.addClass('visible');
//   //   } close {
//   //     _searchValue = '';
//   //     _selectedValues = checkedValues;
//   //     checkedValues();
//   //     onChange();
//   //     dropdown.removeClass('visible');
//   //   }
//   // };

//   _submitValues() {
//     _selectedValues = checkedValues;
//     onChange();
//   }

//   _openDropdown();
//   _closeDropdown() {
//     dropdown.removeClass('visible');
//   };

//   _renderControls();
//   _renderOption();
//   _handleSearch();

// }