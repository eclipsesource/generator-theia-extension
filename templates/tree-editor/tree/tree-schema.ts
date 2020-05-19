export const controlUnitView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Label',
      'text': 'Control Unit'
    },
    {
      'type': 'Group',
      'label': 'Processor',
      'elements': [
        {
          'type': 'HorizontalLayout',
          'elements': [
            {
              'type': 'VerticalLayout',
              'elements': [
                {
                  'type': 'Control',
                  'label': 'Vendor',
                  'scope': '#/properties/processor/properties/vendor'
                },
                {
                  'type': 'Control',
                  'label': 'Clock Speed',
                  'scope': '#/properties/processor/properties/clockSpeed'
                },
                {
                  'type': 'Control',
                  'label': 'Number Of Cores',
                  'scope': '#/properties/processor/properties/numberOfCores'
                }
              ]
            },
            {
              'type': 'VerticalLayout',
              'elements': [
                {
                  'type': 'Control',
                  'label': 'Socketconnector Type',
                  'scope': '#/properties/processor/properties/socketconnectorType'
                },
                {
                  'type': 'Control',
                  'label': 'Manufacturing Process',
                  'scope': '#/properties/processor/properties/manufactoringProcess'
                },
                {
                  'type': 'Control',
                  'label': 'Thermal Design Power',
                  'scope': '#/properties/processor/properties/thermalDesignPower'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      'type': 'Group',
      'label': 'Display',
      'elements': [
        {
          'type': 'HorizontalLayout',
          'elements': [
            {
              'type': 'Control',
              'label': 'Width',
              'scope': '#/properties/display/properties/width'
            },
            {
              'type': 'Control',
              'label': 'Height',
              'scope': '#/properties/display/properties/height'
            }
          ]
        }
      ]
    },
    {
      'type': 'Group',
      'label': 'Dimension',
      'elements': [
        {
          'type': 'HorizontalLayout',
          'elements': [
            {
              'type': 'Control',
              'label': 'Width',
              'scope': '#/properties/dimension/properties/width'
            },
            {
              'type': 'Control',
              'label': 'Height',
              'scope': '#/properties/dimension/properties/height'
            },
            {
              'type': 'Control',
              'label': 'Length',
              'scope': '#/properties/dimension/properties/length'
            }
          ]
        }
      ]
    },
    {
      'type': 'Control',
      'label': 'Ram',
      'scope': '#/properties/ram'
    },
    {
      'type': 'Group',
      'label': 'User Description',
      'elements': [
        {
          'type': 'Control',
          'label': 'User Description',
          'scope': '#/properties/userDescription'
        }
      ]
    }
  ]
};

export const machineView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Label',
      'text': 'Machine'
    },
    {
      'type': 'Control',
      'label': 'Name',
      'scope': '#/properties/name'
    }
  ]
};

export const brewingView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Label',
      'text': 'Brewing Unit'
    },
    {
      'type': 'Control',
      'label': 'Temperature (°C)',
      'scope': '#/properties/temperature'
    }
  ]
};
export const dripTrayView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Label',
      'text': 'DripTray'
    },
    {
      'type': 'Control',
      'label': 'Material',
      'scope': '#/properties/material'
    }
  ]
};

export const waterTankView = {
  'type': 'VerticalLayout',
  'elements': [
    {
      'type': 'Label',
      'text': 'Water Tank'
    },
    {
      'type': 'Control',
      'label': 'Capacity (ml)',
      'scope': '#/properties/capacity'
    }
  ]
};

export const coffeeSchema = {
  'definitions': {
    'machine': {
      '$id': '#machine',
      'title': 'Machine',
      'properties': {
        'typeId': {
          'const': 'Machine'
        },
        'name': {
          'type': 'string'
        },
        'children': {
          'type': 'array',
          'items': {
            'anyOf': [
              { '$ref': '#/definitions/controlunit' },
              { '$ref': '#/definitions/brewingunit' },
              { '$ref': '#/definitions/driptray' },
              { '$ref': '#/definitions/watertank' }
            ]
          }
        }
      },
      'additionalProperties': false
    },
    'controlunit': {
      '$id': '#controlunit',
      'title': 'Control Unit',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'ControlUnit'
        },
        'processor': {
          '$ref': '#/definitions/processor'
        },
        'dimension': {
          '$ref': '#/definitions/dimension'
        },
        'ram': {
          'type': 'array',
          'items': {
            '$ref': '#/definitions/ram'
          }
        },
        'display': {
          '$ref': '#/definitions/display'
        },
        'userDescription': {
          'type': 'string'
        }
      },
      'additionalProperties': false,
      'required': [
        'processor',
        'dimension',
        'ram'
      ]
    },
    'brewingunit': {
      '$id': '#brewingunit',
      'title': 'Brewing Unit',
      'properties': {
        'typeId': {
          'const': 'BrewingUnit'
        },
        'temperature': {
          'type': 'number',
          'default': 92.5
        }
      },
      'additionalProperties': false
    },
    'driptray': {
      '$id': '#driptray',
      'title': 'Drip Tray',
      'properties': {
        'typeId': {
          'const': 'DripTray'
        },
        'material': {
          'type': 'string',
          'enum': [
            'aluminium',
            'plastic',
            'steel'
          ]
        }
      },
      'additionalProperties': false
    },
    'watertank': {
      '$id': '#watertank',
      'title': 'Water Tank',
      'properties': {
        'typeId': {
          'const': 'WaterTank'
        },
        'capacity': {
          'type': 'integer'
        }
      },
      'additionalProperties': false
    },
    'processor': {
      '$id': '#processor',
      'type': 'object',
      'title': 'Processor',
      'properties': {
        'typeId': {
          'const': 'Processor'
        },
        'vendor': {
          'type': 'string'
        },
        'clockSpeed': {
          'type': 'integer'
        },
        'numberOfCores': {
          'type': 'integer'
        },
        'socketconnectorType': {
          'type': 'string',
          'enum': [
            'A1T',
            'Z51'
          ]
        },
        'thermalDesignPower': {
          'type': 'integer'
        },
        'manufactoringProcess': {
          'type': 'string',
          'enum': [
            '18nm',
            'nm25'
          ]
        }
      },
      'additionalProperties': false
    },
    'dimension': {
      '$id': '#dimension',
      'title': 'Dimension',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'Dimension'
        },
        'width': {
          'type': 'integer'
        },
        'height': {
          'type': 'integer'
        },
        'length': {
          'type': 'integer'
        }
      },
      'additionalProperties': false
    },
    'ram': {
      '$id': '#ram',
      'title': 'RAM',
      'type': 'object',
      'properties': {
        'typeId': {
          'const': 'RAM'
        },
        'clockSpeed': {
          'type': 'integer'
        },
        'size': {
          'type': 'integer'
        },
        'type': {
          'type': 'string',
          'enum': [
            'SODIMM',
            'SIDIMM'
          ]
        }
      },
      'additionalProperties': false
    },
    'display': {
      '$id': '#display',
      'type': 'object',
      'title': 'Display',
      'properties': {
        'typeId': {
          'const': 'Display'
        },
        'width': {
          'type': 'integer'
        },
        'height': {
          'type': 'integer'
        }
      },
      'additionalProperties': false
    }
  },
  '$ref': '#/definitions/machine'
};