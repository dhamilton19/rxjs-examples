import {Observable} from 'rxjs';
import fetch from 'isomorphic-fetch';

const app = document.getElementById('app');
app.innerHTML = '<button id="button" type="button">Double click to fetch a movie!</button><div id="movie"></div>';
const button = document.getElementById('button');
const movie = document.getElementById('movie');


const pad = (number, length) => {
    let str = number.toString();
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
};

const generateRandomMovieId = () => pad(Math.floor((Math.random() * 2155529) + 1), 7);

const isValid = prop => {
    return prop && prop !== 'N/A';
};

const isMovieValid = movie => {
    return isValid(movie.Title) && isValid(movie.Poster) && isValid(movie.Plot);
};


const fetchMovie = () => {
    return Observable.defer(() => {
        return Observable.fromPromise(
            fetch(`http://www.omdbapi.com/?i=tt${generateRandomMovieId()}`)
                .then(response => {
                    if (response.status !== 200) throw Error('error');
                    return response;
                })
                .then(response => response.json())
                .then(json => {
                    if (!isMovieValid(json)) throw Error('error');
                    return json;
                })
        ).retry(5);
    }).retry(5);
};


const single$ =
    Observable.fromEvent(document, 'click');

const double$ =
    single$
        .bufferWhen(() => single$.debounceTime(250))
        .map(x => x.length)
        .filter(x => x >= 2);

double$.flatMap(fetchMovie)
    .subscribe(
        x => {
            movie.innerHTML =
                `<a href="http://www.imdb.com/title/tt${x.imdbID}/"><h3>${x.Title} (${x.Year})</h3></a><p>${x.Plot}</p><img src="${x.Poster}"/>`;
        },
        e => console.log(`${e}`),
        () => console.log('complete')
    );