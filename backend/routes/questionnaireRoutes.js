// routes/questionnaire.routes.js
router.post(
  "/questionnaires/template/:templateId",
  teacherAuth,
  createFromTemplate
);
router.put("/questionnaires/:id", teacherAuth, updateQuestionnaire);
router.get("/questionnaires/:token", submitQuestionnaire);
router.post("/questionnaires/:token/submit", submitQuestionnaireResponse);
