
const formPost = document.querySelector('.form-post');
const allPosts = [];

// Post submission
formPost.addEventListener('submit', function(e) {
    e.preventDefault();

    const inputPost = document.querySelector('.input-post').value.trim();
    const textPost = document.querySelector('.text-post').value.trim();

    if (inputPost === "" || textPost === "") {
        alert('Campos obrigatorios');
        return;
    }

    const newPost = {
        title: inputPost,
        content: textPost,
        likes: 0,
        comments: [],
        id: allPosts.length
    };

    allPosts.push(newPost);
    displayPosts();
    formPost.reset();
});

// Display posts
function displayPosts() {
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';

    allPosts.forEach((post, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        postDiv.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.content.substring(0, 100)}...</p>
            <p><strong>Likes:</strong> ${post.likes}</p>
            <button class="like-button" data-index="${index}">Like</button>
            <button class="view-button" data-index="${index}">View Post</button>
        `;

        postsContainer.appendChild(postDiv);
    });

    // Add event listeners for dynamically created buttons
    document.querySelectorAll('.like-button').forEach(button => {
        button.addEventListener('click', () => {
            likePost(button.dataset.index);
        });
    });

    document.querySelectorAll('.view-button').forEach(button => {
        button.addEventListener('click', () => {
            viewPost(button.dataset.index);
        });
    });
}

// Like a post
function likePost(index) {
    allPosts[index].likes++;
    displayPosts();
}

// View a post
function viewPost(index) {
    const post = allPosts[index];
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';

    const postDiv = document.createElement('div');
    postDiv.className = 'post';

    postDiv.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p><strong>Likes:</strong> ${post.likes}</p>
        <div class="comment-section">
            <h4>Comments</h4>
            <div id="comments-${index}">
                ${post.comments.map(comment => `
                    <div class="comment">
                        <p>${comment}</p>
                    </div>
                `).join('')}
            </div>
            <input type="text" id="commentInput-${index}" placeholder="Add a comment">
            <button class="comment-button" data-index="${index}">Comment</button>
        </div>
        <button class="back-button">Back to All Posts</button>
    `;

    postsContainer.appendChild(postDiv);

    // Add event listeners for the comment and back buttons
    document.querySelector(`.comment-button[data-index="${index}"]`).addEventListener('click', () => {
        addComment(index);
    });

    document.querySelector('.back-button').addEventListener('click', displayPosts);
}

// Add a comment
function addComment(index) {
    const commentInput = document.getElementById(`commentInput-${index}`);
    const commentText = commentInput.value.trim();

    if (commentText !== "") {
        allPosts[index].comments.push(commentText);
        viewPost(index);
    }
}