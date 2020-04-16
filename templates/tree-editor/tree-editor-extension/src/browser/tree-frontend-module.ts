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
import 'theia-tree-editor/style/index.css';

import { CommandContribution, MenuContribution } from '@theia/core';
import { LabelProviderContribution, NavigatableWidgetOptions, OpenHandler, WidgetFactory } from '@theia/core/lib/browser';
import URI from '@theia/core/lib/common/uri';
import { ContainerModule } from 'inversify';
import { createBasicTreeContainter, NavigatableTreeEditorOptions } from 'theia-tree-editor';

import { TreeContribution } from './tree-contribution';
import { TreeModelService } from './tree/tree-model-service';
import { TreeNodeFactory } from './tree/tree-node-factory';
import { TreeEditorWidget } from './tree/tree-editor-widget';
import { TreeLabelProvider } from './tree/tree-label-provider-contribution';
import { TreeLabelProviderContribution } from './tree-label-provider';

export default new ContainerModule(bind => {
  // Bind Theia IDE contributions
  bind(LabelProviderContribution).to(TreeLabelProviderContribution);
  bind(OpenHandler).to(TreeContribution);
  bind(MenuContribution).to(TreeContribution);
  bind(CommandContribution).to(TreeContribution);
  bind(LabelProviderContribution).to(TreeLabelProvider);

  // bind to themselves because we use it outside of the editor widget, too.
  bind(TreeModelService).toSelf().inSingletonScope();
  bind(TreeLabelProvider).toSelf().inSingletonScope();

  bind<WidgetFactory>(WidgetFactory).toDynamicValue(context => ({
    id: TreeEditorWidget.WIDGET_ID,
    createWidget: (options: NavigatableWidgetOptions) => {

    const treeContainer = createBasicTreeContainter(
      context.container,
      TreeEditorWidget,
      TreeModelService,
      TreeNodeFactory
    );

    // Bind options
    const uri = new URI(options.uri);
    treeContainer.bind(NavigatableTreeEditorOptions).toConstantValue({ uri });

    return treeContainer.get(TreeEditorWidget);
  }
  }));
});
