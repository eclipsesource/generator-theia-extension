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
    const schema = this.getSchemaForType(node.jsonforms.data.typeId);
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
          definition.properties && definition.properties.typeId.const === type
      );
    if (!localSchema) {
      this.logger.warn("Can't find definition schema for type " + type);
    }
    return localSchema;
}
  
  getUiSchemaForNode(node: TreeEditor.Node) {
    const schema = this.getUiSchemaForType(node.jsonforms.data.typeId);
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

  getNameForType(typeId: string): string {
    return TreeModel.Type.name(typeId);
  }
}
