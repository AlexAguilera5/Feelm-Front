export default function (filmData = [], action) {
    if (action.type == 'films') {
        

        var filmCopy = [...filmData];
        
   
        for (let i = 0; i < action.films.movie.length; i++) {
            filmCopy.push({

                films : action.films.movie[i]

            })
        }

        
        return filmCopy;
    } else {
        
        return filmData;
        
    }
   
}