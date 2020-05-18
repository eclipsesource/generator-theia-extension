import { ILogger } from '@theia/core';
import { inject, injectable } from 'inversify';
import { TreeEditor } from 'theia-tree-editor';
import { v4 } from 'uuid';

import { TreeModel } from './tree-model';
import { TreeEditorWidget } from './tree-editor-widget';
import { TreeLabelProvider } from './tree-label-provider-contribution';

@injectable()
export class TreeNodeFactory implements TreeEditor.NodeFactory {

  constructor(
    @inject(TreeLabelProvider) private readonly labelProvider: TreeLabelProvider,
    @inject(ILogger) private readonly logger: ILogger) {
  }

  mapDataToNodes(treeData: TreeEditor.TreeData): TreeEditor.Node[] {
    const node = this.mapData(treeData.data);
    if (node) {
      return [node];
    }
    return [];
  }

  mapData(data: any, parent?: TreeEditor.Node, property?: string, indexOrKey?: number | string, defaultType?: string): TreeEditor.Node {
    if (!data) {
      // sanity check
      this.logger.warn('mapData called without data');
      //return undefined;
    }
    const node: TreeEditor.Node = {
      ...this.defaultNode(),
      editorId: TreeEditorWidget.EDITOR_ID,
      name: this.labelProvider.getName(data)!,
      parent: parent,
      jsonforms: {
        type: data.typeId,
        data: data,
        property: property!,
        index: typeof indexOrKey === 'number' ? indexOrKey.toFixed(0) : indexOrKey
      },
      decorationData: data
    };
    if (parent) {
      parent.children.push(node);
      parent.expanded = true;
    }
    if (data.persons) {
      data.persons.forEach((element: any, idx: any) => {
        this.mapData(element, node, 'persons', idx);
      });
    }
    return node;
  }

  hasCreatableChildren(node: TreeEditor.Node): boolean {
    return node ? TreeModel.childrenMapping.get(node.jsonforms.type) !== undefined : false;
  }

  protected defaultNode(): Pick<
    TreeEditor.Node,
    'children' | 'name' | 'jsonforms' | 'id' | 'icon' | 'description' | 'visible' | 'parent' | 'previousSibling' | 'nextSibling' | 'expanded' | 'selected' | 'focus' | 'decorationData'
  > {
    return {
      id: v4(),
      expanded: false,
      selected: false,
      parent: undefined,
      children: [],
      decorationData: {},
      name: '',
      jsonforms: {
        type: '',
        property: '',
        data: undefined
      }
    }
  };

  protected getType(type: string, data: any): string {
    if (type) {
        // given typeId
        return type;
    }
    if (data.typeId) {
        // typeId of node
        return data.typeId;
    }
    return '';
  }
}
