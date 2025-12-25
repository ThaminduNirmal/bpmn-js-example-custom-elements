import BpmnModeler from 'bpmn-js/lib/Modeler';

import customModule from './custom';

import customDescriptor from './custom/custom.json';



// 1. Setup the Modeler

var container = document.querySelector('#app');

var modeler = new BpmnModeler({

  container: container,

  keyboard: { bindTo: document },

  moddleExtensions: {

    custom: customDescriptor

  },

  additionalModules: [ customModule ]

});



// 2. Default "Start" Diagram (Just so it's not empty)

const defaultXML = `<?xml version="1.0" encoding="UTF-8"?>

<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">

  <bpmn2:process id="Process_1" isExecutable="false">

    <bpmn2:startEvent id="StartEvent_1"/>

  </bpmn2:process>

  <bpmndi:BPMNDiagram id="BPMNDiagram_1">

    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">

      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">

        <dc:Bounds x="412" y="240" width="36" height="36"/>

      </bpmndi:BPMNShape>

    </bpmndi:BPMNPlane>

  </bpmndi:BPMNDiagram>

</bpmn2:definitions>`;



openDiagram(defaultXML);



// --- FUNCTIONS ---



// Function to load XML into the editor

function openDiagram(xml) {

  modeler.importXML(xml).then(function() {

    modeler.get('canvas').zoom('fit-viewport');

  }).catch(function(err) {

    console.error('Error loading diagram', err);

  });

}



// 3. "DOWNLOAD" LOGIC

document.querySelector('#btn-download').addEventListener('click', function() {

  modeler.saveXML({ format: true }).then(function(result) {

    // Create a fake link to trigger download

    const link = document.createElement('a');

    link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodeURIComponent(result.xml);

    link.download = 'diagram.bpmn';

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

  }).catch(function(err) {

    console.error('Error saving diagram', err);

  });

});



// 4. "OPEN" LOGIC

// When clicking "Open", actually click the hidden file input

document.querySelector('#btn-open').addEventListener('click', function() {

  document.querySelector('#file-input').click();

});



// When a file is selected, read it

document.querySelector('#file-input').addEventListener('change', function(e) {

  const file = e.target.files[0];

  if (!file) return;



  const reader = new FileReader();

  reader.onload = function(e) {

    const xml = e.target.result;

    openDiagram(xml); // Load the new file!

  };

  reader.readAsText(file);

});
