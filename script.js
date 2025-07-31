let testCases = [];
let bugReports = [];
let uid = null;

// Initialize app
window.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderTestCases();
    renderBugReports();
});

function loadData(){
    const savedTests = localStorage.getItem('qaTests');
    const savedBugs  = localStorage.getItem('qaBugs');

    if (savedTests) {
        testCases = JSON.parse(savedTests);
    }

    if (savedBugs) {
        bugReports = JSON.parse(savedBugs);
    }
}

function showSection(sectionId) {
    document.querySelector("body").addEventListener("click",function(e){
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(s => s.classList.remove('active'));
        
        document.getElementById(sectionId).classList.add('active');
        e.target.classList.add('active');
    });
}

function showTestForm(){
    document.getElementById('test-form').style.display = 'block';
}

function hideTestForm(){
    document.getElementById('test-form').style.display = '';
    clearTestForm();
}

function clearTestForm(){
    document.getElementById('testSystem').value = '';
    document.getElementById('testSystemVersion').value = '';
    document.getElementById('testTitle').value = '';
    document.getElementById('testDescription').value = '';
    document.getElementById('testType').value = 'web';
    document.getElementById('testPriority').value = 'low';
    document.getElementById('testSteps').value = '';
    document.getElementById('testExpected').value = '';
    uid = null;
}

function saveTest(){
    let title = document.getElementById('testTitle').value.trim();
    
    //Title autogeneration if empty
    if (!title){
        const testNumber = testCases.length + 1;
        title = `TC-${String(testNumber).padStart(3, '0')}`;
    }

    const testCase = {
        title,
        system: document.getElementById('testSystem').value,
        version: document.getElementById('testSystemVersion').value,
        description: document.getElementById('testDescription').value,
        type: document.getElementById('testType').value,
        priority: document.getElementById('testPriority').value,
        steps: document.getElementById('testSteps').value,
        expected: document.getElementById('testExpected').value,
        status: 'pending',
        uid: (uid === null) ? testCases.length : uid
    }
    
    if (uid === null){
        testCases.push(testCase);
    }else{
        testCases[uid] = testCase;
    }
    
    saveData();
    renderTestCases();
    hideTestForm();
}

function renderTestCases(){
    const testList = document.getElementById('testList');

    if(testCases.length === 0){
        testList.innerHTML = '<div class="empty-state"><h3>No test cases yet</h3></div>';
    }else{
        testList.innerHTML = testCases.map((test, index) => `
            <div class="item">
                <h3>${test.title}</h3>
                <p><strong>System:</strong> ${test.system || 'Not specified'}</p>
                <p><strong>Version:</strong> ${test.version || 'Not specified'}</p>
                <p><strong>Type:</strong> ${test.type.toUpperCase()}</p>
                <p><strong>Priority:</strong> ${test.priority}</p>
                <p><strong>Status:</strong> <span class="status ${test.status}">${test.status}</span></p>
                <p><strong>Description:</strong> ${test.description || 'No description'}</p>
                <p><strong>Steps:</strong> ${test.steps || 'No steps'}</p>
                <p><strong>Expected Result:</strong> ${test.expected || 'No expected result'}</p>
                <div class="item-actions">
                    <button class="btn btn-success" onclick="updateTestStatus(${index}, 'pass')">Pass</button>
                    <button class="btn btn-danger" onclick="updateTestStatus(${index}, 'fail')">Fail</button>
                    <button class="btn" onclick="editTest(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteTest(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function editTest(id){
    const test = testCases[id];
    uid = test.uid;
    if (test) {
        document.getElementById('testTitle').value = test.title;
        document.getElementById('testDescription').value = test.description;
        document.getElementById('testType').value = test.type;
        document.getElementById('testPriority').value = test.priority;
        document.getElementById('testSteps').value = test.steps;
        document.getElementById('testExpected').value = test.expected;
        document.getElementById('testSystem').value = test.system || '';
        document.getElementById('testSystemVersion').value = test.version || '';
        
        showTestForm();
    }
}

function updateTestStatus(id, status){
    const test = testCases[id];

    if (test) {
        test.status = status;
        saveData();
        renderTestCases();
    }
}

function deleteTest(id){
    if (confirm('Are you sure you want to delete this test case?')) {
        testCases.splice(id, 1);
        saveData();
        renderTestCases();
    }
}

function showBugForm(){
    document.getElementById('bug-form').style.display = 'block';
}

function hideBugForm(){
    document.getElementById('bug-form').style.display = '';
    clearBugForm();
}

function clearBugForm(){
    document.getElementById('bugSystem').value = '';
    document.getElementById('bugSystemVersion').value = '';
    document.getElementById('bugTitle').value = '';
    document.getElementById('bugDescription').value = '';
    document.getElementById('bugType').value = 'web';
    document.getElementById('bugSeverity').value = 'low';
    document.getElementById('bugSteps').value = '';
    document.getElementById('bugExpected').value = '';
    document.getElementById('bugActual').value = '';
    uid = null;
}

function saveBug(){
    let title = document.getElementById('bugTitle').value.trim();
    
    //Title autogeneration if empty
    if (!title){
        const bugNumber = bugReports.length + 1;
        title = `BR-${String(bugNumber).padStart(3, '0')}`;
    }

    const bugReport = {
        title,
        system: document.getElementById('bugSystem').value,
        version: document.getElementById('bugSystemVersion').value,
        description: document.getElementById('bugDescription').value,
        type: document.getElementById('bugType').value,
        severity: document.getElementById('bugSeverity').value,
        steps: document.getElementById('bugSteps').value,
        expected: document.getElementById('testExpected').value,
        actual: document.getElementById('bugActual').value,
        status: 'in-progress',
        uid: (uid === null) ? bugReports.length : uid
    }
    
    if (uid === null){
        bugReports.push(bugReport);
    }else{
        bugReports[uid] = bugReport;
    }
    
    saveData();
    renderBugReports();
    hideBugForm();
}

function renderBugReports(){
    const bugList = document.getElementById('bugList');

    if(bugReports.length === 0){
        bugList.innerHTML = '<div class="empty-state"><h3>No bug reports yet</h3></div>';
    }else{
        bugList.innerHTML = bugReports.map((bug, index) => `
            <div class="item">
                <h3>${bug.title}</h3>
                <p><strong>System:</strong> ${bug.system || 'Not specified'}</p>
                <p><strong>Version:</strong> ${bug.systemVersion || 'Not specified'}</p>
                <p><strong>Type:</strong> ${bug.type.toUpperCase()}</p>
                <p><strong>Priority:</strong> ${bug.severity}</p>
                <p><strong>Status:</strong> <span class="status ${bug.status}">${bug.status}</span></p>
                <p><strong>Description:</strong> ${bug.description || 'No description'}</p>
                <p><strong>Steps:</strong> ${bug.steps || 'No steps'}</p>
                <p><strong>Expected Result:</strong> ${bug.expected || 'No expected result'}</p>
                <p><strong>Actual Result:</strong> ${bug.actual || 'No expected result'}</p>
                <div class="item-actions">
                    <button class="btn btn-success" onclick="updateBugStatus(${index}, 'closed')">Closed</button>
                    <button class="btn btn-danger" onclick="updateBugStatus(${index}, 'in-progress')">In-progress</button>
                    <button class="btn" onclick="editBug(${index})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBug(${index})">Delete</button>
                </div>
            </div>
        `).join('');
    }
}

function editBug(id){
    const bug = bugReports[id];
    uid = bug.uid;
    if (bug) {
        document.getElementById('bugTitle').value = bug.title;
        document.getElementById('bugDescription').value = bug.description;
        document.getElementById('bugType').value = bug.type;
        document.getElementById('bugSeverity').value = bug.severity;
        document.getElementById('bugSteps').value = bug.steps;
        document.getElementById('bugExpected').value = bug.expected;
        document.getElementById('bugActual').value = bug.actual;
        document.getElementById('bugSystem').value = bug.system || '';
        document.getElementById('bugSystemVersion').value = bug.systemVersion || '';
        
        showBugForm();
    }
}

function updateBugStatus(id, status){
    const bug = bugReports[id];

    if (bug) {
        bug.status = status;
        saveData();
        renderBugReports();
    }
}

function deleteBug(id){
    if (confirm('Are you sure you want to delete this bug report?')) {
        bugReports.splice(id, 1);
        saveData();
        renderBugReports();
    }
}


function saveData(){
    localStorage.setItem('qaTests', JSON.stringify(testCases));
    localStorage.setItem('qaBugs', JSON.stringify(bugReports));
}