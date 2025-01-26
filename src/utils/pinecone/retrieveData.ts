import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";
import { combineDocuments } from "./combineDocs";

export const retrieveData = async (Question: string) => {
  const convHistory: string[] = [];
  const model: any = new OpenAI({
    modelName: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
    temperature: 0.9,
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
  });

  //Creating template for prompt
  const prompt: any = PromptTemplate.fromTemplate(
    `You are given a question that may contain some extra information but you need to convert it into a standalone question only. 
    question : {Question}`
  );
  const chain = prompt.pipe(model);
  const standaloneQuestion = await chain.invoke({ Question });

  const pinecone = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY ?? "defaultApiKey",
  });
  const pineconeIndex = pinecone.Index("test");
  const vectorStore = await PineconeStore.fromExistingIndex(
    new OpenAIEmbeddings({
      openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    }),
    { pineconeIndex }
  );
  
  //getting relevant data
  const results = await vectorStore.similaritySearch(standaloneQuestion,
    10, {
      pdfFilename: "parenting.pdf",
    }
  );
 
  // const retriever = vectorStore.asRetriever();
  // const response = await retriever.getRelevantDocuments(standaloneQuestion);
  // console.log("response", response);
  const context = combineDocuments(results);


  //Creating template for answer
  const answerTemplate: any = PromptTemplate.fromTemplate(
    `You are a helpful and enthusiastic support bot who can answer a given question based on the context provided. Your task is to answer questions based on the provided context without directly copying from it. Use the context to guide your answer, but make sure it sounds like a natural, human response.  If you really don't know the answer, say "I'm sorry, I don't know the answer to that. And direct the questioner to email help@parenting.com. Don't try to make up an answer.But sometimes it can happen that user does not ask any question maybe they just want to talk. In that case, just do conversation with the user as a friendly bot. Always speak as if you were chatting to a friend. Try to make a friendly answer and greet the user.
    context : {context}
    
    question : {Question}`
  );
  const answerChain = RunnableSequence.from([answerTemplate, model]);
  const answer = await answerChain.invoke({ context, Question }); // to get the answer we need to pass the context,the question 
 
  return answer;
};


