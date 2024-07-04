import OpenAI from "openai";
import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase-server";
import { getTranslations } from "next-intl/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const generatePrompt = (
  contextText: string,
  searchText: string,
  language: string
) => {
  var promptLanguage = "Responda sempre em português, por favor.";

  switch (language) {
    case "en":
      promptLanguage =
        "Responda em texto simples e de forma clara em Inglês, sem usar jargões técnicos ou termos complexos. Preciso que a resposta seja traduzida para o Inglês.";
      break;
    default:
      promptLanguage =
        "Responda em texto simples e de forma clara em Português, sem usar jargões técnicos ou termos complexos. Preciso que a resposta seja traduzida para o Português.";
      break;
  }

  const prompt = `${`
    Você é um representante ${process.env.NEXT_PUBLIC_APP_NAME} muito entusiasmado que adora ajudar as pessoas!
    Dados os seguintes Contextos da ${process.env.NEXT_PUBLIC_APP_NAME}, 
    responda à pergunta usando apenas essas informações no formato de texto simples.
    Respire antes de responder e seja claro e conciso.
    Responda apenas se tiver certeza da resposta.
    Você não deverá retornar apenas com texto simples, sem formatação ou marcação.
    Se você não tiver certeza e a resposta não estiver explicitamente escrita na documentação,
    diga "Desculpe, não sei como ajudar com isso.`}

    Contextos:
    ${contextText}

    Pergunta: """
    ${searchText}
    """

    ${promptLanguage}"
  `;

  return prompt;
};

export async function POST(req: Request) {
  const supabase = await createSupabaseServerClient();
  const locale = req.headers.get("accept-language");
  const body = await req.json();
  const tMessage = await getTranslations({
    locale: locale ?? "en",
    namespace: "Message",
  });

  try {
    const result = await openai.embeddings.create({
      input: body.prompt,
      model: "text-embedding-ada-002",
    });

    const embedding = result.data[0].embedding;

    const { data: documents } = await supabase.rpc("match_chatbot", {
      query_embedding: embedding,
      match_threshold: 0.8,
      match_count: 10,
    });

    let tokenCount = 0;
    let contextText = "";

    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      const content = document.content;
      tokenCount += document.token;

      if (tokenCount > 1500) {
        break;
      }

      contextText += `${content.trim()}\n--\n`;
    }

    if (contextText) {
      const prompt = generatePrompt(contextText, body.prompt, locale as string);

      const res = await openai.completions.create({
        prompt,
        model: "gpt-3.5-turbo-instruct",
        max_tokens: 512,
        temperature: 0,
      });

      return NextResponse.json({
        text: res.choices[0].text,
      });
    } else {
      return NextResponse.json({
        text: tMessage("Info.IDontKnow"),
      });
    }
  } catch (error) {
    return NextResponse.json(
      { message: tMessage("Error.Unexpected") },
      { status: 500 }
    );
  }
}
