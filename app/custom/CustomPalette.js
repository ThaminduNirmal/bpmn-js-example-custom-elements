export default class CustomPalette {
  constructor(create, elementFactory, palette, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    palette.registerProvider(this);
  }

  getPaletteEntries(element) {
    const { create, elementFactory, translate } = this;

    function createAITask(event) {
      // 1. Create a standard BPMN Task
      const shape = elementFactory.createShape({ type: 'bpmn:Task' });

      // 2. Attach a custom flag directly to the business object (the data underneath)
      // This flag will survive saving and loading.
      shape.businessObject.isAI = true;

      create.start(event, shape);
    }

    return {
      'create.ai-task': {
        group: 'activity',
        // Using a standard icon that ensures visibility
        className: 'bpmn-icon-service-task',
        title: translate('Create AI Task'),
        action: {
          dragstart: createAITask,
          click: createAITask
        }
      }
    };
  }
}

CustomPalette.$inject = [
  'create',
  'elementFactory',
  'palette',
  'translate'
];