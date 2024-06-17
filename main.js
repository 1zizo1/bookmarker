let bookName = document.getElementById('bookmarkName')
let bookUrl = document.getElementById('URL')
let searchInput = document.getElementById('searchInput')
let errorBox = document.getElementById('errorBox')
let closeBtn = document.getElementById('closeBtn')
// 
let addbtn = document.getElementById('addBtn')
let updatebtn = document.getElementById('updateBtn')
let bookmarksContainer = []
if (localStorage.getItem('book')) {
    bookmarksContainer = JSON.parse(localStorage.getItem('book'))
    display()

}

addbtn.addEventListener('click', function(){
if(
        bookName.classList.contains('is-valid')&& bookUrl.classList.contains('is-valid')
){

    let bookmark = {
        name: bookName.value,
        url: bookUrl.value
    };
    bookmarksContainer.push(bookmark);
    localStorage.setItem('book', JSON.stringify(bookmarksContainer))
    clearInput()
    display()
}else{
        errorBox.classList.remove('d-none')
    }
})

function display() {
    var row = ''
    
    for (let i = 0; i < bookmarksContainer.length; i++) {
        var httpURL= 'https://'+ (bookmarksContainer[i].url);
        row += `
                <tr>
                    <td> ${i + 1} </td>
                    <td> ${bookmarksContainer[i].name} </td>
                    <td> <a href="${httpURL}" class="btn btn-success"> visit</a> </td>

                    <td> <button onclick="deleteItem(${i})" class="btn btn-danger"> Delete</button></td>
                    <td> <button onclick="setFormForUpdate(${i})" class="btn btn-warning"> Update</button></td>
                </tr>
                `
        document.getElementById('tableOfContent').innerHTML = row
        // if(bookmarksContainer.length==0){
        //     row=''
        // }
        
    }

}
function clearInput() {
    bookName.value = ''
    bookUrl.value = ''
    bookName.classList.remove('is-valid')
    bookUrl.classList.remove('is-valid')

}
function deleteItem(index) {
    bookmarksContainer.splice(index, 1)
    display()

    localStorage.setItem('book', JSON.stringify(bookmarksContainer))

    clearInput()
}

  
function search() {
    term = searchInput.value;
    row = ''
    for (var i = 0; i < bookmarksContainer.length; i++) {
        if (bookmarksContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            
            row += `
            <tr>
            <td> ${i + 1} </td>
            <td> ${bookmarksContainer[i].name} </td>
            <td> <a href="${bookmarksContainer[i].url}" class="btn btn-success"> visit</a> </td>
            <td> <button onclick="deleteItem(${i})" class="btn btn-danger"> Delete</button></td>
            <td> <button onclick="setFormForUpdate(${i})" class="btn btn-warning"> Update</button></td>

            </tr>
            
            `
            document.getElementById('tableOfContent').innerHTML = row
        }
    }
}
var updatedIndex;
function setFormForUpdate(i) {
    updatedIndex = i;
    addbtn.classList.add('d-none');
    updatebtn.classList.remove('d-none');
    bookName.value = bookmarksContainer[i].name;
    bookUrl.value = bookmarksContainer[i].url;
}
function update() {
    addbtn.classList.remove('d-none');
    updatebtn.classList.add('d-none'); bookmarksContainer[updatedIndex].name = bookName.value;
    bookmarksContainer[updatedIndex].url = bookUrl.value;
    display()
    localStorage.setItem('book', JSON.stringify(bookmarksContainer))
    clearInput()

}
function validateInput(element) {
   
    var regex = {
        bookmarkName: /^([A-Z]|[a-z]|[0-9]){3,}$/,
        URL: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/

        
    }
    // var mystr = bookName.value
    if (regex[element.id].test(element.value) == 1) {
        console.log('match');
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return 1;

    }
  else {
        console.log('no match');
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        return 0;

    }
}
closeBtn.addEventListener('click',function(){
    errorBox.classList.add('d-none')
})