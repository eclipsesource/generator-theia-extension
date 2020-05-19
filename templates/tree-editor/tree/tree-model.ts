import { TreeEditor } from 'theia-tree-editor';

export namespace CoffeeModel {
    export namespace Type {
        export const BrewingUnit = 'BrewingUnit';
        export const ControlUnit = 'ControlUnit';
        export const Dimension = 'Dimension';
        export const DripTray = 'DripTray';
        export const Display = 'Display';
        export const Machine = 'Machine';
        export const Processor = 'Processor';
        export const RAM = 'RAM';
        export const WaterTank = 'WaterTank';

        export function name(type: string): string {
            return type;
        }
    }

    const components = [
        Type.ControlUnit,
        Type.BrewingUnit,
        Type.DripTray,
        Type.WaterTank
    ];

    /** Maps types to their creatable children */
    export const childrenMapping: Map<string, TreeEditor.ChildrenDescriptor[]> = new Map([
        [
            Type.Machine, [
                {
                    property: 'children',
                    children: components
                }
            ]
        ]
    ]);

}