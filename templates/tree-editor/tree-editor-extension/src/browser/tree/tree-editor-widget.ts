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
import { Title, Widget } from '@theia/core/lib/browser';
import { ILogger } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { inject, injectable } from 'inversify';
import {
  AddCommandProperty,
  JsonFormsTreeEditorWidget,
  JsonFormsTreeWidget,
  JSONFormsWidget,
  NavigatableTreeEditorOptions,
  NavigatableTreeEditorWidget,
  TreeEditor,
} from 'theia-tree-editor';

@injectable()
export class TreeEditorWidget extends NavigatableTreeEditorWidget {
  constructor(
    @inject(JsonFormsTreeWidget)
    readonly treeWidget: JsonFormsTreeWidget,
    @inject(JSONFormsWidget)
    readonly formWidget: JSONFormsWidget,
    @inject(WorkspaceService)
    readonly workspaceService: WorkspaceService,
    @inject(ILogger) readonly logger: ILogger,
    @inject(NavigatableTreeEditorOptions)
    protected readonly options: NavigatableTreeEditorOptions,
  ) {
    super(
      treeWidget,
      formWidget,
      workspaceService,
      logger,
      TreeEditorWidget.WIDGET_ID,
      options
    );
  }

  public save(): void {
    this.logger.info('Save data to server');
    super.save();
  }

  protected deleteNode(node: Readonly<TreeEditor.Node>): void {
    this.logger.info('Delete data from server');
  }

  protected addNode({ node, type, property }: AddCommandProperty): void {
    this.logger.info('Add data to server');
  }

  protected handleFormUpdate(data: any, node: TreeEditor.Node) {
    this.logger.info('Handle form update');
  }

  protected configureTitle(title: Title<Widget>): void {
    title.label = this.options.uri.path.base;
    title.caption = JsonFormsTreeEditorWidget.WIDGET_LABEL;
    title.closable = true;
    title.iconClass = 'fa tree-icon dark-purple';
  }
}
export namespace TreeEditorWidget {
  export const WIDGET_ID = 'json-forms-tree-editor';
  export const EDITOR_ID = 'com.eclipsesource.tree.editor';
}
