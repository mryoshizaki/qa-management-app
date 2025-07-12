let testCases = [];

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

    console.log ('loading', testCases);
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
        created: new Date().toISOString()
    }

    testCases.push(testCase);

    localStorage.setItem('qaTests', JSON.stringify(testCases));

    renderTestCases();
}

function renderTestCases(){
    const testList = document.getElementById('testList');

    if(testCases.length == 0){
        testList.innerHTML = '<div class="empty-state"><h3>No test cases yet</h3></div>';
    }

    testList.innerHTML = testCases.map(test => `
        <div class="item">
            <h3>${test.title}</h3>
            <p><strong>System:</strong> ${test.system || 'Not specified'}</p>
            <p><strong>Version:</strong> ${test.systemVersion || 'Not specified'}</p>
            <p><strong>Type:</strong> ${test.type.toUpperCase()}</p>
            <p><strong>Priority:</strong> ${test.priority}</p>
            <p><strong>Status:</strong> <span class="status ${test.status}">${test.status}</span></p>
            <p><strong>Description:</strong> ${test.description || 'No description'}</p>
            <p><strong>Steps:</strong> ${test.steps || 'No steps'}</p>
            <p><strong>Expected Result:</strong> ${test.expected || 'No expected result'}</p>
            <div class="item-actions">
                <button class="btn btn-success" onclick="updateTestStatus(${test.id}, 'pass')">Pass</button>
                <button class="btn btn-danger" onclick="updateTestStatus(${test.id}, 'fail')">Fail</button>
                <button class="btn" onclick="editTest(${test.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteTest(${test.id})">Delete</button>
            </div>
        </div>
    `).join('');
}