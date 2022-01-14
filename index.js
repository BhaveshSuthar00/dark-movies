let movie_div = document.getElementById('movies');
    async function searchMovie() {
        
       try {
           let movie = document.getElementById('movie').value;
           
           if(movie.length <=2){
               movie_div.innerHTML = null;
               return false;
           }
        
            let response = await fetch(`http://www.omdbapi.com/?apikey=3f6bb1c9&s=${movie}`);
            let data = await response.json();
            let movies_arr = data.Search;
            appendMovies(movies_arr);
            console.log('data',data)
       }
       catch (error) {
           console.log('error',error);
       }
    }
    function appendMovies(movies){
        movie_div.innerHTML = null;
        if(movies === undefined){
            return false;
        }
        movies.forEach(function (element, index){
            var main_div = document.createElement('div');
            main_div.setAttribute('class','maindiv');
            main_div.addEventListener('click',function (){
                console.log('ere')
                console.log(index)
                displayMovies(element.Title);
            })
            var divforimg = document.createElement('div');
            divforimg.setAttribute('class','image_div');

            var image = document.createElement('img');
            image.src = element.Poster;
            divforimg.append(image);
            var div_text = document.createElement('div');
            div_text.setAttribute('class','discrip')
        
            var p2 = document.createElement('p');
            p2.setAttribute('class','title')
            p2.textContent = `Title : ${element.Title}`;

            var p3 = document.createElement('p');
            p3.setAttribute('class','direcotor')
            p3.textContent = `Type : ${element.Type}`;

            var p4 = document.createElement('p');
            p4.setAttribute('class','imdb');
            p4.textContent = `imDB rating : ${element.imdbID}`;

            var p5 = document.createElement('p');
            p5.setAttribute('class','released')
            p5.textContent = `Released in : ${element.Year}`;
           
            div_text.append(p3,p2,p5,p4);
            main_div.append(divforimg,div_text);
            movie_div.append(main_div)
        })
    }
    async function displayMovies(movie_name) {
        movie_div.innerHTML = null;
        var search = movie_name;
            try {
                let response = await fetch(`http://www.omdbapi.com/?apikey=3f6bb1c9&t=${search}`);
                let data = await response.json();
                console.log(data)
                displayData(data);
            }
            catch(error) {
                console.log('error in fetcing',error);
            }
    }
    function displayData(arr){
        movie_div.innerHTML = null;

        let main2_div = document.createElement('div');
        main2_div.setAttribute('class','main2_divD')
        let text_div = document.createElement('div');
        
        let image_div = document.createElement('div');
        let image = document.createElement('img');
        image.src = arr.Poster;
        image_div.append(image);
        
        let title = document.createElement('p');
        title.innerText = `Title : ${arr.Title}`;

        let type = document.createElement('p');
        type.innerText = `Type      : ${arr.Type}`;
        
        let genre = document.createElement('p');
        genre.innerText = `Genre     : ${arr.Genre}`;
        
        let Released = document.createElement('p');
        Released.innerText = `Released  : ${arr.Released}`;
        

        let rating = document.createElement('p');
        rating.innerText = `${arr.Ratings[1].Source} : ${arr.Ratings[1].Value}`;
        
        let director = document.createElement('p');
        director.innerText = `Director : ${arr.Director}`;

        let actors = document.createElement('p');
        actors.innerText = `Actors   : ${arr.Actors}`;
        
        let writer = document.createElement('p');
        writer.innerText = `Writer    : ${arr.Writer}`;

        let plot = document.createElement('p');
        plot.innerText = `Summary: ${arr.Plot}`;

        text_div.append(type,title,Released,genre,rating,actors,director,writer,plot);
        main2_div.append(image_div,text_div);
        movie_div.append(main2_div);
    }
    let id;
    function debounce(func,delay){
        if(id){
            clearTimeout(id);
        }
        id = setTimeout(function() {
            func()
        }, delay);
    }