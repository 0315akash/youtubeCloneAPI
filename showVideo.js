const Base_Url = "https://www.googleapis.com/youtube/v3";
const Api_Key = "AIzaSyACOcvgpo78rRu1wy3BUVOuusuXOQDWckE";


const video_container = document.getElementById("yt-video");
const videoId = localStorage.getItem("videoId");
const commentsContainer = document.getElementById("comments");
video_container.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

async function getComments() {
    const url = `${Base_Url}/commentThreads?key=${Api_Key}&videoId=${videoId}&maxResults=40&order=time&part=snippet`;
    const response = await fetch(url, {
        method: "get",
    });
    const data = await response.json();
    const comments = data.items;
    renderComments(comments);
}

function renderComments(comments) {
    commentsContainer.innerHTML = "";
    comments.forEach((comment) => {
        commentsContainer.innerHTML += `
       <P>${comment.snippet.topLevelComment.snippet.textDisplay}</p>
       `;
    });
}

getComments();