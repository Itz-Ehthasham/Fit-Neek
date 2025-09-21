import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import groq from "groq";

// client for safe config
export const config = {
    projectId: "brloshuv",
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
};

export const client = createClient(config);

// admin 
const adminConfig = {
    ...config,
    token: process.env.SANITY_API_TOKEN, // Fixed typo from 'tokern' to 'token'
};
export const adminClient = createClient(adminConfig);

// image url builder
const builder = imageUrlBuilder(config);
export const urlFor = (source: string) => builder.image(source);

// Export groq for queries
export { groq };



