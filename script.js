
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const department = document.getElementById("department");
const marksInput = document.getElementById("marks");
const studentTable = document.getElementById("studentTable");
const totalStudents = document.getElementById("totalStudents");
const searchInput = document.getElementById("searchInput");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editId = null;

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

function displayStudents(list = students) {
    studentTable.replaceChildren();

    list.forEach(function (student) {
        const row = document.createElement("tr");

        [student.name, student.department, student.marks].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.type = "button";
        editButton.addEventListener("click", function () {
            editStudent(student.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.type = "button";
        deleteButton.addEventListener("click", function () {
            deleteStudent(student.id);
        });

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);
        studentTable.appendChild(row);
    });

    totalStudents.textContent = students.length;
}

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const dept = department.value.trim();
    const marks = Number(marksInput.value);

    if (!name || !dept || marksInput.value === "" ||
        !Number.isFinite(marks) || marks < 0 || marks > 100) {
        alert("Enter valid details. Marks must be between 0 and 100.");
        return;
    }

    if (editId !== null) {
        const student = students.find(function (item) {
            return item.id === editId;
        });

        if (student) {
            student.name = name;
            student.department = dept;
            student.marks = marks;
        }

        editId = null;
    } else {
        students.push({
            id: Date.now().toString() + Math.random().toString(16).slice(2),
            name: name,
            department: dept,
            marks: marks
        });
    }

    saveStudents();
    displayStudents();
    studentForm.reset();

    const submitButton = studentForm.querySelector('button[type="submit"]');
    submitButton.textContent = "Add Student";
});

function editStudent(id) {
    const student = students.find(function (item) {
        return item.id === id;
    });

    if (!student) return;

    studentName.value = student.name;
    department.value = student.department;
    marksInput.value = student.marks;
    editId = id;

    studentForm.querySelector('button[type="submit"]').textContent = "Update Student";
    studentName.focus();
}

function deleteStudent(id) {
    const confirmed = confirm("Are you sure you want to delete this student?");

    if (!confirmed) return;

    students = students.filter(function (student) {
        return student.id !== id;
    });

    if (editId === id) {
        editId = null;
        studentForm.reset();
        studentForm.querySelector('button[type="submit"]').textContent = "Add Student";
    }

    saveStudents();
    displayStudents();
}

searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim().toLowerCase();

    const filteredStudents = students.filter(function (student) {
        return student.name.toLowerCase().includes(query) ||
               student.department.toLowerCase().includes(query);
    });

    displayStudents(filteredStudents);
});

displayStudents();
