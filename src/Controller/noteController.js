
const pool = require("../Config/db")
const StudentService = require('../Service/StudentService'); // Import the service module
const StudentDTO = require('../Dto/StudentDTO');

//Create a note
exports.createNote = async(req, res) => {
    try {
        const { description } = req.body;
        const newNote = await pool.query("INSERT INTO note (description) VALUES($1) RETURNING *", [description])
        res.json(newNote.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
}
exports.createStudent = async (req, res) => {
    try {
        const { first_name, last_name, phone_number } = req.body;
        
        const createdStudent = await StudentService.createStudent(first_name, last_name, phone_number);

        // Create a success response DTO
        const successResponse = new StudentDTO(
            createdStudent.id,
            createdStudent.first_name,
            createdStudent.last_name,
            createdStudent.phone_number
        );

        res.status(201).json(successResponse); // Use 201 for resource creation success
    } catch (err) {
        console.error(err.message);

        // Create an error response DTO
        const errorResponse = {
            success: false,
            error: "An error occurred while creating the student.",
        };

        res.status(500).json(errorResponse);
    }
}


//Get all Notes

exports.getAllNotes = async(req,res) => {
    try {
        const allNotes =  await pool.query("SELECT * FROM note");
        res.json(allNotes.rows);
        
    } catch (err) {
        console.error(err.message)
    }
}
//Get One note
exports.getOneNote = async(req,res) => {
    try {
        const { id } = req.params;
        const oneNote =  await pool.query("SELECT * FROM note WHERE note_id = $1", [id]);
        res.json(oneNote.rows[0]);
        
    } catch (err) {
        console.error(err.message)
    }
}

//Update a note

exports.updateOneNote = async(req, res) => {
    try {

        const {id} = req.params;
        const {description} = req.body

        const updatedNote = await pool.query("UPDATE note SET description = $1 WHERE note_id= $2", [description, id])
        
        res.json("Note has been updated")
    } catch (err) {
        console.error(err.message)
        
    }
};

//Delete a note

exports.deleteOneNote = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteNote = await pool.query("DELETE FROM note WHERE note_id = $1", [id]);
        res.json("Note has been deleted");
    } catch (err) {
        console.error(err.message)
        
    }
}
