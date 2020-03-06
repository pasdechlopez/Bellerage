const superSelector = (function () {

  'use strict';

  const body = document.querySelector('body');
  const TYPE_MULTI = "multi";
  const TYPE_DEFAULT = "default"; //type to options block 
  const TYPE_INPUT = "input";

  let _anchor = null; //link to the user's html node 
  let _wrapper = null;
  let _selector = null;
  let _dropdown = null;
  let _searchInput = null;
  let _optionsContainer = null;

  let _dropdownOpen = true;

  let arrayValues = []; //submitted values
  let checkboxValues = []; //clicked values

  const DEFAULT_PARAMS = {
    type: TYPE_DEFAULT,
    autoApply: false
  };


  let _items = [];
  let _classes = {};
  let _onChange = () => {};
  let _params = DEFAULT_PARAMS; //default params

  // parses html for an option block' text and value 
  function parseAnchorElement() { 
    if (_anchor instanceof HTMLSelectElement) {
      for (let i = 0; i < _anchor.children.length; i++) {
        if (_anchor.children[i] instanceof HTMLOptionElement) {
          _items.push({
            name: _anchor.children[i].innerHTML,
            value: _anchor.children[i].getAttribute("value")
          })
        }
      }

      return _items
    } else {
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

  //validation of user's params
  function _initializeParams(params = {}) {
    if (typeof params === 'object' && !Array.isArray(params)) {
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

  //creates an element required
  function _create(tag, parent, params = {}) {
    const element = document.createElement(tag);

    if (typeof params === 'object' && !Array.isArray(params)) {
      for (const key in params) {
        element[key] = params[key];
      }
    } else {
      console.warn("Wrong parameters");
    }

    parent && parent.appendChild(element);

    return element;
  };

 //creates UI button element with a moving arrow (status indicator)
  function _createSelector() {

    _selector = _create("div", null, {
      className: "button-wrapper"
    });

    const buttonWrapper__buttonText = _create("div", _selector, {
      className: "button-wrapper__button-text"
    });

    _create("span", buttonWrapper__buttonText, {
      innerHTML: "Не выбрано"
    });

    const buttonWrapper__buttonArrow = _create("div", _selector, {
      className: "button-wrapper__button-arrow"
    });

    _create("img", buttonWrapper__buttonArrow, {
      className: "button-wrapper__button-arrow-img",
      src: "/files/arrow.png"
    });

    _selector.onclick = toggle;
  };

  //creates a list of blocks of options elements  
  function _optionsCreate(items = _items) {
    _optionsContainer.innerHTML = "";
    if (_params.type === TYPE_DEFAULT) {
      for (let i = 0; i < items.length; i++) {
        const optionBlock__option = _create('div', _optionsContainer, {
          className: "select__dropdown__option-block__option",
        });
        optionBlock__option.addEventListener("click", function () {
          document.querySelector(".button-wrapper__button-text").innerHTML = `${items[i].name}`;
        });
        const option = _create("span", optionBlock__option, {
          href: "custom",
          innerHTML: `${items[i].name}`,
          className: "option"
        });
      }

    } else if (_params.type === TYPE_MULTI) {
      for (let i = 0; i < items.length; i++) {
        const optionBlock__option = _create('div', _optionsContainer, {
          className: "select__dropdown__option-block__option"
        });

        const select__checkboxLabel = _create("label", optionBlock__option, {
          className: "select__container-checkbox"
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
        _create("span", optionBlock__option, {
          href: "custom",
          innerHTML: `${items[i].name}`,
          className: "option"
        });
        checkbox.checked = checkboxValues.includes(items[i].value);
        optionBlock__option.addEventListener("click", function () {
          checkbox.checked ? checkbox.checked = false : checkbox.checked = true;
          checkboxValues = checkboxValues.includes(items[i].value) ? checkboxValues.filter(value => items[i].value !== value) : [...checkboxValues, items[i].value];
        });
      }
      _createSubmit()
    }
    return;
  }

  
//creates submit button
  function _createSubmit(items = _items) {
    let optionBlock__submit = _create("button", _optionsContainer, {
      innerHTML: "Submit",
      className: "select__dropdown__option-block__submit"
    });
    optionBlock__submit.addEventListener("click", function () {
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
      _onChange(arrayValues)
    })
  }

  function _createSearchInput() {
    _searchInput = _create("input", _dropdown, {
      type: "text",
      placeholder: "Search..",
      className: "select__dropdown__search hide",
      id: "select__dropdown__search",
      oninput: _filterItems
    });
  }

  function _filterItems(event) {
    const searchValue = event.target.value;
    let itemsToRender = undefined;

    if (searchValue) {
      const searchRegEx = new RegExp(`^${searchValue}`, 'i');

      itemsToRender = _items.filter((item, index) => {
        const {
          name
        } = item;
        return searchRegEx.test(name);
      })
    }

    _optionsCreate(itemsToRender);
  }

  function _addDropdownCloseListeners() {
    _dropdown.addEventListener('click', event => event.stopPropagation())
    document.addEventListener('click', _closeDropdown)
  }

  function _createWrapper() {
    _wrapper = _create('div', body, {
      className: 'tds'
    })
  }

  function _createOptions() {
    _optionsContainer = _create('div', _dropdown, {
      className: 'select__dropdown__option-block'
    })

    _optionsCreate()
  }

  function _createDropdown() {
    _dropdown = _create('div', _wrapper, {
      className: 'select__dropdown'
    })

    _createSearchInput()
    _createOptions()
    _addDropdownCloseListeners()
  }

  function _initializeSelector() {
    _createWrapper()
    _createSelector()
    _createDropdown()
  }

  function _render() {
    _wrapper.appendChild(_selector)
    _wrapper.appendChild(_dropdown)
    _anchor.parentNode.replaceChild(_wrapper, _anchor)
  }

  function init(cssSelector, params) {
    _anchor = document.querySelector(cssSelector);

    if (_anchor instanceof HTMLElement) {
      _initializeParams(params)
      _initializeSelector()
      _render()
    } else {
      console.error('Anchor not found')
    }
  }

  function _openDropdown() {
    document.querySelector(".button-wrapper__button-arrow").classList.remove("select__arrow_down")
    _dropdown.classList.remove("select__dropdown_hide")
    _dropdownOpen = true
    _optionsCreate()
  }

  function _closeDropdown() {
    document.querySelector(".button-wrapper__button-arrow").classList.add("select__arrow_down")
    _dropdown.classList.add("select__dropdown_hide")

    _searchInput.value = ''

    if (_params.type === TYPE_MULTI) {
      checkboxValues = [...arrayValues]
      _params.autoApply && _onChange(arrayValues)
    }

    _dropdownOpen = false
  }

  function toggle(event) {
    event && event.stopPropagation();
    _dropdownOpen ? _closeDropdown() : _openDropdown();
  }

  return init

})();