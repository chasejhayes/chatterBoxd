const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let movieDB = [
    {id:1, title: "The Blue Gardenia", director: "Fritz Land", releaseDate: 1953, description:"Deeply distraught that her GI ex-boyfriend plans to marry another woman, Norah Larkin (Anne Baxter) agrees to go out on a date with lothario Harry Prebble (Raymond Burr). Norah's drunken night out with Prebble ends in a hazily remembered confrontation and the next day a startling discovery: Harry has been murdered, and the police have found Norah's personal effects at the scene. Tipped off to the breaking news, reporter Casey Mayo (Richard Conte) invites Norah to tell her side of the story.", averageRating: 0, reviews: []},
    {id:2, title: "Night and the City", director: "Jules Dassin", releaseDate: 1950, description: "Londoner Harry Fabian (Richard Widmark) is a second-rate con man looking for an angle. After years of putting up with Harry's schemes, his girlfriend, Mary (Gene Tierney), becomes fed up when he taps her for yet another loan. His latest ploy, promoting an aging Greek wrestler, goes awry when the wrestler dies and everyone points the finger at Harry. Hiding out in a riverfront barge, Harry sees his grand ambitions spiral into a nightmare of fear and desperation as the underworld closes in.", averageRating: 0, reviews: [], rating: "", review: ""},
    {id:3, title: "Niagara", director: "Henry Hathaway", releaseDate: 1953, description: "Rose Loomis (Marilyn Monroe) and her older, gloomier husband, George (Joseph Cotten), are vacationing at a cabin in Niagara Falls, N.Y. The couple befriend Polly (Jean Peters) and Ray Cutler (Casey Adams), who are honeymooning in the area. Polly begins to suspect that something is amiss between Rose and George, and her suspicions grow when she sees Rose in the arms of another man. While Ray initially thinks Polly is overreacting, things between George and Rose soon take a shockingly dark turn.", averageRating: 0, reviews: []},
    {id:4, title: "Leave Her to Heaven", director: "John M. Stahl", releaseDate: 1945, description: "While on a train, writer Richard Harland (Cornel Wilde) strikes up a relationship with the gorgeous Ellen Berent (Gene Tierney). Ellen quickly becomes obsessed with Richard and abandons her fiancé, Russell Quinton (Vincent Price), to be with him. The couple rushes into marriage, with both of them caught up in romance and Richard intrigued by Ellen's intensity. Only after settling into marriage, however, does Richard realize that she is psychotically jealous and highly unstable.", averageRating: 0, reviews: []},
    {id:5, title: "The Maltese Falcon", director: "John Huston", releaseDate: 1941, description: "In this noir classic, detective Sam Spade (Humphrey Bogart) gets more than he bargained for when he takes a case brought to him by a beautiful but secretive woman (Mary Astor). As soon as Miss Wonderly shows up, trouble follows as Sam's partner is murdered and Sam is accosted by a man (Peter Lorre) demanding he locate a valuable statuette. Sam, entangled in a dangerous web of crime and intrigue, soon realizes he must find the one thing they all seem to want: the bejeweled Maltese falcon.", averageRating: 0, reviews: []}

]

app.get('/api/movies', (req, res) => {
    res.json(movieDB)
})

app.patch('/api/movies/:id', (req, res) => {
    const id = req.params.id
    movieDB = movieDB.map(item => 
        item.id == id
        ? {...item, ...req.body}
        : item
    )
    let updatedMovies = movieDB.find(item =>
        item.id == id
    )
    res.json(updatedMovies)
 
})

const PORT = 3001

app.listen((PORT), () => {
    console.log("Listening on 3001")
})

