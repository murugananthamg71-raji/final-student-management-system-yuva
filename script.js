
const studentForm = document.getElementById("studentForm");
const studentName = document.getElementById("studentName");
const department = document.getElementById("department");
const marks = document.getElementById("marks");
const studentList = document.getElementById("studentList");
const totalStudents = document.getElementById("totalStudents");

let students = [];

studentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = studentName.value.trim();
    const dept = department.value.trim();
    const mark = Number(marks.value);

    if (name === "" || dept === "") {
        alert("Please fill in all fields.");
        return;
    }

    if (marks.value === "" || mark < 0 || mark > 100) {
        alert("Marks must be between 0 and 100.");
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        department: dept,
        marks: mark
    };

    students.push(student);

    displayStudents();
    studentForm.reset();
});

function displayStudents() {
    studentList.replaceChildren();

    students.forEach(function (student) {
        const row = document.createElement("tr");

        [student.name, student.department, student.marks].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function () {
            students = students.filter(function (item) {
                return item.id !== student.id;
            });

            displayStudents();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        studentList.appendChild(row);
    });

    totalStudents.textContent = students.length;
}

console.log("Student Management System is ready!");
