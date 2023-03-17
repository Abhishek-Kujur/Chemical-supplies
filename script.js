import supplies_constant from "./supplies.json" assert {type: 'json'};

let supplies = supplies_constant;
const table = document.createElement('table');
const keys = Object.keys(supplies[0]);
const sorted = keys.map(() => false);
const addBtn = document.querySelector('#add-button');
const formDiv = document.querySelector('.form');
const del = document.querySelector('#del-button');
const moveUp = document.querySelector('#move-up-button');
const moveDown = document.querySelector('#move-down-button');
const refresh = document.querySelector('#refresh-button');
const save = document.querySelector('#save-button');
let rowsSelected = [];
let updatedData = [];

//Save button functionality
save.addEventListener('click', () => {
    updatedData.map((value) => {
        supplies[value.rowIndex] = { ...supplies[value.rowIndex], [value.column]: value.value }
    });
});

//Refresh button functionality
refresh.addEventListener('click', () => {
    updatedData = [];
    renderTable();
})

//Delete button functionality
del.addEventListener('click', () => {
    supplies = supplies.filter((item, index) => !rowsSelected.includes(index));
    renderTable();
    rowsSelected = [];
});

//Move up button functionality
moveUp.addEventListener('click', () => {
    rowsSelected.sort();
    let minIndex = 0;
    rowsSelected.forEach((index) => {
        if (index === minIndex) {
            minIndex++;
        } else {
            [supplies[index], supplies[index - 1]] = [supplies[index - 1], supplies[index]];
        }
    });
    rowsSelected = [];
    renderTable();
});

//Move down button functionality
moveDown.addEventListener('click', () => {
    rowsSelected.sort().reverse();
    let maxIndex = supplies.length - 1;
    rowsSelected.forEach(index => {
        if (index === maxIndex) {
            maxIndex--;
        } else {
            [supplies[index], supplies[index + 1]] = [supplies[index + 1], supplies[index]];
        }
    });
    rowsSelected = [];
    renderTable();
});

//Add button functionality
addBtn.addEventListener('click', () => {
    formDiv.classList.toggle('add-row');
    formDiv.textContent = '';
    const form = document.createElement('div');
    form.classList.add('fields');

    keys.map(key => {
        const div = document.createElement('div');
        div.classList.add('field');
        const label = document.createElement('label');
        const input = document.createElement('input');
        label.textContent = key;
        // input.type = typeof (supplies[0][key]);
        input.placeholder = key;
        input.setAttribute('name', key);
        div.appendChild(label);
        div.appendChild(input);
        form.appendChild(div);
    });
    formDiv.appendChild(form);
    const submit = document.createElement('button');
    submit.classList.add('submit-btn');
    submit.textContent = 'Submit';
    formDiv.appendChild(submit);

    //Adding new row
    submit.addEventListener('click', () => {
        const childDivs = form.querySelectorAll('div');
        console.log(childDivs);
        const newRow = {};

        for (let i = 0; i < childDivs.length; i++) {
            const key = childDivs[i].children[1].name;
            const value = childDivs[i].children[1].value;
            newRow[key] = value;
        }
        supplies.unshift(newRow);
        renderTable(supplies);
        formDiv.classList.add('add-row');
    });
});


function renderTable() {
    table.textContent = '';
    table.className = 'ui celled table table-style';

    //Table Header
    const tHead = document.createElement("thead");
    tHead.classList.add('table-style');
    const header = document.createElement('tr');
    const select = document.createElement('th');
    const check = document.createElement('input');
    check.type = 'checkbox';
    select.appendChild(check);
    select.addEventListener('change', e => rowSelectAll(e));
    header.appendChild(select);
    keys.map((key, index) => {
        const dataCell = document.createElement('th');
        dataCell.setAttribute('indx', index);
        dataCell.addEventListener('click', (e) => compare(e));
        dataCell.textContent = key;
        header.appendChild(dataCell);
    });
    tHead.appendChild(header);
    table.appendChild(tHead);

    //Table Body
    const tBody = document.createElement('tbody');

    supplies.map((supply, indx) => {
        const row = document.createElement('tr');
        row.setAttribute('id', indx);
        const select = document.createElement('td');
        const check = document.createElement('input');
        check.type = 'checkbox';
        check.setAttribute('id', indx);
        select.appendChild(check);
        row.appendChild(select);
        check.addEventListener('change', e => rowSelect(e, indx));

        Object.keys(supply).map(key => {
            const dataCell = document.createElement('td');
            dataCell.addEventListener('dblclick', function () {
                this.contentEditable = true;
                this.focus();
            });
            dataCell.addEventListener('blur', (e) => updatedData.push(
                { rowIndex: indx, column: key, value: e.target.textContent }
            ));
            dataCell.innerText = supply[key];
            row.appendChild(dataCell);
        });
        tBody.appendChild(row);
    });

    table.appendChild(tBody);
    document.body.appendChild(table);
}

//Sorting Function
function compare(e) {
    const key = e.target.innerText;
    const indx = e.target.indx;

    supplies.sort((a, b) => a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0);
    if (sorted[indx]) {
        supplies.reverse()
        sorted[indx] = false;
    } else {
        sorted[indx] = true;
    }
    renderTable();
}

//Selecting rows
function rowSelect(e, indx) {
    const row = e.target.parentNode.parentNode;
    if (e.target.checked) {
        row.classList.add('selected');
        rowsSelected.push(indx);
    } else {
        row.classList.remove('selected');
        const selectAll = document.querySelector('thead input[type="checkbox"]');
        selectAll.checked = false;
        const index = rowsSelected.indexOf(indx);
        if (index > -1) rowsSelected.splice(index, 1);
    }
}

//Select all rows
function rowSelectAll(e) {
    const rows = document.querySelectorAll('tbody tr');
    if (e.target.checked) {
        rows.forEach((row, indx) => {
            row.classList.add('selected');
            rowsSelected.push(indx);
            row.children[0].children[0].checked = true;
        });
    } else {
        rows.forEach((row, indx) => {
            row.classList.remove('selected');
            row.children[0].children[0].checked = false;
            const index = rowsSelected.indexOf(indx);
            if (index > -1) rowsSelected.splice(index, 1);
        });
    }
}

renderTable();