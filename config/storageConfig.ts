import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
  keyFilename: "./config/keys.json",
  projectId: "stone-arcade-351603",
});
