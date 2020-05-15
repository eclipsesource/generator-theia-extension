import { LabelProviderContribution } from '@theia/core/lib/browser';
import { injectable } from 'inversify';
import { TreeEditor } from 'theia-tree-editor';

import { TreeModel } from './tree-model';
import { TreeEditorWidget } from './tree-editor-widget';

const DEFAULT_COLOR = 'black';

const ICON_CLASSES: Map<string, string> = new Map([
  [TreeModel.Type.Component, 'fa-cube ' + DEFAULT_COLOR],
  [TreeModel.Type.Person, 'fa-user ' + DEFAULT_COLOR],
]);

/* Icon for unknown types */
const UNKNOWN_ICON = 'fa-question-circle ' + DEFAULT_COLOR;

@injectable()
export class TreeLabelProvider implements LabelProviderContribution {

  public canHandle(element: object): number {
    if ((TreeEditor.Node.is(element) || TreeEditor.CommandIconInfo.is(element))
      && element.editorId === TreeEditorWidget.EDITOR_ID) {
      return 1000;
    }
    return 0;
  }

  public getIcon(element: object): string | undefined {
    let iconClass: string | undefined;
    if (TreeEditor.CommandIconInfo.is(element)) {
      iconClass = ICON_CLASSES.get(element.type);
    } else if (TreeEditor.Node.is(element)) {
      const data = element.jsonforms.data;
      if (data.typeId) {
        switch (data.typeId) {
          case TreeModel.Type.Component:
          case TreeModel.Type.Person:
            iconClass = ICON_CLASSES.get(data.typeId);
        }
      }
    }

    return iconClass ? 'fa ' + iconClass : 'fa ' + UNKNOWN_ICON;
  }

  public getName(element: object): string | undefined {
    const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
    if(data.typeId) {
      switch(data.typeId) {
        case TreeModel.Type.Component:
          return data.label;
        case TreeModel.Type.Person:
          return data.firstname + ' ' + data.lastname;
      }
    }
    return undefined;
  }
}
