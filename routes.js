const fs = require('fs');
const path = require('path');

module.exports = app => {

    // Notes Variable
    fs.readFile("/db/db.json", "utf8", (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // API Routes

        // Get route

        app.get("/api/notes", function(req, res) {
            res.json(notes); // Read db.json file and return saved notes as JSON
        });

        // Post route

        app.post("/api/notes", function(req, res) {
            let newNote = req.body;
            notes.push(newNote);
            updateDb();
            return console.log("Added new note: " + newNote.title);
        });

        // Note with specific ID is retrieved 

        app.get("/api/notes/:id", function(req, res) {
            res.json(notes[req.params.id]);
        });

        // Note with specific ID is deleted

        app.delete("/api/notes/:id", function(req, res) {
            notes.splice(req.params.id, 1);
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });

        // Display notes.html when notes is accessed

        app.get('/notes', function(req, res) {
            res.sendFile(path.join(__dirname, "/public/notes.html"));
        });

        // Display index.html when all other routes are accessed

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, "/public/index.html"));
        });

        // Update json whenever a note is added or deleted

        function updateDb() {
            fs.writeFile("/db/db.json", JSON.stringify(notes, '\t'), err => {
                if (err) throw err;
                return true;
            });
        }
    });
}