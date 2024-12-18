import { models } from "@hypermode/modus-sdk-as";
import {
  OpenAIChatModel,
  ResponseFormat,
  SystemMessage,
  UserMessage,
} from "@hypermode/modus-sdk-as/models/openai/chat";
import { JSON } from "json-as";

// this model name should match the one defined in the modus.json manifest file
// const modelName: string = "text-generator";
const modelName: string = "gpt-3-5-turbo";

// Use our LLM to generate text based on an instruction and prompt
export function generateText(instruction: string, prompt: string): string {
  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(prompt),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function cleanTranscript(data: string): string {
  const instruction =
    "You are an AI designed to tidy text.When asked to generate data, always provide it in the requested format without including any extra characters like \n,#, explanations, or unnecessary text.just the data asked in the user";
  let parsedData: string[] = JSON.parse<string[]>(data);
  const newData = parsedData.join(" ");
  //   console.log(newData);

  const requestBody = `Tidy the grammar and punctuation of the following text 
    which was autogenerated from a YouTube video.  Where appropriate correct the words which are spelled incorrectly.just give the appropriate text result.When asked to generate data, always provide it in the requested format without including any extra characters, explanations like Here's the tidied text with corrected spelling and proper punctuation:, or unnecessary text. Only output data i requested . : ${newData}`;
  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(requestBody),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  let result: string = output.choices[0].message.content;
  console.log(result);

  return result;
}

export function convertTextToArray(text: string, slideCount: string): string {
  // const slideCount = 5;
  const instruction =
    "Output only a clean array of objects(JSON) like  [{title: 'Title', content: ['Point 1', 'Point 2']}]. DO NOT use any newlines (\\n) or escape characters (/). Don't give the unwanted explaination like(here is the content,the generated content";
  const requestBody = `From the string ${text}, create an array of objects with a title and content property. The content property should be an array of strings. The array should have ${slideCount} objects.
        Generate an Array of objects with properties title (string) and content (array of strings). . Do not just split the text into parts. You need to reword it, improve it and make it friendly for a presentation. I have provided a schema for you to follow.
            There should be a minimum of 3 content items per objects and a maximum of 4. No string in the content object should exceed 170 characters.
          `;

  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(requestBody),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content;
}

export function generateTitleAndDescription(contentArray: string): string {
  let instruction =
    'You are an AI designed to create a title and description for a presentation.Output only a JSON object DO NOT use any newlines (\\n) or escape characters (/). Don\'t give the unwanted explaination just generate data like this {"title":"string",description:"string"}';
  const requestBody = `From the array of objects ${contentArray} create a title and description suitable for a presentation.give the output in form of a object with title and description property The title should be no longer than 15 words and the description should be no longer than 35 words.`;

  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(requestBody),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}

export function ImprovePresentationContent(content: string): string {
  const instruction =
    "You are an AI designed to improve presentation content. DO NOT use any newlines (\\n) or escape characters (/). Don't give the unwanted explaination like(here is the content,the generated content) just generate data as array like [{'title': 'Title 1', 'content': ['String 1', 'String 2']}]";
  const requestBody = `I am giving you an array of objects and each represents content for a presentation. I want you to loop over each object and improve the content and elaborate upon it so it reaches around 250 characters, remove any unnecessary information and make it more engaging. No string in the content array should be longer than 250 characters.
          remove any references to the content coming from a YouTube video or any other source. I have provided a schema for how I want the data returned and the data to improve is follows: ${content}
        `;

  const model = models.getModel<OpenAIChatModel>(modelName);

  const input = model.createInput([
    new SystemMessage(instruction),
    new UserMessage(requestBody),
  ]);

  input.temperature = 0.7;
  const output = model.invoke(input);

  return output.choices[0].message.content.trim();
}


@json
class PresentationData {
  title!: any;
  description!: any;
  content!: string;
}

// export function processPresentationData(transcript: string): PresentationData {
//   // Step 1: Clean the transcript
//   const cleanedTranscript = cleanTranscript(transcript);

//   // Step 2: Convert cleaned transcript into an array suitable for presentation
//   const contentArray = convertTextToArray(cleanedTranscript);

//   // Step 3: Generate a title and description based on the content array
//   const titleAndDescription: any = generateTitleAndDescription(contentArray);

//   // Step 4: Improve the presentation content
//   const improvedContent = ImprovePresentationContent(contentArray);

//   // Combine all results into a final object
//   const finalOutput = {
//     title: titleAndDescription.title,
//     description: titleAndDescription.description,
//     content: improvedContent,
//   };

//   return finalOutput;
// }
