import URI from '@theia/core/lib/common/uri';
import { TreeEditor } from 'theia-tree-editor';

export namespace TreeModel {
  export namespace Type {
    export const Component = '#component';
    export const Person = '#person';

    export function name(type: string): string {
      return new URI(type).fragment;
    }
  }

  /** Maps types to their creatable children */
  export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
    [
      Type.Component, [
        {
          property: 'persons',
          children: [Type.Person]
        }
      ]
    ]
  ]);
}