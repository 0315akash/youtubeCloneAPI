const Base_Url = "https://www.googleapis.com/youtube/v3";

const Api_Key = "AIzaSyACOcvgpo78rRu1wy3BUVOuusuXOQDWckE";
const container = document.getElementById("video-container");
async function getVideos(q) {
    const url = `${Base_Url}/search?key=${Api_Key}&q=${q}&type=videos&maxResults=20`;
    const response = await fetch(url, {
        method: "get",
    });
    const data = await response.json();
    console.log(data);
    const videos = data.items;
    getVideoData(videos);
}

async function getVideoData(videos) {
    let videoData = [];
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const videoId = video.id.videoId;
        videoData.push(await getVideoDetails(videoId));
    }
    console.log(videoData);
    renderVideos(videoData);
}

async function getVideoDetails(videoId) {
    const url = `${Base_Url}/videos?key=${Api_Key}&part=snippet,contentDetails,statistics&id=${videoId}`;
    const response = await fetch(url, {
        method: "get",
    });
    const data = await response.json();
    return data.items[0];
}

function renderVideos(videos) {
    container.innerHTML = ``;
    for (let i = 0; i < videos.length; i++) {
        const video = videos[i];
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        container.innerHTML += `
    <div class="video" onclick="openVideoDetails('${video.id}')">
    <img src="${thumbnailUrl}" class="thumbnail" alt="">
    <div class="content">
        <img src="${video.snippet.thumbnails.default.url}" class="channel-icon" alt="">
        <div class="info">
            <h4 class="title">${video.snippet.localized.title}</h4>
            <p class="channel-name">${video.snippet.channelTitle}</p>
            <div class="views">
                <p class="video-views">15k views</p>
                <p class="video-time">.1 week ago</p>
            </div>
        </div >
    </div >
</div > `;
    }
}

function openVideoDetails(videoId) {
    localStorage.setItem("videoId", videoId);
    window.open("/videoDetails.html");
}


getVideos("");


