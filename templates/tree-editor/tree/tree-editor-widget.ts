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
import { Title, Widget } from '@theia/core/lib/browser';
import { DefaultResourceProvider, ILogger } from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser/workspace-service';
import { inject, injectable } from 'inversify';
import {
  AddCommandProperty,
  MasterTreeWidget,
  DetailFormWidget,
  NavigatableTreeEditorOptions,
  TreeEditor,
} from 'theia-tree-editor';
import { ResourceTreeEditorWidget } from  'theia-tree-editor';

@injectable()
export class TreeEditorWidget extends ResourceTreeEditorWidget {
  constructor(
    @inject(MasterTreeWidget)
    readonly treeWidget: MasterTreeWidget,
    @inject(DetailFormWidget)
    readonly formWidget: DetailFormWidget,
    @inject(WorkspaceService)
    readonly workspaceService: WorkspaceService,
    @inject(ILogger) readonly logger: ILogger,
    @inject(NavigatableTreeEditorOptions)
    protected readonly options: NavigatableTreeEditorOptions,
    @inject(DefaultResourceProvider)
    protected provider: DefaultResourceProvider,
    @inject(TreeEditor.NodeFactory)
    protected readonly nodeFactory: TreeEditor.NodeFactory
  ) {
    super(
      treeWidget,
      formWidget,
      workspaceService,
      logger,
      TreeEditorWidget.WIDGET_ID,
      options,
      provider,
      nodeFactory,
    );
  }

  protected getTypeProperty() {
    return "typeId";
  }

  public save(): void {
    super.save();
  }

  public async load(): Promise<void> {
    super.load();
  }

  protected deleteNode(node: Readonly<TreeEditor.Node>): void {
    // TODO: handle node deletion here
    super.deleteNode(node);
  }

  protected addNode({ node, type, property }: AddCommandProperty): void {
    // TODO: handle node add here
    super.addNode({ node, type, property });
  }

  protected handleFormUpdate(data: any, node: TreeEditor.Node) {
    super.handleFormUpdate(data, node);
  }

  protected configureTitle(title: Title<Widget>): void {
    super.configureTitle(title);
    title.iconClass = 'fa fa-tree dark-purple';
  }
}
export namespace TreeEditorWidget {
  export const WIDGET_ID = 'json-forms-tree-editor';
  export const EDITOR_ID = 'com.eclipsesource.tree.editor';
}
