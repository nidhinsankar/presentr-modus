import { http } from "@hypermode/modus-sdk-as";


@json
class Todo {
  userId!: number;
  id!: number;
  title!: string;
  completed!: boolean;
}

type Todos = Todo[];

// this function makes a request to an API that returns data in JSON format, and
// returns an object representing the data
export function getTodos(): Todos {
  const request = new http.Request(
    "https://jsonplaceholder.typicode.com/todos/",
  );

  const response = http.fetch(request);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch quote. Received: ${response.status} ${response.statusText}`,
    );
  }

  // the API returns an array of quotes, but we only want the first one
  return response.json<Todos>();
}
