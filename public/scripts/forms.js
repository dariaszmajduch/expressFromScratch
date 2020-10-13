function selectedCheckboxesValues(formObj) {
    let selectedCheckboxesArr = [];
    formObj.forEach((attr) => {
        if (attr.checked === true ){
            selectedCheckboxesArr.push(attr.value)
        }
    });
    return selectedCheckboxesArr;
}

document.getElementById('addTaskForm')
    .addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        const body = JSON.stringify({
            taskName: form.elements.taskName.value,
            taskDescription: form.elements.taskDescription.value,
            isTaskStarted: form.elements.isTaskStarted.value,
            taskType: selectedCheckboxesValues(form.elements.taskType)
        });
        const headers = { 'Content-Type': 'application/json' };
        const container = document.getElementById('addTaskFormContainer');
        fetch('/api/add-task', { method: 'post', body, headers })
            .then(resp => {
                if(resp.status < 200 || resp.status >= 300)
                    throw new Error('Request failure');
                return resp.json()
            })
            .then(json => {
                container.innerHTML = 'Task added'
            })
            .catch(err => {
                container.innerHTML = 'An error occurs'
            });
    });

document.getElementById('addNoteForm')
    .addEventListener('submit', event => {
        event.preventDefault();
        const form = event.target;
        const body = JSON.stringify({
            noteTitle: form.elements.noteTitle.value,
            noteDescription: form.elements.noteDescription.value,
        });
        const headers = { 'Content-Type': 'application/json' };
        const container = document.getElementById('addNoteFormContainer');
        fetch('/api/add-note', { method: 'post', body, headers })
            .then(resp => {
                if(resp.status < 200 || resp.status >= 300)
                    throw new Error('Request failure');
                return resp.json()
            })
            .then(json => {
                container.innerHTML = 'Note added'
            })
            .catch(err => {
                container.innerHTML = 'An error occurs'
            });
    });
