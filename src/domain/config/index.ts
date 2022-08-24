import { BinaryToTextEncoding } from "crypto";

const hashConfig = {
  algorithm: "sha256",
  encondig: "hex" as BinaryToTextEncoding,
};

export const DomainConfig = {
  hash: hashConfig,
};
