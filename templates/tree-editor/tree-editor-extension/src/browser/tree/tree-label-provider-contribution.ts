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
    let iconClass: string;
    if (TreeEditor.CommandIconInfo.is(element)) {
      iconClass = ICON_CLASSES.get(element.type);
    } else if (TreeEditor.Node.is(element)) {
      const data = element.jsonforms.data;
      if (data.eClass) {
        switch (data.eClass) {
          case TreeModel.Type.Component:
          case TreeModel.Type.Person:
            iconClass = ICON_CLASSES.get(data.eClass);
        }
      }
    }

    return iconClass ? 'fa ' + iconClass : 'fa ' + UNKNOWN_ICON;
  }

  public getName(element: object): string | undefined {
    const data = TreeEditor.Node.is(element) ? element.jsonforms.data : element;
    if(data.eClass) {
      switch(data.eClass) {
        case TreeModel.Type.Component:
          return data.label;
        case TreeModel.Type.Person:
          return data.firstname + ' ' + data.lastname;
      }
    }
    return undefined;
  }
}
