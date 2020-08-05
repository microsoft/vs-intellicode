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

        let directory = process.env.GITHUB_WORKSPACE;
        const overrideDirectory = core.getInput("directory");
        const overrideLoggingType = core.getInput("logs");

        if (overrideDirectory) {
            // If directory was overriden, we override that variable.
            core.info(`overriding directory with given path: '${overrideDirectory}'`);
            directory = overrideDirectory;
        }

        // Validate directory
        if (!directory) {
            // If the environment variable is not set, this could mean that the
            // github action is running on a different environment other than
            // the one github provides.
            throw Error("A workspace directory was not found in the current CI environment.");
        } else {
            if (!fs.existsSync(directory)) {
                // If the workspace directory doesn't exists we can't train anything.
                // An error is thrown to notice the reason of failure.
                throw Error(
                    `Workspace directory '${directory}' doesn't exists in the file system.`,
                );
            }
        }

        let verbosity = "n";

        // If logs are set as debug, we set diag verbosity.
        if(overrideLoggingType === "debug"){
            verbosity = "diag";
        }

        const args = [
            "train",
            "--directory",
            directory,
            "--anonymous",
            "--verbosity",
            verbosity, // Verbosity level.
            "--user-agent",
            "GitHub",
        ];

        const config = core.getInput("config");
        const platform = core.getInput("platform");

        // Setting process to be CI for multiple core usage.
        process.env.CPP_EXTRACT_MODE = "CI";

        if (config && platform) {
            args.push("--configuration", config, "--platform", platform);
        }

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
