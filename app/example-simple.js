import {Observable} from 'rxjs';


const observable =
    Observable.from([1, 2, 3, 4, 5, 6, 7, 8, 10])
        .map(x => x ** 10)
        .filter(x => x % 5 > 0);

observable
    .subscribe(
        x => document.getElementById('app').innerHTML += `<p>${x}</p>`
    );
