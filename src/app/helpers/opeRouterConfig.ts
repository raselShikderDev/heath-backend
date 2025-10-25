import OpenAI from 'openai';
import envVars from '../../config/envVars';

export const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: envVars.OPENROUTER_API_KEY as string,
  // defaultHeaders: {
  //   'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
  //   'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
  // },
});

// async function main() {
//   const completion = await openai.chat.completions.create({
//     model: 'openai/gpt-4o',
//     messages: [
//       {
//         role: 'user',
//         content: 'What is the meaning of life?',
//       },
//     ],
//   });

//   console.log(completion.choices[0].message);
// }

// main();
