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
import { CommandRegistry, MenuModelRegistry } from '@theia/core';
import { ApplicationShell, NavigatableWidgetOptions, OpenerService, WidgetOpenerOptions } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable } from 'inversify';
import {
  JsonFormsTreeEditorContribution,
  JsonFormsTreeEditorWidget,
  TreeEditor,
} from 'theia-tree-editor';

import { TreeModelService } from './tree/tree-model-service';
import { TreeCommands, OpenWorkflowDiagramCommandHandler } from './tree/tree-container';
import { TreeEditorWidget } from './tree/tree-editor-widget';
import { TreeLabelProvider } from './tree/tree-label-provider-contribution';

@injectable()
export class TreeContribution extends JsonFormsTreeEditorContribution {
  @inject(ApplicationShell) protected shell: ApplicationShell;
  @inject(OpenerService) protected opener: OpenerService;

  constructor(
    @inject(TreeModelService) modelService: TreeEditor.ModelService,
    @inject(TreeLabelProvider) labelProvider: TreeLabelProvider
  ) {
    super(TreeEditorWidget.EDITOR_ID, modelService, labelProvider);
  }

  readonly id = TreeEditorWidget.WIDGET_ID;
  readonly label = JsonFormsTreeEditorWidget.WIDGET_LABEL;

  canHandle(uri: URI): number {
    if (
      uri.path.ext === '.tree'
    ) {
      return 1000;
    }
    return 0;
  }

  registerCommands(commands: CommandRegistry): void {
    commands.registerCommand(
      TreeCommands.OPEN_WORKFLOW_DIAGRAM,
      new OpenWorkflowDiagramCommandHandler(this.shell, this.opener));

    super.registerCommands(commands);
  }

  registerMenus(menus: MenuModelRegistry): void {
    // register your custom menu actions here
    
    super.registerMenus(menus);
  }

  protected createWidgetOptions(uri: URI, options?: WidgetOpenerOptions): NavigatableWidgetOptions {
    return {
      kind: 'navigatable',
      uri: this.serializeUri(uri)
    };
  }

  protected serializeUri(uri: URI): string {
    return uri.withoutFragment().toString();
  }

}
