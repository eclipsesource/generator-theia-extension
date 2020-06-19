import { Command } from '@theia/core/lib/common/command';
import { SingleUriCommandHandler } from '@theia/core/lib/common/uri-command-handler';
import URI from '@theia/core/lib/common/uri';
import { inject, injectable } from 'inversify';
import { FileSystem, FileSystemUtils } from '@theia/filesystem/lib/common';
import { SingleTextInputDialog } from '@theia/core/lib/browser/dialogs';
import { ILogger } from '@theia/core/lib/common';

export const NewTreeExampleFileCommand: Command = {
    id: '<%= params.extensionPath %>-tree.newExampleFile',
    label: 'New Tree Example File'
};

@injectable()
export class NewTreeExampleFileCommandHandler implements SingleUriCommandHandler {
    constructor(
        @inject(FileSystem)
        protected readonly fileSystem: FileSystem,
        @inject(ILogger)
        protected readonly logger: ILogger,
    ) { }
    
    async execute(uri: URI) {
        const stat = await this.fileSystem.getFileStat(uri.toString());
        if (!stat) {
            this.logger.error(`[NewTreeExampleFileCommandHandler] Could not create file stat for uri`, uri);
            return;
        }

        const dir = stat.isDirectory ? stat : await this.fileSystem.getFileStat(uri.parent.toString());
        if (!dir) {
            this.logger.error(`[NewTreeExampleFileCommandHandler] Could not create file stat for uri`, uri.parent);
            return;
        }

        const dirUri = new URI(dir.uri);
        const preliminaryFileUri = FileSystemUtils.generateUniqueResourceURI(dirUri, dir, 'tree-example', '.tree');
        const dialog = new SingleTextInputDialog({
            title: 'New Example File',
            initialValue: preliminaryFileUri.path.base
        });

        const fileName = await dialog.open();
        if (fileName) {
            const fileUri = dirUri.resolve(fileName);
            const createOptions = {
                content: JSON.stringify(defaultData, null, 2)
            }
            this.fileSystem.createFile(fileUri.toString(), createOptions);
        }
    }
}

const defaultData = {
    "typeId": "Machine",
    "name": "Super Coffee 4000",
    "children": [
        {
            "typeId": "ControlUnit",
            "processor": {
                "socketconnectorType": "A1T",
                "manufactoringProcess": "18nm",
                "thermalDesignPower": 10,
                "numberOfCores": 2,
                "clockSpeed": 800,
                "vendor": "CMD",
                "advancedConfiguration": true
            },
            "display": {
                "width": 70,
                "height": 40
            },
            "dimension": {
                "width": 100,
                "height": 80,
                "length": 50
            },
            "userDescription": "Small processing unit for user input"
        },
        {
            "typeId": "MultiComponent",
            "width": 100,
            "height": 100,
            "length": 60,
            "children": [
                {
                    "typeId":"WaterTank",
                    "capacity":400
                },
                {
                    "typeId":"DripTray",
                    "material":"aluminium"
                }
            ]
        }
    ]
}
