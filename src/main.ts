import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";

async function run(): Promise<void> {
    try {
        // Add the CLI to the environment path.
        const cliPath = path.normalize(`${__dirname}\\..\\node_modules\\@vsintellicode\\cli\\CLI`);
        core.addPath(cliPath);

        // Retrieve the PAT Token and the github workspace.
        const patToken = core.getInput("pat-token");
        const directory = process.env.GITHUB_WORKSPACE;

        // Validate directory
        if (directory == null) {
            // If the environment variable is not set, this could mean that the
            // github action is running on a different environment other than
            // the one github provides.
            throw Error("A workspace directory was not found in the current CI environment.");
        } else {
            if (!fs.existsSync(directory)) {
                // If the workspace directory doesn't exists we can't train anything.
                // An error is thrown to notice the reason of failure.
                throw Error("Workspace directory doesn't exists in the file system.");
            }
        }

        // set the verbosity in this variable.
        const verbosity = "n";

        // Execute the CLI with the given arguments.
        exec.exec("intellicode.exe", [
            "train",
            "--directory",
            directory,
            "--pat-token",
            patToken,
            "--verbosity",
            verbosity,
        ]);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
