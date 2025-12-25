import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';

import {
  getRoundRectPath
} from 'bpmn-js/lib/draw/BpmnRenderUtil';

import {
  is,
  getBusinessObject
} from 'bpmn-js/lib/util/ModelUtil';

const HIGH_PRIORITY = 1500;

export default class CustomRenderer extends BaseRenderer {
  constructor(eventBus, bpmnRenderer) {
    super(eventBus, HIGH_PRIORITY);

    this.bpmnRenderer = bpmnRenderer;
  }

  canRender(element) {
    // 1. CHECK FOR THE FLAG HERE
    // We only render if it is a Task AND has 'isAI' set to true
    return is(element, 'bpmn:Task') && element.businessObject.isAI;
  }

  drawShape(parentNode, element) {
    const shape = this.bpmnRenderer.drawShape(parentNode, element);

    // 2. APPLY CUSTOM STYLING
    // Since we know it has isAI=true, we color it purple
    const rect = drawRect(parentNode, 100, 80, 10, '#E6E6FA'); // Light purple fill
    
    // Add a border
    rect.style.stroke = '#4B0082'; // Indigo border
    rect.style.strokeWidth = '2px';

    // Add "AI" Text
    const text = svgCreate('text');
    svgAppend(text, document.createTextNode('AI'));
    
    // Position text in center (approximate)
    text.setAttribute('x', 45);
    text.setAttribute('y', 45);
    text.style.fontSize = '20px';
    text.style.fontFamily = 'Arial, sans-serif';
    text.style.fill = '#4B0082';

    svgAppend(parentNode, text);

    return shape;
  }
}

CustomRenderer.$inject = [ 'eventBus', 'bpmnRenderer' ];

// Helper function to draw the colored rectangle
function drawRect(parentNode, width, height, borderRadius, fill) {
  const rect = svgCreate('rect');

  rect.setAttribute('width', width);
  rect.setAttribute('height', height);
  rect.setAttribute('rx', borderRadius);
  rect.setAttribute('ry', borderRadius);
  rect.style.fill = fill;

  svgAppend(parentNode, rect);

  return rect;
}