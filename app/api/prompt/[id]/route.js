import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Get prompt by id
export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompt", { status: 500 });
  }
};

//Update prompt
export const PATCH = async (req, { params }) => {
  const { id } = params;
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(id);
    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

//Delete prompt
export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();
    const prompt = await Prompt.findByIdAndDelete(id);
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
