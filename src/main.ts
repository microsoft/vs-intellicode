import * as core from "@actions/core";
import * as exec from "@actions/exec";
import * as fs from "fs";
import * as path from "path";
import { Links } from "./links";

async function run(): Promise<void> {
    try {
        // Add the CLI to the environment path.
        const cliPath = path.normalize(`${__dirname}\\..\\node_modules\\@vsintellicode\\cli\\CLI`);
        core.addPath(cliPath);

        // Retrieve the PAT Token and the github workspace.
        // Get required input arguments.
        let patToken: string = "";
        try {
            // When 'required' is sent as true, git/core will
            // throw when the argument is not found.
            patToken = core.getInput("pat-token", { required: true });

            // If the retrieved pat is an empty string, we throw to print the warning end return.
            if (!patToken) {
                throw Error;
            }
        } catch (error) {
            core.warning(
                `Could not find personal access token (PAT) in configuration. Please provide one as a step argument. For instructions on getting a PAT visit ${Links.PAT_TOKEN}`,
            );
            return;
        }
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

        const args = [
            "train",
            "--directory",
            directory,
            "--pat-token",
            patToken,
            "--verbosity",
            "n", // Verbosity level.
        ];

        // Execute the CLI with the given arguments.
        exec.exec("intellicode.exe", args);
    } catch (error) {
        // If an unhandled exception is thrown
        // an error message is logged.
        // This allows the pipeline to continue and also notifies
        // the user that something went wrong on the intellicode model training.
        core.error(error.message);
    }
}

run();
