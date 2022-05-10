import {
  Box,
  Center,
  Heading,
  HStack,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import { ListObjectsV2Output } from "aws-sdk/clients/s3";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { MdDateRange, MdSdCard } from "react-icons/md";
import { s3 } from "../util/s3";
import { formatSize } from "../util/misc";

export default function FileViewer({
  objects,
}: {
  objects: ListObjectsV2Output;
}) {
  if (!objects || !objects.Contents || objects.Contents.length == 0) {
    return (
      <Center h="100vh" w="full" bgColor="gray.900">
        <Heading color="white">Image not found</Heading>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>{objects.Contents[0].Key}</title>
        <>
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${objects.Contents[0].Key}`}
          />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      </Head>
      <Center h="100vh" w="full" bgColor="gray.900">
        <Box
          boxShadow="2xl"
          borderRadius={10}
          bgColor="gray.800"
          padding={5}
          minWidth={500}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_PUBLIC_URL}/${objects.Contents[0].Key}`}
            borderRadius={5}
            alt="Uploaded image"
            w="full"
          />
          <HStack pt={2} justifyContent="space-between">
            <HStack>
              <Icon as={MdDateRange} color="white" w={5} h={5} />
              <Text color="white" fontSize="md">
                {new Date(
                  objects.Contents[0].LastModified || ""
                ).toLocaleString()}
              </Text>
            </HStack>
            <HStack>
              <Icon as={MdSdCard} color="white" w={5} h={5} />
              <Text color="white" fontSize="md">
                {formatSize(objects.Contents[0].Size || 0)}
              </Text>
            </HStack>
          </HStack>
        </Box>
      </Center>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { fileName } = context.query;

  const objects = await s3
    .listObjectsV2({
      Bucket: process.env.BUCKET_NAME || "",
      Prefix: fileName as string,
      MaxKeys: 1,
    })
    .promise();

  return {
    props: {
      objects: JSON.parse(JSON.stringify(objects)),
    },
  };
}
