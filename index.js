// searchapi=https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchedItem}&maxResults=20&key=[your_api_key]

async function fetchResults(){
    var searchedValue= document.getElementById('searchBar').value;
    var response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchedValue}&maxResults=20&key=[your_api_key]`);

    var result= await response.json();
    // console.log(result.items)
    var searchedItems=result.items;
    // console.log(searchedItems);
    displayResults(searchedItems);

    
}

function displayResults(searchedItems){
    document.getElementById('container').innerHTML='';
    searchedItems.forEach(element => {
        var div=document.createElement('div');
        div.setAttribute('class','item');
        div.style.cursor='pointer';
        var image=document.createElement('img');
        image.setAttribute('src',element.snippet.thumbnails.high.url);
        image.setAttribute('class','thumbnail');

        var title=document.createElement('h4');
        title.setAttribute('class','title');
        title.innerText=element.snippet.title;

        var channelName=document.createElement('h5');
        channelName.setAttribute('class','channelName');
        channelName.innerText=element.snippet.channelTitle;

        div.addEventListener('click', function(){
            // console.log(element);
            var videoId=element.id.videoId;
            getVideo(videoId);
        })

        div.append(image, title, channelName);
        document.getElementById('container').append(div);
    });
    document.getElementById('searchBar').value='';
}



async function getVideo(videoId){
    var response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,player&id=${videoId}&key=[your_api_key]`);

    var result= await response.json();

    // console.log(result);
    // console.log(video)
   localStorage.setItem('videoDetails',JSON.stringify(result));

   window.location.href='./video.html';
}


async function trendingIndia(){
    var response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=40&regionCode=IN&key=[your_api_key]`);

    var result= await response.json();
    // console.log(result.items)
    var trending=result.items;
    // console.log(searchedItems);
    displayTrending(trending);

    
}

window.onload= trendingIndia();


function displayTrending(searchedItems){
    document.getElementById('container').innerHTML='';
    searchedItems.forEach(element => {
        var div=document.createElement('div');
        div.setAttribute('class','item');

        var image=document.createElement('img');
        image.setAttribute('src',element.snippet.thumbnails.high.url);
        image.setAttribute('class','thumbnail');

        var title=document.createElement('h4');
        title.setAttribute('class','title');
        title.innerText=element.snippet.title;

        var channelName=document.createElement('h5');
        channelName.setAttribute('class','channelName');
        channelName.innerText=element.snippet.channelTitle;

        div.append(image, title, channelName);
        document.getElementById('container').append(div);
    });
    document.getElementById('searchBar').value='';
}
