var colorPalette = document.getElementById('color-palette');

let currentElem;

function getColor() {
    colorPalette.innerHTML = "";
    for (let i = 1; i <= 24; i++) {
        let color = generateColor();
        let li = document.createElement('li');
        let a = document.createElement('a');
        let input = document.createElement('input');
        let colorSpan = document.createElement('span');
        colorSpan.className = "color";

        input.value = color;
        input.name = 'color';

        colorSpan.style.setProperty('--color', color);
        let textSpan = document.createElement('span');
        textSpan.className = "text";
        textSpan.innerText = color;
        li.appendChild(colorSpan)
        li.appendChild(textSpan);
        li.appendChild(input);
        colorPalette.appendChild(li);

        li.addEventListener('click', (e) => {
            let targetInput = e.target.parentNode.querySelector('input[name="color"]');
            targetInput.select();
            document.execCommand('copy');
            notification('Color <b>' + targetInput.value + '</b> copied to your clipboard')
            document.body.style.backgroundColor = targetInput.value;
            setTimeout(() => document.body.style.backgroundColor = "#fff", 2000);
        })

        li.addEventListener('mouseover', (e) => {
            currentElem = e.target.parentNode;
            console.log(currentElem);
        })

    }
}

function notification(msg) {
    let old_div = document.querySelector('.alert');
    if (old_div) {
        old_div.parentNode.removeChild(old_div);
    }
    let div = document.createElement('div');
    div.className = 'alert';
    div.innerHTML = msg;
    document.body.appendChild(div);

    setTimeout(() => div.classList.add('active'), 1);
    setTimeout(() => div.classList.remove('active'), 1000)
}

function generateColor() {
    let str = "abcdef0123456789";
    let color = '#';
    for (let i = 0; i <= 5; i++) {
        color += str[Math.floor(Math.random() * str.length)]
    }
    return color;
}

window.addEventListener('keypress', (e) => {
    if (e.keyCode === 32) {
        getColor();
    } else if (e.keyCode === 99 && currentElem) {
        let targetInput = currentElem.querySelector('input[name="color"]');
        targetInput.select();
        document.execCommand('copy');
        notification('Color <b>' + targetInput.value + '</b> copied to your clipboard');
    }
    e.preventDefault();



})

getColor()