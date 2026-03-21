let stddata = [], clsdata = [];
const displayTable = (_arr) => {
    let html = '';
    let i = 1;
    stddata.sort((a, b) => {
        if (a.Name > b.Name) return 1;
        else return -1;
    });
    _arr.forEach(element => {
        html += `<tr>
                    <th scope="row">${i++}</th>
                    <td>${element.Name}</td>
                    <td>${element.ID}</td>
                    <td class="">
                        <button type="button" class="btn btn-warning" data-id="${element.ID}">Edit</button>
                        <button type="button" class="btn btn-danger" data-id="${element.ID}">Delete</button>
                    </td>
                </tr>`;
    });
    document.querySelector('.table tbody').innerHTML = html;
}
const selectClass = () => {
    document.querySelectorAll('.sidebar ul li').forEach((element) => {
        element.addEventListener('click', () => {
            let a = [];
            stddata.forEach(element1 => {
                if (element1.Class == element.textContent) a.push(element1);
            });
            a.sort((a, b) => {
                if (a.Name > b.Name) return 1;
                else return -1;
            });
            displayTable(a);
        });
    });
}

document.querySelector('.btn-primary').addEventListener('click', () => {
    let id = document.getElementById('stdid').value;
    const studentTarget = stddata.find(s => s.ID === id);
    if (studentTarget) {
        update(studentTarget);
    }
    else {
        add();
    }
});
const update = (studentTarget) => {
    studentTarget.Name = document.getElementById('stdname').value;
    studentTarget.Class = document.getElementById('stdclass').value;
    studentTarget.Email = document.getElementById('stdemail').value;
    displayTable(stddata);
}
const add = () => {
    stddata.unshift({
        ID: document.getElementById('stdid').value
        , Name: document.getElementById('stdname').value
        , Email: document.getElementById('stdemail').value
        , Class: document.getElementById('stdclass').value
    });
    displayTable(stddata);
}
document.querySelector('.table tbody').addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.classList.contains('btn-warning')) {
        const id = e.target.dataset.id;
        studentTarget = stddata.find(s => s.ID === id);
        update(studentTarget);
    }

    if (e.target.classList.contains('btn-danger')) {
        const id = e.target.dataset.id;
        stddata = stddata.filter(s => s.ID !== id);
        displayTable(stddata);
    }
});
const getData = async () => {
    const stdurl = 'http://45.32.46.181/getdata-student.php?Type=Student';
    const clsurl = 'http://45.32.46.181/getdata-student.php?Type=Class';

    const response = await fetch(stdurl);
    if (!response.ok) throw new Error(response.status);
    stddata = await response.json();
    console.log(stddata);

    const response1 = await fetch(clsurl);
    if (!response1.ok) throw new Error(response1.status);
    clsdata = await response1.json();
    console.log(clsdata);

    let clshtml = '',option = '';
    clsdata.forEach(element => {
        clshtml += `<li>${element}</li>`;
        option += `<option value="${element}">${element}</option>`;
    });
    displayTable(stddata);
    document.querySelector('.sidebar ul').innerHTML = clshtml;
    document.querySelector('#stdclass').innerHTML = option;
    selectClass();
}
document.addEventListener('DOMContentLoaded', () => {
    getData();
});