/*!
 * Copyright (C) 2019 EclipseSource and others.
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
import { injectable } from 'inversify';
import { TreeEditor } from 'theia-tree-editor';

import { TreeModel } from './tree-model';
import { schema, uischema } from './tree-schema';

@injectable()
export class TreeModelService implements TreeEditor.ModelService {

  constructor() { }

  getDataForNode(node: TreeEditor.Node) {
    return node.jsonforms.data;
  }

  getSchemaForNode(node: TreeEditor.Node) {
    return {
      definitions: schema.definitions,
      ...this.getSubSchemaForNode(node)
    };
  }

  private getSubSchemaForNode(node: TreeEditor.Node) {
    return schema;
  }
  
  getUiSchemaForNode(node: TreeEditor.Node) {
    return uischema;
  }

  getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
    return TreeModel.childrenMapping;
  }

  getNameForType(eClass: string): string {
    return TreeModel.Type.name(eClass);
  }
}
