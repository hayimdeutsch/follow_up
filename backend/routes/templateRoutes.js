router.post("/templates", adminAuth, createTemplate);
router.get("/templates", teacherAuth, getTemplates);
router.put("/templates/:id", adminAuth, updateTemplate);
router.delete("/templates/:id", adminAuth, deleteTemplate);
