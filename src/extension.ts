import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const viewProvider = new HomeNowViewProvider(context.extensionUri);

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(HomeNowViewProvider.viewType, viewProvider)
    );
}

class HomeNowViewProvider implements vscode.WebviewViewProvider {
    public static readonly viewType = 'homeNowView';

    constructor(private readonly extensionUri: vscode.Uri) {}

    public resolveWebviewView(
        webviewView: vscode.WebviewView,
        context: vscode.WebviewViewResolveContext,
        _token: vscode.CancellationToken
    ): void {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        webviewView.webview.html = this.getWebviewContent();
    }

private getWebviewContent(): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bring Them Home</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 100vh;
        }
        #bthn {
            width: 100%;
        }
    </style>
</head>
<body>
    <div id="bthn" lang="en"></div>
    <script>
        (function () {
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.src = "https://bringthemhomenow.net/1.1.0/hostages-ticker.js";
            script.setAttribute("integrity", "sha384-DHuakkmS4DXvIW79Ttuqjvl95NepBRwfVGx6bmqBJVVwqsosq8hROrydHItKdsne");
            script.setAttribute("crossorigin", "anonymous");
            document.getElementsByTagName("head")[0].appendChild(script);
        })();
    </script>
</body>
</html>`;
}

}

export function deactivate() {}
