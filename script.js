let students = [];
let filteredStudents = [];

let area = document.getElementById('search-area');
const searching = document.getElementById('search-button');

window.onload = async function () {
    await fetchData();
    renderTable(students);
};

async function fetchData() {
    const response = await fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json');
    students = await response.json();
    filteredStudents = [...students];
}


function sortfuction(criteria) {
    switch (criteria) {
        case 'asc':
            filteredStudents.sort((a, b) => (a.first_name + ' ' + a.last_name).localeCompare(b.first_name + ' ' + b.last_name));
            break;
        case 'dec':
            filteredStudents.sort((a, b) => (b.first_name + ' ' + b.last_name).localeCompare(a.first_name + ' ' + a.last_name));
            break;
        case 'marks':
            filteredStudents.sort((a, b) => a.marks - b.marks);
            break;
        case 'passing':
            filteredStudents = students.filter(student => student.passing);
            break;
        case 'class':
            filteredStudents.sort((a, b) => a.class - b.class);
            break;
        case 'gender':
            const males = filteredStudents.filter(student => student.gender === 'Male');
            const females = filteredStudents.filter(student => student.gender === 'Female');
            renderTable(males);
            renderTable(females, true);
            return;
    }
    renderTable(filteredStudents);
}


function handlesearch() {
    const searchTerm = area.value.toLowerCase();
    filteredStudents = students.filter(student => 
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredStudents);
}

function renderTable(data) {
    const tableContainer = document.getElementById('table-container');
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>Gender</td>
                    <td>Class</td>
                    <td>Marks</td>
                    <td>Passing</td>
                    <td>Email</td>
                </tr>
            </thead>
            <tbody>
                ${data.map(student => `
                    <tr>
                        <td>${student.id}</td>
                        <td><img src="${student.img_src}" alt="Avatar">${student.first_name} ${student.last_name}</td>
                        
                        <td>${student.gender}</td>
                        <td>${student.class}</td>
                        <td>${student.marks}</td>
                        <td>${student.passing ? 'Passing' : 'Failed'}</td>
                        <td>${student.email}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    tableContainer.innerHTML = tableHTML;
}

function renderTable(data, append = false) {
    const tableContainer = document.getElementById('table-container');
    let tableHTML = `
    <table>
        <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Gender</td>
                <td>Class</td>
                <td>Marks</td>
                <td>Passing</td>
                <td>Email</td>
            </tr>
        </thead>
        <tbody>
            ${data.map(student => `
                <tr>
                    <td>${student.id}</td>
                    <td><img src="${student.img_src}" alt="Avatar">${student.first_name} ${student.last_name}</td>
                    
                    <td>${student.gender}</td>
                    <td>${student.class}</td>
                    <td>${student.marks}</td>
                    <td>${student.passing ? 'Passing' : 'Failed'}</td>
                    <td>${student.email}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
    `;
    if (append) {
        tableContainer.innerHTML += tableHTML;
    } else {
        tableContainer.innerHTML = tableHTML;
    }
}




