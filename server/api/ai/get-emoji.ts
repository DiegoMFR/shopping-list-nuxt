export default defineEventHandler(async (event) => {
    const ai = hubAI(); // access AI bindings
  
    const { input } = await readBody(event);
  
    const messages = [
      {
        role: "system",
        content: `You are a helpful assistant that answers only with an emoji representing the word the user provided`,
      },
      {
        role: "user",
        content: input,
      },
    ];
  
    const { response } = await ai.run("@hf/nousresearch/hermes-2-pro-mistral-7b", {
      stream: false,
      messages,
    });

    console.log(response);
  
    return `${response} ${input}`;
  });
  