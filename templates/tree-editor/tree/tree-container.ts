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
import { Command, CommandHandler } from '@theia/core';
import { ApplicationShell, OpenerService } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { TreeEditor } from 'theia-tree-editor';

import { TreeModel } from './tree-model';
import { TreeEditorWidget } from './tree-editor-widget';

export namespace TreeCommands {
  export const OPEN_WORKFLOW_DIAGRAM: Command = {
    id: 'workflow.open',
    label: 'Open Workflow Diagram'
  };

}

export class OpenWorkflowDiagramCommandHandler implements CommandHandler {
  constructor(protected readonly shell: ApplicationShell,
    protected readonly openerService: OpenerService) {
  }

  execute() {
    const editorWidget = this.getTreeEditorWidget();
    if (editorWidget) {
      const workflowNode = this.getSelectedWorkflow(editorWidget);
      if (workflowNode) {
        const notationUri = this.getNotationUri(editorWidget);
        this.openerService.getOpener(notationUri).then(opener => opener.open(notationUri, this.createServerOptions(workflowNode)));
      }
    }
  }

  isVisible(): boolean {
    return this.getSelectedWorkflow(this.getTreeEditorWidget()!) !== undefined;
  }

  getTreeEditorWidget(): TreeEditorWidget | undefined {
    const currentWidget = this.shell.currentWidget;
    if (currentWidget instanceof TreeEditorWidget) {
      return currentWidget;
    }
    return undefined;
  }

  getSelectedWorkflow(widget: TreeEditorWidget): TreeEditor.Node | undefined {
    if (widget && TreeEditor.Node.hasType(widget.selectedNode, TreeModel.Type.Person)) {
      return widget.selectedNode;
    }
    return undefined;
  }

  getNotationUri(widget: TreeEditorWidget): URI {
    const uri = widget.uri;
    const notationUri = uri.parent.resolve(uri.displayName + 'notation');
    return notationUri;
  }

  createServerOptions(node: TreeEditor.Node) {
    return {
      serverOptions: {
        workflowIndex: node.jsonforms.index
      }
    };
  }
}
