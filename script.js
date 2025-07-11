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

function saveTest(){

}