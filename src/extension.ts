import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('cpp-auto-semicolon.addSemicolons', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
			return;
		}

        const selection = editor.selection;
        const text = editor.document.getText(selection);
        const lines = text.split('\n');

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line.length > 0 && !line.endsWith(';')) {
                lines[i] = lines[i] + ';';
            }
        }

        const newText = lines.join('\n');

        editor.edit((editBuilder) => {
            editBuilder.replace(selection, newText);
        });
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}