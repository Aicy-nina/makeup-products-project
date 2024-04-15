const container = document.getElementById("container");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

function fetchData() {
    fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
    .then(response => response.json())
    .then(data => {
        displayData(data);
    });
}

function displayData(data) {
    container.innerHTML = "";
    data.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');

        productDiv.innerHTML = `
            <p>${product.name}</p>
            <img src="${product.image_link}" alt="" class="product-image">
            <span class="brand">${product.brand}</span>
            <span class="price">${product.price}</span>
            <p class="description">${product.description}</p>
            <p>Rating: ${product.rating}</p>
            <p class="likes">Likes: <span class="like-count">0</span></p> 
            <button class="like-button">Like</button> <!-- Like button -->
            <form class="comment-form">
                <input class="comment-input" type="text" name="comment" placeholder="Add a comment...">
                <button class="comment-button" type="submit">Post</button>
            </form>
            <div class="comments-container"></div> <!-- Container for comments -->
            <hr>
        `;
        
        const likeButton = productDiv.querySelector('.like-button');
        const likeCount = productDiv.querySelector('.like-count');
        const commentForm = productDiv.querySelector('.comment-form');
        const commentInput = productDiv.querySelector('.comment-input');
        const commentsContainer = productDiv.querySelector('.comments-container');

        likeButton.addEventListener("click", () => {
            let count = parseInt(likeCount.innerText);
            count++;
            likeCount.innerText = count;
        });

        commentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const comment = document.createElement('p');
            comment.innerText = commentInput.value;
            commentsContainer.appendChild(comment);
            commentInput.value = '';
        });

        container.appendChild(productDiv);
    });
}
