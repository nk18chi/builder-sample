import { builder, BuilderComponent, BuilderContent } from "@builder.io/react";
import { useRouter } from "next/router";

builder.init(process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY || "");

export async function getServerSideProps({
  params,
}: {
  params?: { slug?: string };
}) {
  const data =
    (await builder
      .get("blog-article", {
        query: { "data.slug": params?.slug },
        options: { enrich: true },
      })
      .toPromise()) || null;
  const template =
    (await builder
      .get("blog-article-section-template", { options: { enrich: true } })
      .toPromise()) || null;

  // make a post api call to get the data
  const apiResponse = await fetch("http://localhost:3000/api/country", {
    method: "POST",
    body: JSON.stringify({
      country: params?.slug,
    }),
  });

  const sections = await apiResponse.json();

  return { props: { data, template, sections } };
}

export default function ThingsToDoPage({ data, template, sections }: any) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <BuilderContent model="blog-article" content={data}>
        {(_, __, fullContent) => {
          return (
            <BuilderComponent
              model="blog-article-section-template"
              content={template}
              data={{
                thingsToDo: fullContent.data,
                tourSectionResult: sections,
              }}
              options={{ enrich: true }}
            />
          );
        }}
      </BuilderContent>
    </>
  );
}
