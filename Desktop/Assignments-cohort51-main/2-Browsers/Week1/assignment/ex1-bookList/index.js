//cspell: disable
/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/2-Browsers/Week1#exercise-1-the-book-list

I'd like to display my three favorite books inside a nice webpage!

1. Iterate through the array of books.
2. For each book, create a `<p>`
element with the book title and author.
3. Use a `<ul>`  and `<li>` to display the books.
4. Add an `<img>` to each book that links to a URL of the book cover.
5. Change the style of the book depending on whether you have read it(green) or not(red).

The end result should look something like this:
https://hackyourfuture.github.io/example-pages/Browsers/Week1/1-booklist/

-----------------------------------------------------------------------------*/
//cspell: enable

// index.js
function createBookList(books) {
  const ulElement = document.createElement('ul');

  books.forEach((book) => {
    const liElement = document.createElement('li');
    liElement.classList.add(book.alreadyRead ? 'read' : 'unread');

    const imgElement = document.createElement('img');
    imgElement.src = book.image;

    imgElement.alt = `${book.title} cover`;

    const textElement = document.createElement('p');
    textElement.innerHTML = `
      <strong>${book.title}</strong><br>
      <span>by ${book.author}</span>
    `;

    liElement.appendChild(imgElement);
    liElement.appendChild(textElement);
    ulElement.appendChild(liElement);
  });

  return ulElement;
}

function main() {
  const myBooks = [
    {
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      alreadyRead: false,
      image: './assets/the_design_of_everyday_things.jpg',
    },
    {
      title: 'The Most Human Human',
      author: 'Brian Christian',
      alreadyRead: true,
      image: './assets/the_most_human_human.jpg',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'Andrew Hunt',
      alreadyRead: true,
      image: './assets/the_pragmatic_programmer.jpg',
    },
  ];

  const ulElement = createBookList(myBooks);
  document.querySelector('#bookList').appendChild(ulElement);
}

window.addEventListener('load', main);
