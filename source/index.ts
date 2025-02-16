import type { LanguageModel } from "ai";
import {
  generateInitialIdeas,
  printTree,
  type TreeNode,
  TreeNodeImpl,
} from "./utils.ts";

export * from "./bigMindMapping.ts";
export * from "./index.ts";
export * from "./reverseBrainstorming.ts";
export * from "./roleStorming.ts";
export * from "./scamper.ts";
export * from "./sixHats.ts";
export * from "./starBursting.ts";
export * from "./tool.ts";
export * from "./types.ts";
export * from "./utils.ts";

// Main function
export async function brainstorm({
  model,
  query,
  strategy,
  n = 5,
}: {
  model: LanguageModel;
  query: string;
  strategy: ({
    model,
    idea,
  }: { model: LanguageModel; idea: string }) => Promise<TreeNode>;
  n: number | undefined;
}): Promise<string> {
  // Initialize the root node with the user's query
  const rootRb = new TreeNodeImpl(query);

  // Generate initial ideas
  const initialIdeas = await generateInitialIdeas({ model, query, n });
  console.info(initialIdeas.length);

  // Process each initial idea
  for (const idea of initialIdeas) {
    const childNode = await strategy({ model, idea });
    rootRb.addChild(childNode);
  }

  // Print and return the tree
  return printTree(rootRb);
}

// for more:
// https://www.lucidchart.com/blog/effective-brainstorming-techniques
