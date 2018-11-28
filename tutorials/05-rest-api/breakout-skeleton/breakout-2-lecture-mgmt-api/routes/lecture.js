var express = require('express');
var router = express.Router();

let DatabaseService = require('../service/DatabaseService');
let databaseService = new DatabaseService();

/**
 * returns all lectures
 * TODO make this resource filterable e.g. by professor
 */
router.get('/', (req,res)=> {
    databaseService.getAllLectures(lectures => {
        if (req.query.professor) {
            lectures = lectures.filter(lecture => lecture.professor.toLowerCase() == req.query.professor.toLowerCase())
        }
        if (req.query['study-program']){
            const studyPrograms = ['Medieninformatik Master', 'Medieninformatik Bachelor']
            if (studyPrograms.includes(req.query['study-program'])){
                
            } else {
                res.status(404).send();
            }
        }
        res.send(lectures);
    });
});

/**
 * returns a lecture by its slug
 */
router.get('/:slug', (req,res)=>{
    databaseService.getLecture(req.params['slug'], lecture => {
        if(lecture){
            res.send(lecture);
        }
        else {
            res.status(404).send();
        }
    })
});

/**
 * returns all assignments for a lecture
 */
router.get('/:slug/assignments', (req,res) => {
    databaseService.getAllAssignmentsForLecture(req.params['slug'], assignments => {
        if (assignments){
            res.send(assignments)
        }
        else {
            res.status(404).send();
        }
    })
});


/*
    TODO create a route to access an assignment by its id (e.g. assignment1)
    you can retrieve stored assignment objects with the DatabaseService class' method getAssignmentById
 */

router.get('/:slug/assignments/:assignmentId', (req,res) => {
   databaseService.getAssignmentById(req.params['slug'], req.params['assignment-ID'], (assignment)
       => {
           if (assignment){
               res.send(assignment)
           } else {
               res.status(404).send();
           }
       })
});


/*
    TODO create a route to upload an assignment. The user should have to specify an id and the assignment object
    you can store assignment objects with the DatabaseService class' method addAssignmentForLecture
 */

router.post('/:slug/assignments/:assignmentId', (req,res) => {
    databaseService.getLecture(req.params['slug'], lecture => {
        if (lecture) {
            databaseService.addAssignmentForLecture(req.params['slug'], req.params['assignmentId'], req.body, () => {
                res.setHeader('Location', '')
            })
        }
    })
})


module.exports = router;