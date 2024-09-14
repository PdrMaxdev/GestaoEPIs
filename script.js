document.addEventListener('DOMContentLoaded', () => {
    const equipmentForm = document.getElementById('equipmentForm');
    const collaboratorForm = document.getElementById('collaboratorForm');
    const userForm = document.getElementById('userForm');
    const loanForm = document.getElementById('loanForm');
    const returnForm = document.getElementById('returnForm');
    
    const equipmentTable = document.getElementById('equipmentTable').getElementsByTagName('tbody')[0];
    const collaboratorTable = document.getElementById('collaboratorTable').getElementsByTagName('tbody')[0];
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    const loanTable = document.getElementById('loanTable').getElementsByTagName('tbody')[0];
    const returnTable = document.getElementById('returnTable').getElementsByTagName('tbody')[0];

    let editingId = null;
    let editingType = null;

    equipmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const equipment = {
            id: document.getElementById('equipmentId').value,
            name: document.getElementById('equipmentName').value,
            expiry: document.getElementById('equipmentExpiry').value
        };
        saveData('equipment', equipment);
        loadTableData('equipment', equipmentTable, ['id', 'name', 'expiry']);
        equipmentForm.reset();
        editingId = null;
        editingType = null;
    });

    collaboratorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const collaborator = {
            id: document.getElementById('collaboratorId').value,
            name: document.getElementById('collaboratorName').value
        };
        saveData('collaborator', collaborator);
        loadTableData('collaborator', collaboratorTable, ['id', 'name']);
        collaboratorForm.reset();
        editingId = null;
        editingType = null;
    });

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = {
            id: document.getElementById('userId').value,
            name: document.getElementById('userName').value,
            password: document.getElementById('userPassword').value
        };
        saveData('user', user);
        loadTableData('user', userTable, ['id', 'name']);
        userForm.reset();
        editingId = null;
        editingType = null;
    });

    loanForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const loan = {
            equipmentId: document.getElementById('loanEquipmentId').value,
            collaboratorId: document.getElementById('loanCollaboratorId').value,
            date: document.getElementById('loanDate').value
        };
        saveData('loan', loan);
        loadTableData('loan', loanTable, ['equipmentId', 'collaboratorId', 'date']);
        loanForm.reset();
        editingId = null;
        editingType = null;
    });

    returnForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const returnedItem = {
            equipmentId: document.getElementById('returnEquipmentId').value,
            collaboratorId: document.getElementById('returnCollaboratorId').value,
            date: document.getElementById('returnDate').value
        };
        saveData('return', returnedItem);
        loadTableData('return', returnTable, ['equipmentId', 'collaboratorId', 'date']);
        returnForm.reset();
        editingId = null;
        editingType = null;
    });

    function saveData(type, data) {
        let storedData = JSON.parse(localStorage.getItem(type)) || [];
        const index = storedData.findIndex(item => item.id === data.id);
        if (index > -1) {
            storedData[index] = data;
        } else {
            storedData.push(data);
        }
        localStorage.setItem(type, JSON.stringify(storedData));
    }

    function loadTableData(type, table, columns) {
        table.innerHTML = '';
        let data = JSON.parse(localStorage.getItem(type)) || [];
        data.forEach(item => {
            const row = table.insertRow();
            columns.forEach(col => {
                row.insertCell().textContent = item[col];
            });

            const actionsCell = row.insertCell();
            actionsCell.classList.add('action-buttons');

            // Edit button
            const updateButton = document.createElement('button');
            updateButton.textContent = 'Atualizar';
            updateButton.classList.add('update-button');
            updateButton.addEventListener('click', () => startEditing(type, item));
            actionsCell.appendChild(updateButton);

            // Delete button
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.classList.add('action-button');
            deleteButton.addEventListener('click', () => deleteData(type, item.id));
            actionsCell.appendChild(deleteButton);
        });
    }

    function deleteData(type, id) {
        let data = JSON.parse(localStorage.getItem(type)) || [];
        data = data.filter(item => item.id !== id);
        localStorage.setItem(type, JSON.stringify(data));
        loadTableData(type, getTableByType(type), getColumnsByType(type));
    }

    function startEditing(type, item) {
        editingType = type;
        editingId = item.id;
        const form = document.getElementById(`${type}Form`);
        Object.keys(item).forEach(key => {
            if (form.elements[key]) {
                form.elements[key].value = item[key];
            }
        });
    }

    function getTableByType(type) {
        switch (type) {
            case 'equipment': return equipmentTable;
            case 'collaborator': return collaboratorTable;
            case 'user': return userTable;
            case 'loan': return loanTable;
            case 'return': return returnTable;
        }
    }

    function getColumnsByType(type) {
        switch (type) {
            case 'equipment': return ['id', 'name', 'expiry'];
            case 'collaborator': return ['id', 'name'];
            case 'user': return ['id', 'name'];
            case 'loan': return ['equipmentId', 'collaboratorId', 'date'];
            case 'return': return ['equipmentId', 'collaboratorId', 'date'];
        }
    }

    // Load data on page load
    loadTableData('equipment', equipmentTable, ['id', 'name', 'expiry']);
    loadTableData('collaborator', collaboratorTable, ['id', 'name']);
    loadTableData('user', userTable, ['id', 'name']);
    loadTableData('loan', loanTable, ['equipmentId', 'collaboratorId', 'date']);
    loadTableData('return', returnTable, ['equipmentId', 'collaboratorId', 'date']);
});
