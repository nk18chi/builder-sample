import { builder, BuilderComponent, BuilderContent } from "@builder.io/react";
import Head from "next/head";
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

  if (data?.data?.redirect?.destinationUrl) {
    return {
      redirect: {
        destination: data.data.redirect.destinationUrl,
        permanent: true,
      },
    };
  }

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
      <Head>
        <title>{data.data.seoTitle}</title>
        <meta name="description" content={data.data.seoDescription} />
        <meta property="og:title" content={data.data.openGraph.title} />
        <meta
          property="og:description"
          content={data.data.openGraph.description}
        />
        <meta property="og:image" content={data.data.openGraph.image} />
        <meta property="og:url" content={data.data.openGraph.url} />
        <meta property="og:type" content={data.data.openGraph.type} />
        {data.data.noIndex && <meta name="robots" content="noindex" />}
        {data.data.canonical && (
          <link rel="canonical" href={data.data.canonical} />
        )}
        {data.data.structuredData && (
          <script type="application/ld+json">
            {JSON.stringify(data.data.structuredData)}
          </script>
        )}
      </Head>
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
