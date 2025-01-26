"use server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Document } from "@langchain/core/documents";
const uploadPdf = async () => {
  const filePath = "src/app/documents/parenting.pdf";
  const pdfFilename = filePath.split("/").pop();


  const loader = new PDFLoader(filePath);
  const doc: any = await loader.load(); //each page is a document

  const splitter: any = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    separators: ["\n\n", "\n", ".", " ", ""],
    chunkOverlap: 20,
  });
  const chunks = await splitter.splitDocuments(doc); //splitting each document into chunks
 

  // Modify each chunk to match the desired structure
  const chunksWithMetadata = chunks.map((chunk: any) => {
    return new Document({
      metadata: {...chunk.metadata, pdfFilename: pdfFilename }, 
      pageContent: chunk.pageContent, // Use the chunk as the pageContent
    });
  });

  //storing chunks in pinecone

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  }); //creating embeddings

  const pinecone = new Pinecone({
    apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY ?? "defaultApiKey",
  });
  const pineconeIndex = pinecone.Index("test"); //creating pinecone index

  //uploading to pinecone
  await PineconeStore.fromDocuments(chunksWithMetadata, embeddings, {
    pineconeIndex,
    maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
  });
};

export default uploadPdf;
