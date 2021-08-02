const products = document.querySelector("#products");
const orders = document.querySelector("#orders");
const package = document.querySelector("#package");
const accounting = document.querySelector("#accounting");
const terminal = document.querySelector("#terminal");
const totalPrice = document.querySelector("#total-price");
const summary = document.querySelector("#summary");

const calculate = () => {
    const productsPrice = +products.value;
    const ordersPrice = +orders.value;
    const accountingPrice = accounting.checked ? 30 : 0;
    const terminalPrice = terminal.checked ? 5 : 0;

    let packagePrice;
    const packageValue = package.dataset.value;

    switch (packageValue) {
        case "basic":
            packagePrice = 0;
            break;
        case "professional":
            packagePrice = 25;
            break;
        case "premium":
            packagePrice = 60;
            break;
        default:
            packagePrice = 0;
    }

    const sum = (productsPrice * 0.5) + (ordersPrice * 0.25) + accountingPrice + terminalPrice + packagePrice;
    totalPrice.querySelector(".total__price").innerHTML = `$${sum}`;
    summary.querySelectorAll(".open").length > 0 ? totalPrice.classList.add("open") : totalPrice.classList.remove("open");
}

const input = (el) => {
    const val = +el.value;
    const id = el.id;
    const li = document.querySelector(`li[data-id=${id}]`);
    const value = +li.dataset.calc;
    const calc = li.querySelector(".item__calc");
    const price = li.querySelector(".item__price");

    li.classList.add("open");
    calc.innerHTML = `${val} * ${value}`;
    price.innerHTML = `$${val * value}`;

    if (val < 0) {
        calc.innerHTML = null;
        price.innerHTML = "Value should be greater than 0";
    }

    if (val === 0) li.classList.remove("open");

    calculate();
}

const checkbox = (el) => {
    const id = el.id;
    const li = document.querySelector(`li[data-id=${id}]`);

    el.checked ? li.classList.add("open") : li.classList.remove("open");

    calculate();
}

products.addEventListener("keyup", () => input(products));
products.addEventListener("change", () => input(products));
orders.addEventListener("keyup", () => input(orders));
orders.addEventListener("change", () => input(orders));
accounting.addEventListener("change", () => checkbox(accounting));
terminal.addEventListener("change", () => checkbox(terminal));

package.addEventListener("click", (e) => {
    package.classList.toggle("open");
    const li = document.querySelector(`li[data-id=package]`);
    li.classList.add("open");

    let value = e.target.dataset.value;
    const text = package.querySelector(".select__input");
    package.dataset.value = value;
    text.innerHTML = (value === undefined) ? "Choose package" : value;

    const calc = li.querySelector(".item__calc");
    const price = li.querySelector(".item__price");

    switch (value) {
        case "basic":
            calc.innerHTML = value;
            price.innerHTML = "$0";
            break;
        case "professional":
            calc.innerHTML = value;
            price.innerHTML = "$25";
            break;
        case "premium":
            calc.innerHTML = value;
            price.innerHTML = "$60";
            break;
        default:
            calc.innerHTML = null;
            price.innerHTML = "Choose package";
    }

    calculate();
})