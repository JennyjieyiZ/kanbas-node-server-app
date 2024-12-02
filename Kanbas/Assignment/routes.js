import * as assignmentsDao from "./dao.js";
export default function AssignmentRoutes(app) {
    app.put("/api/assignments/:assignmentId", async (req, res) => {
        const { assignmentId } = req.params;
        const assignmentUpdates = req.body;

        try {
            const status = await assignmentsDao.updateAssignment(assignmentId, assignmentUpdates);
            res.send(status);
        } catch (error) {
            console.error("Error updating assignment:", error);
            res.status(500).send({ error: "Failed to update assignment" });
        }
    });
    
    app.delete("/api/assignments/:assignmentId", async (req, res) => {
      const { assignmentId } = req.params;
      const status = await assignmentsDao.deleteAssignment(assignmentId);
      res.send(status);
    });
   }