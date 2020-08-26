<img src="./images/IntelliCodeLogo.png"> 

# Automate code completions tailored to your codebase with IntelliCode Team completions

[Visual Studio IntelliCode](https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.VSIntelliCode) saves you time by putting what you’re most likely to use at the top of your completion list. IntelliCode recommendations are based on thousands of open source projects on GitHub each with over 100 stars. When combined with the context of your code, the completion list is tailored to promote common practices. To get IntelliCode's starred completion suggestions for your own types, or other types not commonly found in open source, use [IntelliCode Team completions](https://aka.ms/vsic-teamcompletions-quickstart).

With this GitHub Action, you can keep your Team completion suggestions up-to-date with your repository’s latest commit by automating the Team completions model training. 

## Requirements

* The build agent (MSBUILD, CMAKE) has the minimum required Visual Studio version installed:
For C# repositories: Visual Studio 2017 or higher
For C++ repositories: Visual Studio 2019 Update 4 or higher.


## Usage

The workflow is usually declared in `.github/workflows/intellicode.yml`.
* Here's what a C# workflow looks like:

```yaml
name: Main IntelliCode Workflow

on:
  push:
    branches: 
      - master # IntelliCode recommends training on master branch to increase your model availability. Switch to another branch if you'd like to reduce update frequency.

jobs:
  build:
    runs-on: windows-latest

    steps:
    - uses: actions/checkout@v2
      with:
        fetch-depth: 0 # We need to fetch the entire codebase for code analysis.
    - name: Setup .NET Core
      uses: actions/setup-dotnet@v1
      with:
        dotnet-version: <Your_Build_Version>
    - name: Build with dotnet
      run: dotnet build --configuration Release # Project needs to build before training a model.
 - name: Train Intellicode Model
      uses: microsoft/vs-intellicode@v1
```

**NOTE:** Training a C# model usually takes around the same time it takes to build the project. It depends entirely on the length of the codebase.


## Inputs

| Name          | Type              | Description  |
| ------------- |:-----------------:|:------------:|
| directory     | string (optional) | Use if you wish to override the directory where the repo to be trained is located at. |
| platform      | string (optional) | Only for C++ repositories. Sets the platform for the C++ build (ARM, Any CPU, etc). |
| config        | string (optional) | Only for C++ repositories. Sets the configuration for the C++ build (Debug, Release). |

## Troubleshooting and Feedback

**Having trouble running the Github Action?**
If you are having issues with running the IntelliCode GitHub Action or would like to provide feedback, let the IntelliCode team know on [the IntelliCode GitHub issues community forum ](https://aka.ms/vsicissues). If you reproduce the problem before submitting your issue, please attach images and/or gifs to the issue to facilitate our investigations.
Be sure to tag your issue with the tag `feedback` or `issue`.

**Not seeing any IntelliCode completions in Visual Studio?**
If you are not able to see any IntelliCode completions, you may have extensions installed that are overriding the IntelliSense UI. This can prevent the IntelliCode "starred" suggestions from appearing at the top of the list. You can verify if extensions are causing this behavior by turning them off and then trying IntelliSense again. Or, if the extension supports it, turn off its auto-completion features.

To report an IntelliCode` for Visual Studio bug, use the [Help > Send Feedback > Report a Problem](https://docs.microsoft.com/en-us/visualstudio/ide/how-to-report-a-problem-with-visual-studio) menu. If you reproduce the problem before submitting the report, logs are automatically included in the report.

**Do you have suggestions on how we can make our product better?**

For feature requests or suggestions click the  **Send feedback about** > **This product** button at the bottom of this page to log a new issue. Mention that it's a feature request.

## See also

- [IntelliCode overview](https://aka.ms/intellicode)
- [Custom models based on your code](https://aka.ms/vsic-teamcompletions-quickstart)
- This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
- For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
- [Privacy Policy](https://privacy.microsoft.com/en-us/privacystatement).
- [License Terms](https://marketplace.visualstudio.com/items/VisualStudioExptTeam.VSIntelliCodeTeamModelTraining/license).


## Supported build configurations
 
* Your code is built with MSBUILD
* Your code is built with CMAKE for native C++ code

## License

The files and documentation in this project are released under the MIT License.
