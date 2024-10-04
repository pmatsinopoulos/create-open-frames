import chalk from "chalk";
import { execSync, spawn } from "child_process";
import ora from "ora";

export type FRAME_KEY = "frog-hono" | "framesjs-nextjs" | "onchainkit-nextjs";

export type Frame = {
  description: string;
  value: FRAME_KEY;
  name: string;
};

export const frames: Frame[] = [
  {
    description: "Starter suite for Open Frames using Frames.js and NextJS.",
    value: "framesjs-nextjs",
    name: "Frames.js + NextJS",
  },
  {
    description: "Starter suite for Open Frames using Frog and Hono.",
    value: "frog-hono",
    name: "Frog + Hono",
  },
  {
    description: "Starter suite for Open Frames using OnchainKit and NextJS.",
    value: "onchainkit-nextjs",
    name: "OnchainKit + NextJS",
  },
];

export const handleFrameCreation = (selectedFrame: FRAME_KEY, path: string) => {
  switch (selectedFrame) {
    case "framesjs-nextjs":
      return createFramesJsNextJs(path);
    case "frog-hono":
      return createFrogHono(path);
    case "onchainkit-nextjs":
      return createOnchainKitNextJs(path);
  }
};

const createFramesJsNextJs = (path: string) => {
  const spinner = ora("Creating Frames.js + NextJS Open Frame...").start();

  const execResult = spawn(`npx`, [
    "create-next-app",
    "--example",
    "https://github.com/builders-garden/open-frames-starter-framesjs",
    path,
  ]);

  let stderrOutput = "";

  execResult.stderr.on("data", (data) => {
    stderrOutput += data.toString();
  })

  execResult.on("exit", (code) => {
    spinner.stop();

    if (code === 0) {
      console.log(
        `${chalk.green(`Frames.js + Nextjs Open Frame created successfully! 🚀`)}`
      );
    } else {
      console.error(`${chalk.red('Error occurred while creating the app with open frames:')}`);
      console.error(chalk.red(stderrOutput));
    }

    process.exit(code);
  });
};

const createFrogHono = (path: string) => {
  const spinner = ora(`Creating Frog + Hono Open Frame...`).start();

  const execResult = spawn(`git`, [
    "clone",
    "https://github.com/builders-garden/open-frames-starter-frog",
    path,
  ]);

  execResult.on("exit", (code) => {
    const currentDir = process.cwd();
    execSync(`rm -rf ${path}/.git`);
    process.chdir(path);
    execSync("git init");
    process.chdir(currentDir);

    spinner.stop();
    console.log(
      `${chalk.green(`Frog + Hono Open Frame created successfully! 🚀`)}`
    );
    process.exit(code);
  });
};

const createOnchainKitNextJs = (path: string) => {
  const spinner = ora("Creating OnchainKit + NextJS Open Frame...").start();

  const execResult = spawn(`npx`, [
    "create-next-app",
    "--example",
    "https://github.com/builders-garden/open-frames-starter-onchainkit",
    path,
  ]);

  execResult.on("exit", (code) => {
    spinner.stop();
    console.log(
      `${chalk.green(
        `OnchainKit + Nextjs Open Frame created successfully! 🚀`
      )}`
    );
    process.exit(code);
  });
};
