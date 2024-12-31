const TemplateSelector = ({
  templates,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  return (
    <select
      value={selectedTemplate}
      onChange={(e) => setSelectedTemplate(e.target.value)}
    >
      <option value="">Select a Template</option>
      {templates.map((template, index) => (
        <option key={index} value={template.id}>
          {template.title}
        </option>
      ))}
    </select>
  );
};

export default TemplateSelector;
