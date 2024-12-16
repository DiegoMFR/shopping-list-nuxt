export default defineEventHandler(async (event) => {
  const ai = hubAI(); // access AI bindings

  const { input, topics } = await readBody(event);

  const schema = {
    type: "array",
    description: "An array of 5 items to return",
    items: {
      type: "object",
      properties: {
        item: {
          type: "string",
          description: "The name of the item",
        },
        emoji: {
          type: "string",
          description: "An emoji depicting the item",
        },
      },
    },
  };

  const messages = [
    {
      role: "system",
      content: `You are a helpful assistant that answers in JSON. Here's the json schema you must adhere to: ${JSON.stringify(
        schema
      )}`,
    },
    {
      role: "user",
      content: `Return items that you can buy at ${topics.join(
        ","
      )} that contains the string ${input}`,
    },
  ];

  const response = await ai.run("@hf/nousresearch/hermes-2-pro-mistral-7b", {
    stream: false,
    messages,
  });

  return response;
});
