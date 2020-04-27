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

import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { TreeEditor } from 'theia-tree-editor';

import { TreeModel } from './tree-model';
import { 
  schema,
  personView,
  componentView
} from './tree-schema';

@injectable()
export class TreeModelService implements TreeEditor.ModelService {

  constructor(@inject(ILogger) private readonly logger: ILogger) { }

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
    const schema = this.getSchemaForType(node.jsonforms.data.eClass);
    if (schema) {
      return schema;
    }
    return undefined;
  }

  private getSchemaForType(type: string) {
    if (!type) {
      return undefined;
    }
    const localSchema = Object.entries(schema.definitions)
      .map(entry => entry[1])
      .find(
        definition =>
          definition.properties && definition.properties.eClass.const === type
      );
    if (!localSchema) {
      this.logger.warn("Can't find definition schema for type " + type);
    }
    return localSchema;
}
  
  getUiSchemaForNode(node: TreeEditor.Node) {
    const schema = this.getUiSchemaForType(node.jsonforms.data.eClass);
    if (schema) {
      return schema;
    }
    return undefined;
  }

  private getUiSchemaForType(type: string) {
    if (!type) {
      return undefined;
    }
    switch (type) {
      case TreeModel.Type.Component:
        return componentView;
      case TreeModel.Type.Person:
        return personView;
      default:
        this.logger.warn("Can't find registered ui schema for type " + type);
        return undefined;
    }
}

  getChildrenMapping(): Map<string, TreeEditor.ChildrenDescriptor[]> {
    return TreeModel.childrenMapping;
  }

  getNameForType(eClass: string): string {
    return TreeModel.Type.name(eClass);
  }
}
