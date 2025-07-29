let testCases = [];
let uid = null;

// Initialize app
window.addEventListener('DOMContentLoaded', function() {
    loadData();
    renderTestCases();
});

function loadData(){
    const savedTests = localStorage.getItem('qaTests');

    if (savedTests) {
        testCases = JSON.parse(savedTests);
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
    
    console.log(uid);
    localStorage.setItem('qaTests', JSON.stringify(testCases));

    renderTestCases();
    clearTestForm();
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
    // console.log(uid);
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