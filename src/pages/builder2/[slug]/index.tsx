import Head from "next/head";
import { useRouter } from "next/router";
import { fetchOneEntry, Content } from "@builder.io/sdk-react";

export async function getServerSideProps({
  params,
}: {
  params?: { slug?: string };
}) {
  const data = await fetchOneEntry({
    model: "blog-article",
    apiKey: process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY || "",
    query: { "data.slug": params?.slug },
  });

  if (data?.data?.redirect?.destinationUrl) {
    return {
      redirect: {
        destination: data.data.redirect.destinationUrl,
        permanent: true,
      },
    };
  }

  const template = await fetchOneEntry({
    model: "blog-article-section-template",
    apiKey: process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY || "",
  });

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
      <Content
        apiKey={process.env.NEXT_PUBLIC_BUILDER_PUBLIC_API_KEY || ""}
        model="blog-article-section-template"
        content={template}
        data={{
          thingsToDo: data.data,
          tourSectionResult: sections,
        }}
      />
    </>
  );
}
