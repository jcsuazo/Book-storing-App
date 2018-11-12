//Variables Constructor
let books;
function Variables() {
    this.form = document.querySelector('#book-form');
    this.title = document.querySelector('#title');
    this.author = document.querySelector('#author');
    this.isbn = document.querySelector('#isbn');
    this.container = document.querySelector('.container');
    this.tbody = document.querySelector('#book-list');
};
const globalVariables = new Variables();
//Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
};
//UI Constructor
function UI() {};
//Create message method
UI.prototype.message = function (message, className, variables) {
    //Create div
    const div = document.createElement('div');
    //Add Classes
    div.className = `alert ${className}`;
    //Error message
    div.appendChild(document.createTextNode(message));
    //Insert div
    variables.container.insertBefore(div,variables.form);
    //Remove div after 2 seconds
    setTimeout(function () {document.querySelector('.alert').remove()}, 2000);
};
//Create book UI Method
UI.prototype.createBook = function (book, variables) {
    //Create tr
    const row = document.createElement('tr');
    //Add tds
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="" class="delete">X</a></td>
    `;
    //Append to tbody
    variables.tbody.appendChild(row)
};
//Clear all fields UI Method
UI.prototype.clearFields = function (variables) {
    variables.title.value = '';
    variables.author.value = '';
    variables.isbn.value = '';
};
//Delete single Book UI Method
UI.prototype.deleteSingleBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
};

//Event Listeners To Add Book
globalVariables.form.addEventListener('submit', function (e) {
    //Prevent form submition
    e.preventDefault();
    //instanciate variables
    const variables = new Variables();
    //Instanciate book
    const book = new Book(variables.title.value, variables.author.value, variables.isbn.value);
    //Instanciate UI
    const ui = new UI();
    if (variables.title.value === '' || variables.author.value === '' || variables.isbn.value === '') {
        ui.message('Please fill out all filds', 'error', variables);
    } else {
        //Create Book
        ui.createBook(book, variables);
        //Show message book added
        ui.message('Book Added!', 'success', variables, globalVariables);
        //Clear input filds
        ui.clearFields(variables);
    }
});
//Event Listener To Remove Book
globalVariables.tbody.addEventListener('click', function (e) {
    //Prevent link default
    e.preventDefault();
    //instanciate variables
    const variables = new Variables();
    //Instanciate UI
    const ui = new UI();
    //delete single book
    ui.deleteSingleBook(e.target);
    //Show Message Delete
    ui.message('Book Deleted', 'success', variables);
});
