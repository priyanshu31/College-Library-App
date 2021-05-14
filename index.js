class Book {
    constructor(bookName, authorName, contentType, bookNumber) {
        this.bookName = bookName;
        this.authorName = authorName;
        this.contentType = contentType;
        this.bookNumber = bookNumber;
    }
}

class Person {
    constructor(personName, bookName) {
        this.bookName = bookName;
        this.personName = personName;
    }
}

class Library {
    constructor(bookList) {
        this.bookList = bookList;
        this.user = [];
    }

    issueBook(person) {
        let flag = true;

        for (let i = 0; i < this.bookList.length; i++) {
            if (this.bookList[i].bookName == person.bookName) {
                flag = false;
                if (this.bookList[i].bookNumber > 0) {
                    this.bookList[i].bookNumber--;

                    this.user.push(person);
                    console.log(`${person.bookName} issued to ${person.personName}`);
                }
                else {
                    console.log(`${person.personName}, ${person.bookName} is not available in library`);
                }

                break;
            }
        }

        if (flag)
            console.log(`${person.personName}, ${person.bookName} is not available in library`);

    }

    Display() {
        this.user.forEach(element => {
            console.log(`${element.personName} has taken ${element.bookName}`);
        });
    }

    returnBook(personName, bookName) {
        let flag = true, i;
        for (i = 0; i < this.user.length; i++) {
            if (this.user[i].personName == personName) {
                flag = false;
                break;
            }
        }

        if (flag) {
            console.log(`${personName} has not taken any book from our library`);
            return;
        }

        flag = true;

        this.bookList.forEach(element => {
            if (element.bookName == bookName)
                element.bookNumber++, flag = false;
        });

        if (flag) {
            console.log(`Invalid Book Name`);
            return;
        }

        this.user.splice(i, 1);

        console.log(`${personName} thanks for returning the book ${bookName}`);
    }
}

displayTable();

document.getElementById("libForm").addEventListener("submit", (element) => {

    document.getElementById('alert').innerHTML = "";

    console.log("Priyanshu");
    element.preventDefault();
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("authorName").value;
    let number = document.getElementById("bookNumber").value;
    let content;
    if (document.getElementById("Fiction").checked)
        content = document.getElementById("Fiction").value;
    else if (document.getElementById("Academic").checked)
        content = document.getElementById("Academic").value;
    else if (document.getElementById("Novel").checked)
        content = document.getElementById("Novel").value;

    let book = new Book(name, author, content, number);

    let bookList = localStorage.getItem("Book List");

    if (bookList == null)
        bookList = [];
    else
        bookList = JSON.parse(bookList);

    if(name == ""){
        document.getElementById('alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Book Name cannot be Blank</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
    else if(author == ""){
        document.getElementById('alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Author Name cannot be Blank</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
    else if(number <= 0){
        document.getElementById('alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Quantity of Books should be greater then 0</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
    else if(content == undefined){
        document.getElementById('alert').innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please Select a valid content</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
    else{
        bookList.push(book);
        document.getElementById('alert').innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>Book added sucessfully</strong> 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    }
        

    setTimeout(() => {
       document.getElementById('alert').innerHTML = '';
    }, 2500)

    console.log(bookList)

    localStorage.setItem("Book List", JSON.stringify(bookList));

    displayTable();
});

function displayTable() {

    document.getElementById("table-row").innerHTML = "";

    let bookList = localStorage.getItem("Book List");

    if(bookList == null)
        return;

    bookList = JSON.parse(bookList);
    let j = 1;
    for (let i = 0; i < bookList.length; i++) {
        
        let trow = `<tr>
        <th scope="row">${j}</th>
        <td>${bookList[i].bookName}</td>
        <td>${bookList[i].authorName}</td>
        <td>${bookList[i].contentType}</td>
        <td>${bookList[i].bookNumber}</td>
        <td><button class="btn btn-outline-danger" id="removeBook"  onclick="removeBook(${i})">Remove ${bookList[i].bookName}</button></td>        
      </tr>`;

        if(bookList[i].bookNumber > 0){
            document.getElementById("table-row").innerHTML += trow;
            j++;
        }      
    }
}

function removeBook(index){

    let bookList = localStorage.getItem("Book List");
    
    bookList = JSON.parse(bookList);

    bookList.splice(index, 1);

    localStorage.setItem('Book List', JSON.stringify(bookList));

    displayTable();
}


