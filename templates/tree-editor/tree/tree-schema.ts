export const uischema = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Label',
      'scope': '#/properties/label'
    },
    {
      'type': 'VerticalLayout',
      'elements': [
        {
          'type': 'Control',
          'label': 'First Name',
          'scope': '#/properties/person/properties/firstname'
        },
        {
          'type': 'Control',
          'label': 'Last Name',
          'scope': '#/properties/person/properties/lastname'
        }
      ]
    }
  ]
};

export const componentView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'Label',
      'scope': '#/properties/label'
    },
    {
      "type": "VerticalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/persons"
        }
      ]
    }
  ]
};

export const personView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Control',
      'label': 'First Name',
      'scope': '#/properties/firstname'
    },
    {
      'type': 'Control',
      'label': 'Last Name',
      'scope': '#/properties/lastname'
    }
  ]
}

export const schema = {
  'definitions': {
    'component': {
      'title': 'Component',
      'properties': {
        'typeId': {
          'const': '#component'
        },
        'label': {
          'type': 'string'
        },
        'persons': {
          'type': 'array',
          'items': {
            '$ref': '#/definitions/person'
          }
        },
      },
      'additionalProperties': false
    },
    'person': {
      'title': 'Person',
      'properties': {
        'typeId': {
          'const': '#person'
        },
        'firstname': {
          'type': 'string'
        },
        'lastname': {
          'type': 'string'
        },
      },
      'additionalProperties': false
    },
  },
  '$ref': '#/definitions/component'
};
  