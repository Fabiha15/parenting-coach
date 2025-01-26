# The Parenting Coach

**The Parenting Coach** is an AI-powered platform designed to assist users with parenting-related questions. Using advanced AI technology and contextual understanding, it provides helpful and insightful answers to guide parents through their journey.

---

## Features
- AI-generated responses to parenting questions.
- Contextual answers based on a curated parenting guide.
- Advanced similarity search to retrieve relevant information.

---

## How It Works
1. A parenting guide PDF is uploaded to a vector database (Pinecone) using an embedding method.
2. When a user asks a question, the vector database performs a similarity search to retrieve the most relevant context from the guide.
3. The retrieved context is used by the AI (powered by OpenAI and LangChain) to generate tailored responses.

---

## Running the Application Locally
To run the application locally, follow these steps:

1. Clone the repository and navigate to the project folder.
2. Install dependencies using:
   ```bash
   yarn
3. Start the development server:
   yarn dev
4. Open your browser and go to:
   http://localhost:3000
   
⚠️ Important Note:
The application requires an OpenAI API key to function. Since the API key is not included in this repository for security reasons, the application will not work without it.

---

## Tech Stack
LangChain: Used to process and structure the flow of retrieved context and AI-generated responses. It ensures that the retrieved data is seamlessly integrated into the AI's conversational responses.
Pinecone: A vector database that powers the efficient similarity search for retrieving relevant sections of the parenting guide.
OpenAI: Provides the language model used to generate intelligent and insightful responses.
ShadCN UI: A modern UI library used to create a visually appealing and user-friendly interface for the application. It ensures that users have a smooth and engaging experience when interacting with The Parenting Coach.

---

## Hosted Version
This application is hosted online

---

## Contact
For inquiries or feedback, feel free to reach out at: fabihakhan1999@gmail.com

---


