import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query"); // Get the search query from the request.

  let filter = {};

  // Search products by name
  if (query) {
    filter = {
      $or: [
        { prompt: { $regex: query, $options: "i" } },
        { tag: { $regex: query, $options: "i" } },
      ],
    };
  }
  try {
    await connectToDB();

    // If there is a search query, use it to filter the prompts.
    // const prompts = query
    //   ? await Prompt.find({ $text: { $search: query } }).populate("creator")
    //   :
    const prompts = await Prompt.find(filter).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to get prompts", { status: 500 });
  }
};
