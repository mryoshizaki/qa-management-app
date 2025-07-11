let testCases = [];

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
}