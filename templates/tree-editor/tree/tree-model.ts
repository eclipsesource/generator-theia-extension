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
import URI from '@theia/core/lib/common/uri';
import { TreeEditor } from 'theia-tree-editor';

export namespace TreeModel {
  export namespace Type {
    export const Component = '#component';
    export const Person = '#person';

    export function name(type: string): string {
      return new URI(type).fragment;
    }
  }

  /** Maps types to their creatable children */
  export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
    [
      Type.Component, [
        {
          property: 'persons',
          children: [Type.Person]
        }
      ]
    ]
  ]);
}