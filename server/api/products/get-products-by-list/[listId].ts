import { z } from "zod";
import { getProductsByList } from "~/server/utils";

const listIdSchema = z.object({
  listId: z.string(),
});

const validateListId = (data: unknown) => {
  const result = listIdSchema.safeParse(data);
  if (result.success) {
    return { value: result.data };
  } else {
    return { error: result.error };
  }
};

export default eventHandler(async (event) => {

  const routeParams = await getValidatedRouterParams(event, validateListId);

  if(routeParams.error) {
    throw new Error('Route parameters are not valid')
  }

  const { listId } = routeParams.value;


  if (isMethod(event, "GET")) {
    return getProductsByList(listId);
  } else {
    return new Error("Only GET is allowed");
  }
});
