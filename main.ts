import Scraper from "./scraper";

/*
async function main() {
  const scraper = new Scraper();

  scraper.runLoop({
    start: 0,
    limit: 10,
    jump: 5,
    runIninitely: false,
    extractFiles: true,
  });
}

main().catch(console.error);

*/

function parseArgs(args: string[]): {
  start: number;
  limit: number;
  jump: number;
  runIninitely: boolean;
  extractFiles: boolean;
} {
  let runIninitely = false;
  let extractFiles = true;

  // Check for flags
  const filteredArgs = args.filter((arg) => {
    if (arg === "--run-infinitely") {
      runIninitely = true;
      return false;
    }
    if (arg === "--no-extract") {
      extractFiles = false;
      return false;
    }
    return true;
  });

  if (filteredArgs.length === 2) {
    return {
      start: 0,
      jump: parseInt(filteredArgs[0], 10),
      limit: parseInt(filteredArgs[1], 10),
      runIninitely,
      extractFiles,
    };
  } else if (filteredArgs.length === 3) {
    return {
      start: parseInt(filteredArgs[0], 10),
      jump: parseInt(filteredArgs[1], 10),
      limit: parseInt(filteredArgs[2], 10),
      runIninitely,
      extractFiles,
    };
  } else {
    throw new Error(
      "Invalid number of arguments. Expected either 2 (jump, limit) or 3 (start, jump, limit) arguments with optional flags --run-infinitely and --no-extract.",
    );
  }
}

async function main() {
  const scraper = new Scraper();
  const args = process.argv.slice(2);

  try {
    const { start, limit, jump, runIninitely, extractFiles } = parseArgs(args);
    console.log("Running Scraper with arguments", {
      start,
      limit,
      jump,
      runIninitely,
      extractFiles,
    });

    scraper.runLoop({
      start,
      limit,
      jump,
      runIninitely,
      extractFiles,
    });
  } catch (error) {
    console.error(
      "Error:",
      error instanceof Error ? error.message : error,
      "\n\n",
    );
    console.log("Usage:\n");
    console.log("\tnpm start <jump> <limit> [--run-infinitely] [--no-extract]");
    console.log("\tor");
    console.log(
      "\tnpm start <start> <jump> <limit> [--run-infinitely] [--no-extract]",
    );
    process.exit(1);
  }
}

main().catch(console.error);
