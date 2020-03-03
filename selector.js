const body = document.querySelector('body');

function create (tag, parent, params = {}) {
    const element = document.createElement(tag);
    if (typeof params === "object" && !Array.isArray(params)) {
        for (key in params) {
            element[key] = params[key];
        }
    } 
    else {
        console.warn("Wrong parameters");
    }
    parent && parent.appendChild(element);
    return element;
}


function product(k) {
    const header = create('div', null, {className: "header"});
    const container = create('div', header, {className: "container"});

    create('div', container, {className: "product_rectangle", id: 'rectangle'});
    create('div', container, {className: "header_product", innerHTML: "Product name"});

    const product_list = create("ul", container, {className: "product_list"});

    for (i = 0; i < k; i++) {
        const li = create("li", product_list, );
        create("img", li, {src: "check_icon.png"});
        li.innerHTML += "&nbsp; Put on this page information about your product";
    }
    return header;
}
function options(n, color, width, height) {
    for (i = 1; i <= n; i++) {
        create("option", selector, {value: "i", innerHTML: "Hello", width: width, height: height});
    }
    return ;
}

function select() {
    
}



function renderPage() {
    document.body.appendChild(product(30000));
    document.body.appendChild(about(30000));
    document.body.appendChild(dignity(50000));
    document.body.appendChild(buy());
}

renderPage();






