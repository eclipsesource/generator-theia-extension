/*!
 * Copyright (C) 2020 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 */

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
          'scope': '#/properties/firstname'
        },
        {
          'type': 'Control',
          'label': 'Last Name',
          'scope': '#/properties/lastname'
        }
      ]
    }
  ]
};

export const schema = {
  'definitions': {
    'component': {
      'title': 'Component',
      'properties': {
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
      'title': 'person',
      'properties': {
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
  